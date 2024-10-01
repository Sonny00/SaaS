"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Loader2 } from "lucide-react"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
   
      const response = await fetch('http://localhost:8000/auth/login', { // Remplace avec ton URL backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Erreur de connexion, veuillez vérifier vos identifiants.')
      }

      const data = await response.json()

      // Stocker le token JWT dans le localStorage
      localStorage.setItem('token', data.access_token)

      // Rediriger l'utilisateur après une connexion réussie (par exemple vers le dashboard)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${poppins.className}`}
      style={{ backgroundImage: "url('/images/Login_image.png')" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0a3d62]">Bienvenue chez [NomApp]</h2>
            <p className="text-center text-[#3c6382] mb-8">Votre espace de bien-être au travail</p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#3c6382]">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#82ccdd] rounded-md focus:ring-2 focus:ring-[#60a3bc] bg-white/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#3c6382]">Mot de passe</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#82ccdd] rounded-md focus:ring-2 focus:ring-[#60a3bc] bg-white/50"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3c6382] to-[#0a3d62] text-white font-semibold py-2 px-4 rounded-md hover:from-[#345672] hover:to-[#092d4a] focus:outline-none focus:ring-2 focus:ring-[#60a3bc] focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </div>
          <div className="px-8 py-4 bg-[#f0f8ff]/80 border-t border-[#82ccdd] flex justify-between items-center">
            <a href="#" className="text-sm text-[#3c6382] hover:underline">Mot de passe oublié ?</a>
            <a href="#" className="text-sm text-[#3c6382] hover:underline">Créer un compte</a>
          </div>
        </div>
        <motion.div
          className="mt-8 text-center text-white text-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
        </motion.div>
      </motion.div>
    </div>
  )
}
