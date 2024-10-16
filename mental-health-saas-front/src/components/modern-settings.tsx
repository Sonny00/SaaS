"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, Save, Bell, Moon, Lock, User, Palette, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const settingsCategories = [
  { id: 'account', name: 'Compte', icon: User },
  { id: 'appearance', name: 'Apparence', icon: Palette },
  { id: 'security', name: 'Sécurité', icon: Shield },
]

export function ModernSettingsComponent() {
  const [activeCategory, setActiveCategory] = useState('account')
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [language, setLanguage] = useState('fr')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const router = useRouter()

  const handleSave = () => {
    toast.success('Paramètres sauvegardés avec succès')
  }

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Sélectionnez une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4" />
                <Label htmlFor="dark-mode">Mode sombre</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        )
      case 'security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardContent className="p-0">
            <div className="flex">
              <div className="w-64 bg-[#3c6382]/10 p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5 text-[#0a3d62]" />
                  <Button
                    onClick={() => router.back()}
                    variant="link"
                    className="text-[#0a3d62] hover:text-[#3c6382] transition-colors duration-300"
                  >
                    Retour
                  </Button>
                </div>
                <h2 className="text-2xl font-bold text-[#0a3d62] mb-4">Paramètres</h2>
                <nav className="space-y-2">
                  {settingsCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeCategory === category.id
                          ? 'bg-[#3c6382] text-white'
                          : 'text-[#0a3d62] hover:bg-[#3c6382]/20'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <category.icon className="mr-2 h-4 w-4" />
                      {category.name}
                    </Button>
                  ))}
                </nav>
              </div>
              <div className="flex-1 p-8">
                <h3 className="text-xl font-semibold text-[#0a3d62] mb-6">
                  {settingsCategories.find(c => c.id === activeCategory)?.name}
                </h3>
                {renderSettingsContent()}
                <Separator className="my-6" />
                <div className="flex justify-end">
                  <Button onClick={handleSave} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                    <Save className="mr-2 h-4 w-4" /> Sauvegarder les changements
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}