"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, User, Mail, Lock, Building } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }
    if (!formData.acceptTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation')
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Compte créé avec succès')
    setIsSubmitting(false)
    // Redirect to login page or dashboard
    router.push('/login')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6 flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[450px] bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Créer un compte</CardTitle>
            <CardDescription className="text-center text-[#3c6382]">
              Remplissez le formulaire ci-dessous pour créer votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#0a3d62]">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#0a3d62]">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0a3d62]">Adresse e-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#0a3d62]">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#0a3d62]">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#0a3d62]">Entreprise</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Nom de l'entreprise"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[#0a3d62]">Rôle dans l'entreprise</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-[#82ccdd] transition-all duration-300">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employé</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="hr">Ressources Humaines</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                  className="border-[#3c6382]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte les{" "}
                  <Link href="/terms" className="text-[#3c6382] hover:underline">
                    conditions d'utilisation
                  </Link>
                </label>
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
                    Création en cours...
                  </motion.div>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" /> Créer mon compte
                  </>
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => router.push('/login')}
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