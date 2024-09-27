"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Activity, Brain, Users, Calendar, BarChart2, Settings, Home, FileText, MessageCircle, HelpCircle, LogOut } from 'lucide-react'
import Link from 'next/link'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const mockWellbeingData = [
  { day: 'Lun', score: 7 },
  { day: 'Mar', score: 6 },
  { day: 'Mer', score: 8 },
  { day: 'Jeu', score: 5 },
  { day: 'Ven', score: 9 },
  { day: 'Sam', score: 7 },
  { day: 'Dim', score: 8 },
]

const mockStressLevels = [
  { name: 'Semaine 1', niveau: 6 },
  { name: 'Semaine 2', niveau: 7 },
  { name: 'Semaine 3', niveau: 5 },
  { name: 'Semaine 4', niveau: 4 },
]

const mockActivitiesData = [
  { name: 'Méditation', value: 30 },
  { name: 'Exercice', value: 25 },
  { name: 'Lecture', value: 20 },
  { name: 'Socialisation', value: 15 },
  { name: 'Hobby', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function DashboardComponent() {
  const [wellbeingScore, setWellbeingScore] = useState(75)

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} flex`}>
      {/* Barre de navigation latérale */}
      <nav className="w-64 bg-[#0a3d62] text-white p-6 space-y-6">
        <div className="text-2xl font-bold mb-8">MindfulWork</div>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-[#82ccdd] transition-colors">
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-[#82ccdd] transition-colors">
              <Activity className="h-5 w-5" />
              <span>Statistiques</span>
            </a>
          </li>
          <li>
          <Link href="/dashboard/report">
            <a  className="flex items-center space-x-2 hover:text-[#82ccdd] transition-colors">
              <FileText className="h-5 w-5" />
              <span>Rapports</span>
            </a>
            </Link>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-[#82ccdd] transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-[#82ccdd] transition-colors">
              <HelpCircle className="h-5 w-5" />
              <span>Aide</span>
            </a>
          </li>
        </ul>
        <div className="mt-auto pt-6">
          <Button variant="outline" className="w-full text-white border-white hover:bg-white/10">
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0a3d62]">Tableau de bord</h1>
            <Button variant="outline" className="bg-white/50 hover:bg-white/70">
              <Settings className="mr-2 h-4 w-4" /> Paramètres
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#3c6382]">Score de bien-être</CardTitle>
                <Activity className="h-4 w-4 text-[#0a3d62]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0a3d62]">{wellbeingScore}/100</div>
                <Progress value={wellbeingScore} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#3c6382]">Sessions de relaxation</CardTitle>
                <Brain className="h-4 w-4 text-[#0a3d62]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0a3d62]">12</div>
                <p className="text-xs text-[#3c6382]">+2 depuis la semaine dernière</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#3c6382]">Employés actifs</CardTitle>
                <Users className="h-4 w-4 text-[#0a3d62]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0a3d62]">1,274</div>
                <p className="text-xs text-[#3c6382]">+10% ce mois-ci</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#3c6382]">Prochaine session</CardTitle>
                <Calendar className="h-4 w-4 text-[#0a3d62]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0a3d62]">Demain, 14h</div>
                <p className="text-xs text-[#3c6382]">Méditation guidée</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#0a3d62]">Évolution du bien-être</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockWellbeingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3c6382" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#0a3d62]">Niveaux de stress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockStressLevels}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="niveau" stroke="#3c6382" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#0a3d62]">Répartition des activités</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockActivitiesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockActivitiesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {mockActivitiesData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#0a3d62]">Activités recommandées</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-[#3c6382]" />
                    <span>Séance de respiration guidée (15 min)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-[#3c6382]" />
                    <span>Exercice de pleine conscience (10 min)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-[#3c6382]" />
                    <span>Pause active : étirements au bureau (5 min)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-[#3c6382]" />
                    <span>Journal de gratitude (5 min)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}