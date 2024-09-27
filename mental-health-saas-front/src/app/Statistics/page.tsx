"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ArrowLeft, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Données simulées pour les graphiques (inchangées)
const wellbeingTrend = [
  { month: 'Jan', score: 65 }, { month: 'Feb', score: 68 }, { month: 'Mar', score: 75 },
  { month: 'Apr', score: 72 }, { month: 'May', score: 80 }, { month: 'Jun', score: 78 }
]

const stressFactors = [
  { name: 'Charge de travail', value: 30 },
  { name: 'Équilibre vie pro/perso', value: 25 },
  { name: 'Relations au travail', value: 20 },
  { name: 'Environnement de travail', value: 15 },
  { name: 'Reconnaissance', value: 10 }
]

const departmentComparison = [
  { department: 'RH', wellbeing: 75, stress: 45, satisfaction: 80 },
  { department: 'IT', wellbeing: 70, stress: 60, satisfaction: 65 },
  { department: 'Marketing', wellbeing: 80, stress: 50, satisfaction: 75 },
  { department: 'Finance', wellbeing: 65, stress: 70, satisfaction: 60 },
  { department: 'Opérations', wellbeing: 72, stress: 55, satisfaction: 70 }
]

const engagementOverTime = [
  { month: 'Jan', engagement: 60, participation: 70 },
  { month: 'Feb', engagement: 65, participation: 75 },
  { month: 'Mar', engagement: 75, participation: 80 },
  { month: 'Apr', engagement: 70, participation: 85 },
  { month: 'May', engagement: 80, participation: 90 },
  { month: 'Jun', engagement: 85, participation: 88 }
]

const wellbeingDimensions = [
  { dimension: 'Physique', score: 70 },
  { dimension: 'Mental', score: 75 },
  { dimension: 'Émotionnel', score: 65 },
  { dimension: 'Social', score: 80 },
  { dimension: 'Professionnel', score: 72 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function DetailedStatistics() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('6m')

  const goBack = () => {
    router.back()
  }

  const handleExport = () => {
    // Logique d'export à implémenter
    console.log('Exporting data...')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <Card className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
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
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] h-9 text-sm rounded-full">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Dernier mois</SelectItem>
                  <SelectItem value="3m">3 derniers mois</SelectItem>
                  <SelectItem value="6m">6 derniers mois</SelectItem>
                  <SelectItem value="1y">Dernière année</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} variant="outline" size="sm" className="h-9 px-3 bg-white/50 hover:bg-white/70 rounded-full">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Statistiques détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="wellbeing">Bien-être</TabsTrigger>
              <TabsTrigger value="stress">Stress</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tendance du bien-être</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={wellbeingTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Facteurs de stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={stressFactors}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {stressFactors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="wellbeing">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison par département</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentComparison}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="wellbeing" fill="#8884d8" />
                        <Bar dataKey="stress" fill="#82ca9d" />
                        <Bar dataKey="satisfaction" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Dimensions du bien-être</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={wellbeingDimensions}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="stress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution du stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={wellbeingTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#82ca9d" name="Niveau de stress" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition des facteurs de stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={stressFactors}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {stressFactors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="engagement">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement et participation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={engagementOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="engagement" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="participation" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison de l'engagement par département</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentComparison}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="wellbeing" fill="#8884d8" name="Bien-être" />
                        <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfaction" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}