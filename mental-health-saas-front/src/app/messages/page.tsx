"use client"

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, MessageCircle, FileDown, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { jsPDF } from "jspdf"
import "jspdf-autotable"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Simulated data for messages
const initialMessages = [
  { id: 1, subject: "Problème de communication", content: "Je ressens un manque de communication au sein de l'équipe...", date: "2023-09-15", status: "Non traité", priority: "Moyenne" },
  { id: 2, subject: "Suggestion d'amélioration", content: "J'ai une idée pour améliorer notre processus de...", date: "2023-09-16", status: "En cours", priority: "Basse" },
  { id: 3, subject: "Harcèlement", content: "Je souhaite signaler un comportement inapproprié...", date: "2023-09-17", status: "Urgent", priority: "Haute" },
  { id: 4, subject: "Question sur les avantages", content: "J'aimerais avoir plus d'informations sur notre politique de...", date: "2023-09-18", status: "Traité", priority: "Basse" },
  { id: 5, subject: "Stress au travail", content: "Je trouve que la charge de travail est devenue...", date: "2023-09-19", status: "Non traité", priority: "Moyenne" },
]

export default function AnonymousMessages() {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [selectedMessages, setSelectedMessages] = useState([])
  const [note, setNote] = useState('')

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || message.status === statusFilter) &&
    (priorityFilter === 'all' || message.priority === priorityFilter)
  )

  const handleStatusChange = (messageId, newStatus) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    ))
    toast.success(`Statut mis à jour : ${newStatus}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Urgent': return 'bg-red-500'
      case 'En cours': return 'bg-yellow-500'
      case 'Traité': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Haute': return 'bg-red-500'
      case 'Moyenne': return 'bg-yellow-500'
      case 'Basse': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const toggleMessageSelection = (messageId) => {
    setSelectedMessages(prevSelected => 
      prevSelected.includes(messageId)
        ? prevSelected.filter(id => id !== messageId)
        : [...prevSelected, messageId]
    )
  }

  const toggleAllMessages = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(filteredMessages.map(message => message.id))
    }
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    const tableColumn = ["Sujet", "Date", "Statut", "Priorité", "Contenu"]
    const tableRows = []

    selectedMessages.forEach(messageId => {
      const message = messages.find(m => m.id === messageId)
      if (message) {
        const messageData = [
          message.subject,
          message.date,
          message.status,
          message.priority,
          message.content
        ]
        tableRows.push(messageData)
      }
    })

    doc.setFont("helvetica", "bold")
    doc.text("Rapport des Messages Anonymes Sélectionnés", 14, 15)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.autoTable(tableColumn, tableRows, { startY: 20 })
    doc.save("rapport-messages-anonymes.pdf")
    toast.success('Rapport PDF généré avec succès')
  }

  const handleSaveNote = () => {
    if (selectedMessage && note) {
      // Here you would typically send this note to your backend
      console.log(`Note saved for message ${selectedMessage.id}: ${note}`)
      toast.success('Note enregistrée avec succès')
      setNote('')
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
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
              <CardTitle className="text-2xl font-bold text-center text-[#0a3d62]">Messages Anonymes des Employés</CardTitle>
              <Button
                onClick={exportToPDF}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd] transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={selectedMessages.length === 0}
              >
                <FileDown className="mr-2 h-4 w-4" /> Exporter en PDF
              </Button>
            </div>
            <CardDescription className="text-center text-[#3c6382] mt-2">
              Gérez et répondez aux messages anonymes de vos employés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    placeholder="Rechercher un message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px] rounded-full">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Non traité">Non traité</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="Traité">Traité</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[180px] rounded-full">
                    <SelectValue placeholder="Filtrer par priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="Basse">Basse</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Haute">Haute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedMessages.length === filteredMessages.length}
                          onCheckedChange={toggleAllMessages}
                        />
                      </TableHead>
                      <TableHead>Sujet</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedMessages.includes(message.id)}
                            onCheckedChange={() => toggleMessageSelection(message.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{message.subject}</TableCell>
                        <TableCell>{message.date}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(message.status)} text-white`}>
                            {message.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(message.priority)} text-white`}>
                            {message.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedMessage(message)}
                              >
                                <MessageCircle className="mr-2 h-4 w-4" /> Voir
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>{selectedMessage?.subject}</DialogTitle>
                                <DialogDescription>
                                  Date: {selectedMessage?.date}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <p>{selectedMessage?.content}</p>
                                <div className="flex justify-between items-center">
                                  <Select 
                                    value={selectedMessage?.status} 
                                    onValueChange={(value) => handleStatusChange(selectedMessage.id, value)}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Changer le statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Non traité">Non traité</SelectItem>
                                      <SelectItem value="En cours">En cours</SelectItem>
                                      <SelectItem value="Urgent">Urgent</SelectItem>
                                      <SelectItem value="Traité">Traité</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Badge className={`${getPriorityColor(selectedMessage?.priority)} text-white`}>
                                    {selectedMessage?.priority}
                                  </Badge>
                                </div>
                                <Textarea 
                                  placeholder="Ajouter une note ou une réponse..." 
                                  value={note}
                                  onChange={(e) => setNote(e.target.value)}
                                />
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>Fermer</Button>
                                  <Button onClick={handleSaveNote}>Enregistrer</Button>
                                </DialogFooter>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}