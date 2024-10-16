"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, Save, Bell, Moon, Sun, Globe, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export function SettingsComponent() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [language, setLanguage] = useState('fr')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const router = useRouter()

  const handleSave = () => {
    // Simulate saving settings
    toast.success('Paramètres sauvegardés avec succès')
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
              <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Paramètres</CardTitle>
              <div className="w-[100px]"></div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="appearance">Apparence</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
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
              </TabsContent>
              <TabsContent value="appearance" className="space-y-4">
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
              </TabsContent>
              <TabsContent value="security" className="space-y-4">
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
              </TabsContent>
            </Tabs>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                <Save className="mr-2 h-4 w-4" /> Sauvegarder les changements
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}