"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, Plus, Edit, Trash2, Send, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

type Question = {
  id: number;
  text: string;
  type: 'multiple_choice' | 'open_ended';
  options?: string[];
}

type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const initialQuizzes: Quiz[] = [
  {
    id: 1,
    title: "Satisfaction au travail",
    description: "Évaluez la satisfaction des employés dans leur environnement de travail",
    questions: [
      { id: 1, text: "Comment évaluez-vous votre environnement de travail ?", type: "multiple_choice", options: ["Excellent", "Bon", "Moyen", "Mauvais"] },
      { id: 2, text: "Quelles améliorations suggéreriez-vous ?", type: "open_ended" }
    ]
  },
  {
    id: 2,
    title: "Évaluation du stress",
    description: "Mesurez le niveau de stress des employés",
    questions: [
      { id: 1, text: "Sur une échelle de 1 à 5, quel est votre niveau de stress au travail ?", type: "multiple_choice", options: ["1", "2", "3", "4", "5"] },
      { id: 2, text: "Quelles sont les principales sources de stress dans votre travail ?", type: "open_ended" }
    ]
  }
]

export default function QuizManagement() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes)
  const [newQuiz, setNewQuiz] = useState<Quiz>({ id: 0, title: '', description: '', questions: [] })
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null)
  const router = useRouter()

  const handleCreateQuiz = () => {
    if (newQuiz.title && newQuiz.description) {
      setQuizzes([...quizzes, { ...newQuiz, id: Date.now() }])
      setNewQuiz({ id: 0, title: '', description: '', questions: [] })
      toast.success('Quiz créé avec succès')
    } else {
      toast.error('Veuillez remplir tous les champs')
    }
  }

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuizId(quiz.id)
    setNewQuiz(quiz)
  }

  const handleUpdateQuiz = () => {
    setQuizzes(quizzes.map(q => q.id === editingQuizId ? newQuiz : q))
    setEditingQuizId(null)
    setNewQuiz({ id: 0, title: '', description: '', questions: [] })
    toast.success('Quiz mis à jour avec succès')
  }

  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id))
    toast.info('Quiz supprimé')
  }

  const handleAddQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { id: Date.now(), text: '', type: 'multiple_choice', options: [''] }]
    })
  }

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = newQuiz.questions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value }
      }
      return q
    })
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = newQuiz.questions.map((q, i) => {
      if (i === questionIndex && q.options) {
        const updatedOptions = [...q.options]
        updatedOptions[optionIndex] = value
        return { ...q, options: updatedOptions }
      }
      return q
    })
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
  }

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = newQuiz.questions.map((q, i) => {
      if (i === questionIndex && q.options) {
        return { ...q, options: [...q.options, ''] }
      }
      return q
    })
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
  }

  const handleRemoveQuestion = (index: number) => {
    setNewQuiz({
      ...newQuiz,
      questions: newQuiz.questions.filter((_, i) => i !== index)
    })
  }

  const handleSendQuiz = (quizId: number) => {
    // Ici, vous implémenteriez la logique d'envoi du quiz par email
    toast.success(`Quiz ${quizId} envoyé par email`)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Gestion des Quiz</CardTitle>
              <div className="w-[100px]"></div>
            </div>
            <CardDescription className="text-center text-[#3c6382] mt-2">
              Créez, visualisez et envoyez des quiz à vos employés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Liste des Quiz</TabsTrigger>
                <TabsTrigger value="create">Créer un Quiz</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                {quizzes.map(quiz => (
                  <Card key={quiz.id} className="mb-4">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0a3d62]">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" /> Voir
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{quiz.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                              {quiz.questions.map((question, index) => (
                                <div key={question.id} className="mb-4">
                                  <p className="font-semibold">{index + 1}. {question.text}</p>
                                  {question.type === 'multiple_choice' && question.options && (
                                    <ul className="list-disc list-inside ml-4 mt-2">
                                      {question.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>{option}</li>
                                      ))}
                                    </ul>
                                  )}
                                  {question.type === 'open_ended' && (
                                    <p className="italic ml-4 mt-2">Réponse ouverte</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => handleEditQuiz(quiz)}>
                          <Edit className="h-4 w-4 mr-2" /> Modifier
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteQuiz(quiz.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                        </Button>
                        <Button size="sm" onClick={() => handleSendQuiz(quiz.id)} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white">
                          <Send className="h-4 w-4 mr-2" /> Envoyer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="create">
                <Card>
                  <CardContent className="space-y-4 p-6">
                    <Input
                      placeholder="Titre du quiz"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Description du quiz"
                      value={newQuiz.description}
                      onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                    />
                    {newQuiz.questions.map((question, index) => (
                      <Card key={question.id} className="p-4">
                        <div className="space-y-2">
                          <Input
                            placeholder="Question"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                          />
                          <Select
                            value={question.type}
                            onValueChange={(value) => handleQuestionChange(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type de question" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple_choice">Choix multiple</SelectItem>
                              <SelectItem value="open_ended">Réponse ouverte</SelectItem>
                            </SelectContent>
                          </Select>
                          {question.type === 'multiple_choice' && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <Input
                                  key={optionIndex}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                />
                              ))}
                              <Button onClick={() => handleAddOption(index)} size="sm" variant="outline">
                                Ajouter une option
                              </Button>
                            </div>
                          )}
                          <Button onClick={() => handleRemoveQuestion(index)} size="sm" variant="destructive">
                            Supprimer la question
                          </Button>
                        </div>
                      </Card>
                    ))}
                    <Button onClick={handleAddQuestion} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Ajouter une question
                    </Button>
                    <Button onClick={editingQuizId ? handleUpdateQuiz : handleCreateQuiz} className="w-full bg-[#3c6382] hover:bg-[#0a3d62] text-white">
                      {editingQuizId ? 'Mettre à jour le quiz' : 'Créer le quiz'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}