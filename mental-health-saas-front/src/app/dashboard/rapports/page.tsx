"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ArrowLeft, FileDown, Printer, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Exemple de données pour les quiz
const quizData = [
  { 
    id: 1, 
    name: "Quiz sur le bien-être au travail", 
    completed: 75, 
    total: 100,
    categories: [
      { name: "Environnement de travail", value: 30 },
      { name: "Relations collègues", value: 25 },
      { name: "Équilibre vie pro/perso", value: 20 },
    ]
  },
  { 
    id: 2, 
    name: "Évaluation du stress", 
    completed: 50, 
    total: 80,
    categories: [
      { name: "Stress élevé", value: 15 },
      { name: "Stress modéré", value: 25 },
      { name: "Stress faible", value: 10 },
    ]
  },
  { 
    id: 3, 
    name: "Satisfaction au travail", 
    completed: 30, 
    total: 60,
    categories: [
      { name: "Très satisfait", value: 10 },
      { name: "Satisfait", value: 15 },
      { name: "Neutre", value: 5 },
    ]
  },
  { 
    id: 4, 
    name: "Équilibre vie professionnelle-personnelle", 
    completed: 40, 
    total: 70,
    categories: [
      { name: "Bon équilibre", value: 20 },
      { name: "Équilibre moyen", value: 15 },
      { name: "Déséquilibre", value: 5 },
    ]
  },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function QuizReport() {
  const router = useRouter()
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  const goBack = () => {
    router.back()
  }

  const exportToPDF = (elementId: string, fileName: string) => {
    const input = document.getElementById(elementId)
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 30
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save(`${fileName}.pdf`)
      })
    }
  }

  const printElement = (elementId: string) => {
    const printContent = document.getElementById(elementId)
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
    windowPrint.document.write(printContent.innerHTML)
    windowPrint.document.close()
    windowPrint.focus()
    windowPrint.print()
    windowPrint.close()
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={goBack}
              variant="outline"
              size="sm"
              className="bg-white/50 hover:bg-white/70 rounded-full"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Retour
            </Button>
            <div className="space-x-2">
              <Button
                onClick={() => exportToPDF('report-content', 'quiz-report-complet')}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 rounded-full"
              >
                <FileDown className="mr-1 h-4 w-4" /> Exporter en PDF
              </Button>
              <Button
                onClick={() => printElement('report-content')}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 rounded-full"
              >
                <Printer className="mr-1 h-4 w-4" /> Imprimer
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Rapport d'avancement des Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6" id="report-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizData.map((quiz) => (
              <Dialog key={quiz.id}>
                <DialogTrigger asChild>
                  <Card className="bg-white/50 p-4 rounded-xl cursor-pointer hover:bg-white/60 transition-colors">
                    <CardContent className="p-0">
                      <h3 className="text-lg font-semibold text-[#0a3d62] mb-2">{quiz.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#3c6382]">Progression : {quiz.completed} / {quiz.total}</span>
                        <span className="text-sm font-medium text-[#0a3d62]">{Math.round(quiz.completed / quiz.total * 100)}%</span>
                      </div>
                      <Progress value={quiz.completed / quiz.total * 100} className="h-2" />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{quiz.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4" id={`quiz-detail-${quiz.id}`}>
                    <h4 className="text-lg font-semibold mb-2">Détails du quiz</h4>
                    <p>Participants : {quiz.completed} / {quiz.total}</p>
                    <p>Taux de participation : {Math.round(quiz.completed / quiz.total * 100)}%</p>
                    <div className="mt-4">
                      <h5 className="text-md font-semibold mb-2">Répartition des réponses</h5>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={quiz.categories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {quiz.categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      onClick={() => exportToPDF(`quiz-detail-${quiz.id}`, `rapport-${quiz.name}`)}
                      variant="outline"
                      size="sm"
                    >
                      <FileDown className="mr-1 h-4 w-4" /> Exporter en PDF
                    </Button>
                    <Button
                      onClick={() => printElement(`quiz-detail-${quiz.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Printer className="mr-1 h-4 w-4" /> Imprimer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="bg-white/50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-[#0a3d62] mb-4">Comparaison des réponses par quiz</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3c6382" name="Réponses complétées" />
                <Bar dataKey="total" fill="#82ccdd" name="Total des participants" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-[#0a3d62] mb-2">Résumé</h3>
            <p className="text-[#3c6382]">
              Nombre total de participants : {quizData.reduce((sum, quiz) => sum + quiz.total, 0)}
            </p>
            <p className="text-[#3c6382]">
              Nombre total de réponses complétées : {quizData.reduce((sum, quiz) => sum + quiz.completed, 0)}
            </p>
            <p className="text-[#3c6382]">
              Taux de participation moyen : {Math.round(quizData.reduce((sum, quiz) => sum + (quiz.completed / quiz.total), 0) / quizData.length * 100)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}