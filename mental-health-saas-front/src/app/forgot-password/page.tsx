"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Veuillez entrer votre adresse e-mail')
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6 flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Mot de passe oublié</CardTitle>
            <CardDescription className="text-center text-[#3c6382]">
              Entrez votre e-mail pour recevoir les instructions de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0a3d62]">Adresse e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#3c6382] hover:bg-[#0a3d62] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Envoyer les instructions
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-4"
                >
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <p className="text-[#0a3d62] font-medium">
                    Si l'adresse e-mail {email} est associée à un compte, vous recevrez bientôt un e-mail avec les instructions pour réinitialiser votre mot de passe.
                  </p>
                  <p className="text-[#3c6382] text-sm">
                    N'oubliez pas de vérifier votre dossier de spam si vous ne trouvez pas l'e-mail dans votre boîte de réception.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => router.back()}
                className="text-[#3c6382] hover:text-[#0a3d62] transition-colors duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la connexion
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}