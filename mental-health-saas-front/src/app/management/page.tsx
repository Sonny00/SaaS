'use client'

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Send, Trash2, ArrowLeft, Search, Edit, Check, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { addEmployeeApi, fetchEmployeesApi, deleteEmployeeApi, updateEmployeeApi, sendQuizApi } from '../../lib/apiClients';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const quizzes = [
  { id: 1, name: "Quiz sur le bien-être au travail" },
  { id: 2, name: "Évaluation du stress" },
  { id: 3, name: "Satisfaction au travail" },
];

export default function EnhancedEmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingEmail, setEditingEmail] = useState('');
  const router = useRouter();

  const addEmployee = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail.match(emailRegex)) {
      toast.error("Veuillez entrer une adresse e-mail valide");
      return;
    }

    try {
      const data = await addEmployeeApi(newEmail);
      setEmployees([...employees, { id: data.id, email: newEmail, selected: false }]);
      setNewEmail('');
      toast.success('Employé ajouté avec succès');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployeesApi();
      setEmployees(data.map(emp => ({ ...emp, selected: false })));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await deleteEmployeeApi(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      toast.info('Employé supprimé');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSelectedEmployees = async () => {
    const selectedEmployees = employees.filter(emp => emp.selected);
    if (selectedEmployees.length === 0) {
      toast.error('Veuillez sélectionner au moins un employé à supprimer');
      return;
    }

    try {
      await Promise.all(selectedEmployees.map(emp => deleteEmployeeApi(emp.id)));
      setEmployees(employees.filter(emp => !emp.selected));
      setSelectAll(false);
      toast.success(`${selectedEmployees.length} employé(s) supprimé(s) avec succès`);
    } catch (error) {
      toast.error('Erreur lors de la suppression des employés');
    }
  };

  const sendQuiz = async () => {
    const selectedEmployees = employees.filter(emp => emp.selected);
    if (selectedEmployees.length > 0 && selectedQuiz) {
      try {
        const emails = selectedEmployees.map(emp => emp.email);
        await sendQuizApi({ quizId: selectedQuiz, emails });
        toast.success(`Quiz envoyé à ${selectedEmployees.length} employé(s)`);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Veuillez sélectionner au moins un employé et un quiz');
    }
  };

  const toggleEmployeeSelection = (id) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === id ? { ...emp, selected: !emp.selected } : emp
      )
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setEmployees(prevEmployees =>
      prevEmployees.map(emp => ({ ...emp, selected: !selectAll }))
    );
  };

  const startEditing = (id, email) => {
    setEditingId(id);
    setEditingEmail(email);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingEmail('');
  };

  const saveEditing = async (id) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editingEmail.match(emailRegex)) {
      toast.error("Veuillez entrer une adresse e-mail valide");
      return;
    }

    try {
      await updateEmployeeApi(id, editingEmail);
      setEmployees(prevEmployees =>
        prevEmployees.map(emp =>
          emp.id === id ? { ...emp, email: editingEmail } : emp
        )
      );
      setEditingId(null);
      setEditingEmail('');
      toast.success('E-mail mis à jour avec succès');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredEmployees = employees.filter(emp => emp.email.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSearchTerm('');
        cancelEditing();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="sm"
              className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            <h1 className="text-3xl font-bold text-center text-[#0a3d62] tracking-tight">Gestion des Employés</h1>
            <div className="w-[100px]"></div>
          </div>

          <div className="space-y-8">
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Adresse e-mail de l'employé"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-grow focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
              />
              <Button 
                onClick={addEmployee} 
                className="bg-[#3c6382] hover:bg-[#0a3d62] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                {filteredEmployees.filter(emp => emp.selected).length} employé(s) sélectionné(s)
              </p>
              <Button
                onClick={deleteSelectedEmployees}
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer la sélection
              </Button>
            </div>

            <AnimatePresence>
              {filteredEmployees.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectAll}
                            onCheckedChange={toggleSelectAll}
                            className="border-[#3c6382]"
                          />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id} className="hover:bg-[#82ccdd]/10 transition-colors duration-200">
                          <TableCell>
                            <Checkbox
                              checked={employee.selected}
                              onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                              className="border-[#3c6382]"
                            />
                          </TableCell>
                          <TableCell>
                            {editingId === employee.id ? (
                              <Input
                                type="email"
                                value={editingEmail}
                                onChange={(e) => setEditingEmail(e.target.value)}
                                className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                              />
                            ) : (
                              employee.email
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {editingId === employee.id ? (
                                <>
                                  <Button
                                    onClick={() => saveEditing(employee.id)}
                                    size="icon"
                                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                                  >
                                    <Check size={16} />
                                  </Button>
                                  <Button
                                    onClick={cancelEditing}
                                    size="icon"
                                    className="bg-gray-400 hover:bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                                  >
                                    <X size={16} />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    onClick={() => startEditing(employee.id, employee.email)}
                                    size="icon"
                                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button
                                    onClick={() => deleteEmployee(employee.id)}
                                    size="icon"
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-[#0a3d62] mb-2">Envoyer un quiz</h2>
              <div className="flex space-x-2">
                <Select
                  value={selectedQuiz}
                  onValueChange={setSelectedQuiz}
                  className="flex-grow"
                >
                  <SelectTrigger className="bg-white border-2 border-[#82ccdd] text-[#0a3d62] rounded-full py-2 px-4 focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300">
                    <SelectValue placeholder="Sélectionner un quiz" />
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-[#82ccdd] rounded-lg shadow-lg">
                    {quizzes.map((quiz) => (
                      <SelectItem
                        key={quiz.id}
                        value={quiz.id.toString()}
                        className="py-2 px-4 hover:bg-[#82ccdd]/10 transition-colors duration-200"
                      >
                        {quiz.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={sendQuiz}
                  disabled={!selectedQuiz}
                  className="bg-[#3c6382] hover:bg-[#0a3d62] text-white rounded-full py-2 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ToastContainer />
    </div>
  );
}