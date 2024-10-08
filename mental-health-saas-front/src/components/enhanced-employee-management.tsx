"use client"

import { useState, useEffect } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Plus, Send, Trash2, ArrowLeft, User, Users, Mail, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const quizzes = [
  { id: 1, name: "Quiz sur le bien-être au travail" },
  { id: 2, name: "Évaluation du stress" },
  { id: 3, name: "Satisfaction au travail" },
]

export function EnhancedEmployeeManagementComponent() {
  const [employees, setEmployees] = useState<{ id: number; email: string; selected: boolean }[]>([])
  const [newEmail, setNewEmail] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const addEmployee = () => {
    if (newEmail && !employees.some(emp => emp.email === newEmail)) {
      setEmployees([...employees, { id: Date.now(), email: newEmail, selected: false }])
      setNewEmail('')
      toast.success('Employé ajouté avec succès')
    } else {
      toast.error('Email invalide ou déjà existant')
    }
  }

  const toggleEmployeeSelection = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, selected: !emp.selected } : emp
    ))
  }

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    toast.info('Employé supprimé')
  }

  const sendQuiz = () => {
    const selectedEmployees = employees.filter(emp => emp.selected)
    if (selectedEmployees.length > 0 && selectedQuiz) {
      console.log(`Envoi du quiz ${selectedQuiz} aux employés:`, selectedEmployees.map(emp => emp.email))
      toast.success(`Quiz envoyé à ${selectedEmployees.length} employé(s)`)
    } else {
      toast.error('Veuillez sélectionner au moins un employé et un quiz')
    }
  }

  const filteredEmployees = employees.filter(emp => 
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchTerm('')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

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
                        <TableHead className="w-[50px]">Sélectionner</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
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
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEmployee(employee.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex space-x-2 items-center">
              <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                <SelectTrigger className="w-[300px] focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300">
                  <SelectValue placeholder="Sélectionner un quiz" />
                </SelectTrigger>
                <SelectContent>
                  {quizzes.map((quiz) => (
                    <SelectItem key={quiz.id} value={quiz.id.toString()}>
                      {quiz.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={sendQuiz} 
                className="bg-[#3c6382] hover:bg-[#0a3d62] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Send className="mr-2 h-4 w-4" /> Envoyer le Quiz
              </Button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: User, label: "Employés enregistrés", value: employees.length },
              { icon: Users, label: "Employés sélectionnés", value: employees.filter(emp => emp.selected).length },
              { icon: Mail, label: "Quiz disponibles", value: quizzes.length }
            ].map((stat, index) => (
              <Card key={index} className="bg-[#82ccdd]/10 p-4 rounded-lg shadow-md border border-[#82ccdd]/30 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <stat.icon className="h-8 w-8 text-[#3c6382]" />
                  <div>
                    <span className="text-2xl font-bold text-[#0a3d62]">{stat.value}</span>
                    <p className="text-sm text-[#3c6382] mt-1">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}