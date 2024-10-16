"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import confetti from 'canvas-confetti'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const quizData = [
  {
    question: "Comment évaluez-vous votre niveau de stress au travail aujourd'hui ?",
    options: ["Très bas", "Bas", "Moyen", "Élevé", "Très élevé"]
  },
  {
    question: "Avez-vous pratiqué une activité de bien-être cette semaine ?",
    options: ["Oui, plusieurs fois", "Oui, une fois", "Non, mais j'en ai l'intention", "Non, je n'ai pas eu l'occasion", "Non, je ne suis pas intéressé(e)"]
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

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(quizData.length).fill(''))
  const [isCompleted, setIsCompleted] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    const score = answers.reduce((acc, answer, index) => {
      const optionIndex = quizData[index].options.indexOf(answer)
      return acc + (5 - optionIndex)
    }, 0)
    return (score / (quizData.length * 5)) * 100
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[#0a3d62]">Quiz de bien-être au travail</CardTitle>
          <CardDescription className="text-center text-[#3c6382]">
            Votre avis est important pour améliorer votre environnement de travail
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-[#0a3d62]">{quizData[currentQuestion].question}</h2>
                <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-3">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#82ccdd]/20 transition-colors"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-[#3c6382] cursor-pointer flex-grow">{option}</Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#0a3d62]">Quiz terminé !</h2>
              <p className="text-xl mb-6 text-[#3c6382]">Votre score de bien-être : {calculateScore().toFixed(2)}%</p>
              <p className="text-[#3c6382]">Merci pour votre participation. Vos réponses nous aideront à améliorer l'environnement de travail.</p>
            </motion.div>
          )}
          {!isCompleted && (
            <div className="mt-8 flex justify-between items-center">
              <Button 
                onClick={handlePrevious} 
                disabled={currentQuestion === 0}
                variant="outline"
                className="bg-white/50 hover:bg-white/70 text-[#3c6382]"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!answers[currentQuestion]}
                className="bg-[#3c6382] hover:bg-[#0a3d62] text-white"
              >
                {currentQuestion < quizData.length - 1 ? (
                  <>Suivant <ChevronRight className="ml-2 h-4 w-4" /></>
                ) : (
                  'Terminer'
                )}
              </Button>
            </div>
          )}
          {!isCompleted && (
            <div className="mt-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                <Progress value={(currentQuestion + 1) / quizData.length * 100} className="h-2" />
              </motion.div>
              <p className="text-center mt-2 text-sm text-[#3c6382]">
                Question {currentQuestion + 1} sur {quizData.length}
              </p>    
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}