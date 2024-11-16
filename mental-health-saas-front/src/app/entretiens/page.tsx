'use client'

import { useState, useEffect } from "react"
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Archive } from 'lucide-react'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  addInterviewRequestApi,
  fetchInterviewRequestsApi,
  updateInterviewRequestApi,
  deleteInterviewRequestApi,
} from "../../lib/apiClients"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function InterviewRequests() {
  const [requests, setRequests] = useState<any[]>([])
  const [archivedRequests, setArchivedRequests] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await fetchInterviewRequestsApi()
        setRequests(data.filter((req) => req.status !== "archived"))
        setArchivedRequests(data.filter((req) => req.status === "archived"))
      } catch (error) {
        setError("Erreur lors de la récupération des demandes d'entretien")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleConfirm = async (id: string) => {
    try {
      const updatedRequest = await updateInterviewRequestApi(id, { status: "confirmed" });
  
      setRequests(requests.map((req) => (req.id === id ? updatedRequest : req)));
  
      setArchivedRequests([...archivedRequests, updatedRequest]);
  
      toast.success("Entretien confirmé");
    } catch (error) {
      toast.error("Erreur lors de la confirmation");
      console.error("Erreur lors de la confirmation :", error);
    }
  };
  const handleDecline = async (id: string) => {
    try {
      const updatedRequest = await updateInterviewRequestApi(id, { status: "declined" })
      setRequests(requests.map((req) => (req.id === id ? updatedRequest : req)))
      toast.info("Entretien décliné")
    } catch (error) {
      toast.error("Erreur lors du refus")
    }
  }

  const handleArchive = async (id: string) => {
    try {
      const updatedRequest = await updateInterviewRequestApi(id, { status: "archived" })
      setRequests(requests.filter((req) => req.id !== id))
      setArchivedRequests([...archivedRequests, updatedRequest])
      toast.success("Entretien archivé")
    } catch (error) {
      toast.error("Erreur lors de l'archivage")
    }
  }

  
  const handleResetStatus = async (id: string) => {
    try {
      const updatedRequest = await updateInterviewRequestApi(id, { status: "pending" });
  
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === id ? updatedRequest : req))
      );
      setArchivedRequests((prevArchivedRequests) =>
        prevArchivedRequests.filter((req) => req.id !== id)
      );
  
      toast.success('État réinitialisé à "En attente"');
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation");
    }
  };
  

  const RequestCard = ({ request, showArchive = false }: { request: any; showArchive?: boolean }) => (
    <Card className="mb-4 transition-all duration-300 hover:shadow-lg">
      <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Calendar className="h-10 w-10 text-[#0a3d62]" />
          <div>
            <h3 className="text-lg font-semibold text-[#0a3d62]">{request.questionnaire}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(request.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              <Clock className="inline-block mr-1 h-4 w-4" />
              {request.time}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
          {request.status === "pending" && (
            <>
              <Button onClick={() => handleConfirm(request.id)} className="bg-[#3c6382] hover:bg-[#0a3d62] text-white">
                <CheckCircle className="mr-2 h-4 w-4" /> Confirmer
              </Button>
              <Button onClick={() => handleDecline(request.id)} variant="destructive">
                <XCircle className="mr-2 h-4 w-4" /> Décliner
              </Button>
            </>
          )}
          {request.status === "confirmed" && (
            <>
              <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
              <Button onClick={() => handleResetStatus(request.id)} variant="outline" className="text-[#0a3d62]">
                Réinitialiser
              </Button>
            </>
          )}
          {request.status === "declined" && (
            <>
              <Badge className="bg-red-100 text-red-800">Décliné</Badge>
              <Button onClick={() => handleResetStatus(request.id)} variant="outline" className="text-[#0a3d62]">
                Réinitialiser
              </Button>
            </>
          )}
             {request.status === "archived" && (
            <>
              <Button onClick={() => handleResetStatus(request.id)} variant="outline" className="text-[#0a3d62]">
                Réinitialiser
              </Button>
            </>
          )}
           {(request.status !== "pending" && request.status !== "archived") && (
            <Button onClick={() => handleArchive(request.id)} variant="outline" className="text-[#0a3d62]">
              <Archive className="mr-2 h-4 w-4" /> Archiver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-4 md:p-8`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardHeader className="pb-4">
            <div className="flex flex-col items-stretch gap-4">
              <div className="self-start">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd]/30 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              </div>
              <div className="text-center w-full">
                <CardTitle className="text-2xl text-[#0a3d62] mb-2">Demandes d'entretien</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Gérez les demandes d'entretien et suivez leur statut.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="pending">En Attente</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmés</TabsTrigger>
                <TabsTrigger value="declined">Déclinés</TabsTrigger>
                <TabsTrigger value="archived">Archivés</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="pending">
                  {loading ? (
                    <p className="text-center">Chargement des données...</p>
                  ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                  ) : (
                    requests
                      .filter((request) => request.status === "pending")
                      .map((request) => <RequestCard key={request.id} request={request} />)
                  )}
                </TabsContent>
                <TabsContent value="confirmed">
                  {requests
                    .filter((request) => request.status === "confirmed")
                    .map((request) => <RequestCard key={request.id} request={request} />)}
                </TabsContent>
                <TabsContent value="declined">
                  {requests
                    .filter((request) => request.status === "declined")
                    .map((request) => <RequestCard key={request.id} request={request} />)}
                </TabsContent>
                <TabsContent value="archived">
                  {archivedRequests
                    .filter((request) => request.status === "archived")
                    .map((request) => <RequestCard key={request.id} request={request} showArchive />)}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer />
    </div>
  )
}
