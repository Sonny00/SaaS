"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, UserCheck, Clock, ThumbsUp, BarChart2, TrendingUp, Users, Target, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Exemple de données étendues pour les statistiques
const mockData = {
  emailsSent: 10000,
  responseRate: 75,
  averageResponseTime: 48,
  satisfactionScore: 4.2,
  openRate: 85,
  clickThroughRate: 30,
  conversionRate: 15,
  bounceRate: 2,
  unsubscribeRate: 0.5,
  weeklyData: [
    { name: 'Lun', emails: 1500, responses: 1200, opens: 1350, clicks: 450 },
    { name: 'Mar', emails: 2000, responses: 1600, opens: 1800, clicks: 600 },
    { name: 'Mer', emails: 1800, responses: 1300, opens: 1600, clicks: 500 },
    { name: 'Jeu', emails: 2200, responses: 1700, opens: 2000, clicks: 700 },
    { name: 'Ven', emails: 2500, responses: 2000, opens: 2300, clicks: 800 },
    { name: 'Sam', emails: 1000, responses: 700, opens: 900, clicks: 300 },
    { name: 'Dim', emails: 500, responses: 300, opens: 450, clicks: 150 },
  ],
  deviceData: [
    { name: 'Desktop', value: 60 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 10 },
  ],
  topPerformingEmails: [
    { subject: "Offre spéciale été", openRate: 92, clickRate: 45 },
    { subject: "Nouveaux produits", openRate: 88, clickRate: 40 },
    { subject: "Enquête de satisfaction", openRate: 78, clickRate: 35 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function EnhancedEmailStatisticsComponent() {
  const [timeRange, setTimeRange] = useState('week')
  const router = useRouter()

  const StatCard = ({ title, value, icon: Icon, description }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <Icon className="h-8 w-8 text-[#3c6382] mr-4" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-[#0a3d62]">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
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
              <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Statistiques Détaillées des Emails</CardTitle>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <StatCard title="Emails envoyés" value={mockData.emailsSent.toLocaleString()} icon={Mail} description="Total des emails envoyés" />
              <StatCard title="Taux d'ouverture" value={`${mockData.openRate}%`} icon={Zap} description="Pourcentage d'emails ouverts" />
              <StatCard title="Taux de clic" value={`${mockData.clickThroughRate}%`} icon={Target} description="Pourcentage de clics sur les liens" />
              <StatCard title="Taux de réponse" value={`${mockData.responseRate}%`} icon={UserCheck} description="Pourcentage de réponses reçues" />
              <StatCard title="Temps de réponse moyen" value={`${mockData.averageResponseTime}h`} icon={Clock} description="Délai moyen de réponse" />
              <StatCard title="Score de satisfaction" value={mockData.satisfactionScore.toFixed(1)} icon={ThumbsUp} description="Sur une échelle de 1 à 5" />
              <StatCard title="Taux de conversion" value={`${mockData.conversionRate}%`} icon={TrendingUp} description="Pourcentage d'actions souhaitées réalisées" />
              <StatCard title="Taux de désabonnement" value={`${mockData.unsubscribeRate}%`} icon={Users} description="Pourcentage de désabonnements" />
            </div>

            <Tabs defaultValue="evolution">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="evolution">Évolution des métriques</TabsTrigger>
                <TabsTrigger value="devices">Répartition par appareils</TabsTrigger>
              </TabsList>
              <TabsContent value="evolution">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-[#0a3d62]">Évolution des métriques clés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        emails: {
                          label: "Emails envoyés",
                          color: "hsl(var(--chart-1))",
                        },
                        opens: {
                          label: "Ouvertures",
                          color: "hsl(var(--chart-2))",
                        },
                        clicks: {
                          label: "Clics",
                          color: "hsl(var(--chart-3))",
                        },
                        responses: {
                          label: "Réponses",
                          color: "hsl(var(--chart-4))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData.weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="emails" stroke="var(--color-emails)" strokeWidth={2} />
                          <Line type="monotone" dataKey="opens" stroke="var(--color-opens)" strokeWidth={2} />
                          <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} />
                          <Line type="monotone" dataKey="responses" stroke="var(--color-responses)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-[#0a3d62]">Répartition par appareils</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockData.deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {mockData.deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#0a3d62]">Top 3 des emails les plus performants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sujet</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux d'ouverture</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux de clic</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockData.topPerformingEmails.map((email, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{email.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.openRate}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.clickRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}