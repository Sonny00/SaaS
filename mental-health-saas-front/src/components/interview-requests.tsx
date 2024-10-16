"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Mock data for interview requests
const mockInterviewRequests = [
  { id: 1, date: '2024-03-15', time: '14:00', questionnaire: 'Satisfaction au travail', status: 'pending' },
  { id: 2, date: '2024-03-18', time: '10:30', questionnaire: 'Évaluation du stress', status: 'pending' },
  { id: 3, date: '2024-03-20', time: '16:00', questionnaire: 'Bien-être au travail', status: 'pending' },
]

export function InterviewRequestsComponent() {
  const [requests, setRequests] = useState(mockInterviewRequests)
  const router = useRouter()

  const handleConfirm = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'confirmed' } : req
    ))
    toast.success('Entretien confirmé avec succès')
  }

  const handleDecline = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ))
    toast.info('Entretien décliné')
  }

  const RequestCard = ({ request }) => (
    <Card className="mb-4">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <Calendar className="h-10 w-10 text-[#3c6382]" />
          <div>
            <h3 className="text-lg font-semibold text-[#0a3d62]">{request.questionnaire}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(request.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-muted-foreground">
              <Clock className="inline-block mr-1 h-4 w-4" />
              {request.time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {request.status === 'pending' && (
            <>
              <Button onClick={() => handleConfirm(request.id)} className="bg-green-500 hover:bg-green-600 text-white">
                <CheckCircle className="mr-2 h-4 w-4" /> Confirmer
              </Button>
              <Button onClick={() => handleDecline(request.id)} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                <XCircle className="mr-2 h-4 w-4" /> Décliner
              </Button>
            </>
          )}
          {request.status === 'confirmed' && (
            <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
          )}
          {request.status === 'declined' && (
            <Badge className="bg-red-100 text-red-800">Décliné</Badge>
          )}
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
              <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Demandes d'Entretiens</CardTitle>
              <div className="w-[100px]"></div>
            </div>
            <CardDescription className="text-center text-[#3c6382] mt-2">
              Gérez vos demandes d'entretiens suite aux questionnaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmés</TabsTrigger>
                <TabsTrigger value="declined">Déclinés</TabsTrigger>
              </TabsList>
              <TabsContent value="pending">
                {requests.filter(req => req.status === 'pending').map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </TabsContent>
              <TabsContent value="confirmed">
                {requests.filter(req => req.status === 'confirmed').map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </TabsContent>
              <TabsContent value="declined">
                {requests.filter(req => req.status === 'declined').map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}