'use client'

import { useState, useEffect } from 'react'
import { Poppins } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, FileDown, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { addAnonymousMessageApi, fetchAnonymousMessagesApi, updateAnonymousMessageApi, deleteAnonymousMessageApi } from '../../lib/apiClients'
import { Label } from "@/components/ui/label";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function EnhancedAnonymousMessages() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedMessages, setSelectedMessages] = useState([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState(null)
  const [isViewMessageDialogOpen, setIsViewMessageDialogOpen] = useState(false)
  const [viewingMessage, setViewingMessage] = useState(null)
  const [isBulkEditDialogOpen, setIsBulkEditDialogOpen] = useState(false)
  const [bulkEditStatus, setBulkEditStatus] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await fetchAnonymousMessagesApi()
      setMessages(fetchedMessages)
    } catch (error) {
      toast.error("Erreur lors de la récupération des messages")
    }
  }

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || message.status === statusFilter) &&
    (priorityFilter === 'all' || message.priority === priorityFilter)
  )

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      await updateAnonymousMessageApi(messageId, { status: newStatus })
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ))
      toast.success(`Statut mis à jour : ${newStatus}`)
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Urgent': return 'bg-red-500 hover:bg-red-600'
      case 'En cours': return 'bg-yellow-500 hover:bg-yellow-600'
      case 'Traité': return 'bg-green-500 hover:bg-green-600'
      default: return 'bg-gray-500 hover:bg-gray-600'
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


  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteAnonymousMessageApi(messageId)
      setMessages(messages.filter(msg => msg.id !== messageId))
      toast.success("Message supprimé avec succès.")
    } catch (error) {
      toast.error("Erreur lors de la suppression du message.")
    }
  }

  const openEditDialog = (message) => {
    setEditingMessage(message)
    setIsEditDialogOpen(true)
  }

  const openViewMessageDialog = (message) => {
    setViewingMessage(message);
    setIsViewMessageDialogOpen(true);
  };

  const handleBulkStatusChange = async () => {
    if (selectedMessages.length === 0 || !bulkEditStatus) return

    try {
      await Promise.all(selectedMessages.map(messageId => 
        updateAnonymousMessageApi(messageId, { status: bulkEditStatus })
      ))
      setMessages(messages.map(msg => 
        selectedMessages.includes(msg.id) ? { ...msg, status: bulkEditStatus } : msg
      ))
      setIsBulkEditDialogOpen(false)
      setBulkEditStatus('')
      setSelectedMessages([])
      toast.success(`Statut mis à jour en masse : ${bulkEditStatus}`)
    } catch (error) {
      toast.error("Erreur lors de la mise à jour en masse des statuts")
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#82ccdd] to-[#60a3bc] ${poppins.className} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-[#82ccdd]/30">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd]/30 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <CardTitle className="text-4xl md:text-3xl font-bold text-center text-[#0a3d62]">Messages Anonymes des Employés</CardTitle>
              <div className="flex gap-2">
                
                
                <Button
                  onClick={exportToPDF}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd]/30 transition-all duration-300 ease-in-out transform hover:scale-105"
                  disabled={selectedMessages.length === 0}
                >
                  <FileDown className="mr-2 h-4 w-4" /> Exporter en PDF
                </Button>
                <Button
                  onClick={() => setIsBulkEditDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70 text-[#0a3d62] border-[#82ccdd]/30 transition-all duration-300 ease-in-out transform hover:scale-105"
                  disabled={selectedMessages.length === 0}
                >
                  <Edit className="mr-2 h-4 w-4" /> Modifier en masse
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    placeholder="Rechercher un message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-[#82ccdd] focus:ring focus:ring-[#82ccdd]/20 focus:ring-opacity-50 transition-all duration-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px] rounded-full">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="NON_TRAITE">Non traité</SelectItem>
                    <SelectItem value="EN_COURS">En cours</SelectItem>
                    <SelectItem value="Traité">Traité</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[180px] rounded-full">
                    <SelectValue placeholder="Filtrer par priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="Haute">Haute</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Basse">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table className="rounded-xl border border-[#82ccdd]/30 text-base">
                <TableHeader>
                  <TableRow className="text-lg">
                    <TableHead className="w-4">
                      <Checkbox
                        checked={selectedMessages.length === filteredMessages.length}
                        onCheckedChange={toggleAllMessages}
                      />
                    </TableHead>
                    <TableHead>N°</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message, index) => (
                    <TableRow key={message.id} className="text-base">
                      <TableCell>
                        <Checkbox
                          checked={selectedMessages.includes(message.id)}
                          onCheckedChange={() => toggleMessageSelection(message.id)}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          onClick={() => openViewMessageDialog(message)}
                          className="p-0 h-auto font-normal text-left"
                        >
                          {message.subject}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(message.status)} text-white text-sm px-3 py-1`}>{message.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(message.priority)} text-white text-sm px-3 py-1`}>{message.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button onClick={() => openEditDialog(message)} variant="outline" size="sm" className="text-sm px-3 py-1">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleDeleteMessage(message.id)} variant="destructive" size="sm" className="text-sm px-3 py-1">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut du message</DialogTitle>
          </DialogHeader>
          <Select
            value={editingMessage?.status}
            onValueChange={(newStatus) => {
              handleStatusChange(editingMessage.id, newStatus)
              setIsEditDialogOpen(false)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir un nouveau statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Non traité">Non traité</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Traité">Traité</SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewMessageDialogOpen} onOpenChange={setIsViewMessageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{viewingMessage?.subject}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div id="date" className="col-span-3">
                {viewingMessage && new Date(viewingMessage.date).toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <div id="status" className="col-span-3">
                <Badge className={`${getStatusColor(viewingMessage?.status)} text-white text-sm px-3 py-1`}>
                  {viewingMessage?.status}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priorité
              </Label>
              <div id="priority" className="col-span-3">
                <Badge className={`${getPriorityColor(viewingMessage?.priority)} text-white text-sm px-3 py-1`}>
                  {viewingMessage?.priority}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Contenu
              </Label>
              <div id="content" className="col-span-3">
                {viewingMessage?.content}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isBulkEditDialogOpen} onOpenChange={setIsBulkEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut des messages sélectionnés</DialogTitle>
          </DialogHeader>
          <Select
            value={bulkEditStatus}
            onValueChange={setBulkEditStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir un nouveau statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Non traité">Non traité</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Traité">Traité</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleBulkStatusChange}>Appliquer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}