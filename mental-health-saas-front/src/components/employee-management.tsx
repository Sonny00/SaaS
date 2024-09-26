"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Plus, Send, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Exemple de données pour les quiz
const quizzes = [
  { id: 1, name: "Quiz sur le bien-être au travail" },
  { id: 2, name: "Évaluation du stress" },
  { id: 3, name: "Satisfaction au travail" },
]

export function EmployeeManagementComponent() {
  const [employees, setEmployees] = useState<{ id: number; email: string; selected: boolean }[]>([])
  const [newEmail, setNewEmail] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState('')
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
      // Ici, vous implémenteriez la logique d'envoi réel du quiz
      console.log(`Envoi du quiz ${selectedQuiz} aux employés:`, selectedEmployees.map(emp => emp.email))
      toast.success(`Quiz envoyé à ${selectedEmployees.length} employé(s)`)
    } else {
      toast.error('Veuillez sélectionner au moins un employé et un quiz')
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md">
        <CardHeader className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={goBack}
              variant="outline"
              size="sm"
              className="bg-white/50 hover:bg-white/70"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Retour
            </Button>
            <div className="w-[100px]"></div> {/* Espace vide pour équilibrer le header */}
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Gestion des Employés et Envoi de Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Adresse e-mail de l'employé"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addEmployee} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white">
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Sélectionner</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Checkbox
                        checked={employee.selected}
                        onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                      />
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex space-x-2 items-center">
              <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                <SelectTrigger className="w-[300px]">
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
              <Button onClick={sendQuiz} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white">
                <Send className="mr-2 h-4 w-4" /> Envoyer le Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}