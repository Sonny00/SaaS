"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../../store/slices/authSlice"; // Import du logout
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingTransition from "@/components/loading";
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
  MessageSquareMore,
  Speech,
} from "lucide-react";

// Import dynamique des graphiques pour lazy loading
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart), { ssr: false });
const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const Line = dynamic(() => import("recharts").then(mod => mod.Line), { ssr: false });
const Pie = dynamic(() => import("recharts").then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(mod => mod.Cell), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const mockWellbeingData = [
  { day: "Lun", score: 7 },
  { day: "Mar", score: 6 },
  { day: "Mer", score: 8 },
  { day: "Jeu", score: 5 },
  { day: "Ven", score: 9 },
  { day: "Sam", score: 7 },
  { day: "Dim", score: 8 },
];

const mockStressLevels = [
  { name: "Semaine 1", niveau: 6 },
  { name: "Semaine 2", niveau: 7 },
  { name: "Semaine 3", niveau: 5 },
  { name: "Semaine 4", niveau: 4 },
];

const mockActivitiesData = [
  { name: "Méditation", value: 30 },
  { name: "Exercice", value: 25 },
  { name: "Lecture", value: 20 },
  { name: "Socialisation", value: 15 },
  { name: "Hobby", value: 10 },
];

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  //{ name: "Statistiques", href: "/statistics", icon: Activity },
  { name: "Rapports", href: "/rapports", icon: FileQuestion },
  { name: "Questionnaires", href: "/management", icon: FileQuestion },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Entretiens", href: "/entretiens", icon: Speech },
  { name: "Aide", href: "/help", icon: HelpCircle },
  
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
  const [wellbeingScore, setWellbeingScore] = useState(75);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth); // Vérification de l'authentification

  const handleLogout = () => {
    console.log("Déconnexion en cours...");
    localStorage.removeItem("token"); // Suppression du token
    dispatch(logout()); // Dispatch de l'action de déconnexion
    router.push('/'); // Redirection vers la page d'accueil
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingTransition />;
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className}`}>
      {/* Navigation sidebar */}
      <nav className="w-64 bg-gradient-to-b from-[#0a3d62] to-[#0c2461] text-white flex flex-col h-full">
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
        <div className="h-full overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-[#0a3d62]">Tableau de bord</h1>
              <Link href="/settings" passHref>
                <Button variant="outline" className="bg-white/50 hover:bg-white/70">
                  <Settings className="mr-2 h-4 w-4" /> Paramètres
                </Button>
              </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#3c6382]">Score de bien-être</CardTitle>
                  <Activity className="h-4 w-4 text-[#0a3d62]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0a3d62]">{wellbeingScore}/100</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#3c6382]">Sessions de relaxation</CardTitle>
                  <Brain className="h-4 w-4 text-[#0a3d62]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0a3d62]">12</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#3c6382]">Employés actifs</CardTitle>
                  <Users className="h-4 w-4 text-[#0a3d62]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0a3d62]">1,274</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#3c6382]">Activités à venir</CardTitle>
                  <Calendar className="h-4 w-4 text-[#0a3d62]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0a3d62]">8</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0a3d62]">Score de bien-être par jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockWellbeingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#0a3d62" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0a3d62]">Niveaux de stress hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockStressLevels}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="niveau" fill="#0a3d62" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0a3d62]">Répartition des activités</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={mockActivitiesData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#0a3d62">
                        {mockActivitiesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
