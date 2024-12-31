'use client'

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import { Poppins } from "next/font/google"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "../../store/slices/authSlice"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingTransition from "@/components/loading"
import {
  FileQuestion,
  Activity,
  Brain,
  Users,
  Calendar,
  Settings,
  Home,
  MessageCircle,
  HelpCircle,
  LogOut,
  Speech,
  CircleHelp,
  Menu,
  TrendingUp,
  Zap,
} from "lucide-react"

// Dynamic imports for charts
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false })
const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), { ssr: false })
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false })
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false })
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false })
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false })
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false })

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const mockWellbeingData = [
  { day: "Lun", score: 7 },
  { day: "Mar", score: 6 },
  { day: "Mer", score: 8 },
  { day: "Jeu", score: 5 },
  { day: "Ven", score: 9 },
  { day: "Sam", score: 7 },
  { day: "Dim", score: 8 },
]

const mockStressLevels = [
  { name: "Semaine 1", niveau: 6 },
  { name: "Semaine 2", niveau: 7 },
  { name: "Semaine 3", niveau: 5 },
  { name: "Semaine 4", niveau: 4 },
]

const mockActivitiesData = [
  { name: "Méditation", value: 30 },
  { name: "Exercice", value: 25 },
  { name: "Lecture", value: 20 },
  { name: "Socialisation", value: 15 },
  { name: "Hobby", value: 10 },
]

const mockProductivityData = [
  { month: "Jan", productivity: 65 },
  { month: "Fév", productivity: 59 },
  { month: "Mar", productivity: 80 },
  { month: "Avr", productivity: 81 },
  { month: "Mai", productivity: 56 },
  { month: "Juin", productivity: 55 },
  { month: "Juil", productivity: 40 },
]

const mockEngagementData = [
  { month: "Jan", engagement: 4000 },
  { month: "Fév", engagement: 3000 },
  { month: "Mar", engagement: 5000 },
  { month: "Avr", engagement: 4500 },
  { month: "Mai", engagement: 6000 },
  { month: "Juin", engagement: 5500 },
  { month: "Juil", engagement: 7000 },
]

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Questionnaires", href: "/management", icon: FileQuestion },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Entretiens", href: "/entretiens", icon: Speech },
  { name: "Gestion des quiz", href: "/gestion_quizz", icon: CircleHelp },
  { name: "Aide", href: "/help", icon: HelpCircle },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function Dashboard() {
  const [wellbeingScore, setWellbeingScore] = useState(75)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: any) => state.auth)

  const handleLogout = () => {
    console.log("Déconnexion en cours...")
    localStorage.removeItem("token")
    dispatch(logout())
    router.push('/')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <LoadingTransition />
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className}`}>
      {/* Sidebar */}
      <nav className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0a3d62] to-[#0c2461] text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-6 flex flex-col h-full">
          <div className="text-2xl font-bold mb-8 flex items-center">
            <Brain className="h-8 w-8 mr-2" />
            MindfulWork
          </div>
          <ScrollArea className="flex-grow -mx-4 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                      pathname === item.href ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Button
            variant="ghost"
            className="mt-4 w-full text-white hover:bg-white/10 flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md shadow-md p-4 lg:p-6 flex justify-between items-center">
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0a3d62]">Tableau de bord</h1>
          <Link href="/settings" passHref>
            <Button variant="outline" className="bg-white/50 hover:bg-white/70">
              <Settings className="mr-2 h-4 w-4" /> Paramètres
            </Button>
          </Link>
        </header>
        <main className="h-[calc(100vh-80px)] overflow-auto p-4 lg:p-6" >
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard title="Score de bien-être" value={`${wellbeingScore}/100`} icon={Activity} />
              <StatCard title="Sessions de relaxation" value="12" icon={Brain} />
              <StatCard title="Employés actifs" value="1,274" icon={Users} />
              <StatCard title="Activités à venir" value="8" icon={Calendar} />
            </div>

            <Tabs defaultValue="wellbeing" className="space-y-4">
              <TabsList>
                <TabsTrigger value="wellbeing">Bien-être</TabsTrigger>
                <TabsTrigger value="productivity">Productivité</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
              <TabsContent value="wellbeing" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartCard title="Score de bien-être par jour" chart={
                    <LineChart data={mockWellbeingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#0a3d62" strokeWidth={2} />
                    </LineChart>
                  } />
                  <ChartCard title="Niveaux de stress hebdomadaires" chart={
                    <BarChart data={mockStressLevels}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="niveau" fill="#0a3d62" />
                    </BarChart>
                  } />
                </div>
                <ChartCard title="Répartition des activités" chart={
                  <PieChart>
                    <Pie data={mockActivitiesData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#0a3d62">
                      {mockActivitiesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                } />
              </TabsContent>
              <TabsContent value="productivity" className="space-y-4">
                <ChartCard title="Productivité mensuelle" chart={
                  <AreaChart data={mockProductivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="productivity" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                } />
              </TabsContent>
              <TabsContent value="engagement" className="space-y-4">
                <ChartCard title="Engagement des employés" chart={
                  <LineChart data={mockEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                } />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-white/80 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#3c6382]">{title}</CardTitle>
        <Icon className="h-4 w-4 text-[#0a3d62]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#0a3d62]">{value}</div>
      </CardContent>
    </Card>
  )
}

function ChartCard({ title, chart }) {
  return (
    <Card className="bg-white/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#0a3d62]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          {chart}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 