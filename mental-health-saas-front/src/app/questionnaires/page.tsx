"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "../../../components/ui/progress"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Exemple de données de quiz
const quizData = [
  {
    question: "Comment évaluez-vous votre niveau de stress au travail aujourd'hui ?",
    options: ["Très bas", "Bas", "Moyen", "Élevé", "Très élevé"]
  },
  {
    question: "Avez-vous pratiqué une activité de bien-être cette semaine ?",
    options: ["Oui, plusieurs fois", "Oui, une fois", "Non, mais j'en ai l'intention", "Non, je n'en ai pas eu l'occasion", "Non, je ne suis pas intéressé(e)"]
  },
  {
    question: "Comment qualifieriez-vous votre équilibre travail-vie personnelle ?",
    options: ["Excellent", "Bon", "Moyen", "Mauvais", "Très mauvais"]
  },
  {
    question: "Vous sentez-vous soutenu(e) par votre équipe et vos supérieurs ?",
    options: ["Totalement", "Plutôt oui", "Moyennement", "Plutôt non", "Pas du tout"]
  },
  {
    question: "À quelle fréquence vous sentez-vous motivé(e) au travail ?",
    options: ["Tous les jours", "Souvent", "Parfois", "Rarement", "Jamais"]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(quizData.length).fill(''))

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    // Ici, vous pouvez ajouter la logique pour soumettre les réponses
    console.log("Réponses soumises:", answers)
    // Vous pourriez par exemple envoyer les réponses à une API
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Quiz de bien-être au travail</CardTitle>
          <CardDescription className="text-center text-[#3c6382]">
            Votre avis est important pour améliorer votre environnement de travail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#0a3d62]">{quizData[currentQuestion].question}</h2>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
              {quizData[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-[#3c6382]">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
          <div className="mt-6 flex justify-between items-center">
            <Button 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
              variant="outline"
              className="bg-white/50 hover:bg-white/70"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
            {currentQuestion < quizData.length - 1 ? (
              <Button 
                onClick={handleNext} 
                disabled={!answers[currentQuestion]}
                className="bg-[#3c6382] hover:bg-[#0a3d62] text-white"
              >
                Suivant <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!answers[currentQuestion]}
                className="bg-[#3c6382] hover:bg-[#0a3d62] text-white"
              >
                Soumettre
              </Button>
            )}
          </div>
          <div className="mt-4">
            <Progress value={(currentQuestion + 1) / quizData.length * 100} className="w-full" />
            <p className="text-center mt-2 text-sm text-[#3c6382]">
              Question {currentQuestion + 1} sur {quizData.length}
            </p>    
          </div>
        </CardContent>
      </Card>
    </div>
  )
}