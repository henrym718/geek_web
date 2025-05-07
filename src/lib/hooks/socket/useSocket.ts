"use client"

import { Message } from "@/data/types/models/models"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

/**
 * Hook para manejar la conexión y comunicación con websockets
 * @param userChats - Array de IDs de chats del usuario
 * @param senderId - ID del usuario que envía mensajes
 */
export const useSocket = (userChats: string[], senderId: string) => {
   // 1. Estados principales
   const [messages, setMessages] = useState<Message[]>([]) // Mensajes del chat actual
   const [chatId, setChatId] = useState("") // ID del chat seleccionado
   const [isConnected, setIsConnected] = useState(false) // Estado de conexión
   const socketRef = useRef<Socket | null>(null) // Referencia al socket

   // 2. Efecto para manejar la conexión inicial y eventos del socket
   useEffect(() => {
      // 2.1 Crear conexión si no existe
      if (!socketRef.current) {
         socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || "", {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
         })
      }
      const socket = socketRef.current

      // 2.2 Función para unirse a las salas de chat
      const joinAllChats = () => {
         userChats.forEach((chatId) => {
            socket.emit("joinRoom", chatId)
         })
      }

      // 2.3 Manejador de conexión exitosa
      const handleConnect = () => {
         console.log("🟢 Connected:", socket.id)
         setIsConnected(true)
         joinAllChats() // Unirse a las salas al conectar
      }

      // 2.4 Manejador de desconexión
      const handleDisconnect = () => {
         console.log("🔴 Disconnected")
         setIsConnected(false)
      }

      // 2.5 Manejador de mensajes recibidos
      const handleReceiveMessage = (message: Message[]) => {
         if (message && message.length > 0) {
            const msgChatId = message[0].chatId
            // Actualizar mensajes visibles si corresponde al chat actual
            if (msgChatId === chatId) {
               setMessages((prev) => [...prev, ...message])
            }
         }
      }

      // 2.6 Suscripción a eventos
      socket.on("receiveMessage", handleReceiveMessage)
      socket.on("connect", handleConnect)
      socket.on("disconnect", handleDisconnect)

      // 2.7 Limpieza de suscripciones
      return () => {
         socket.off("connect", handleConnect)
         socket.off("disconnect", handleDisconnect)
         socket.off("receiveMessage")
      }
   }, [userChats, chatId])

   // 3. Efecto para cargar mensajes al cambiar de chat - versión simplificada
   useEffect(() => {
      if (chatId && isConnected) {
         // Siempre limpiar los mensajes actuales y solicitar todos al servidor
         setMessages([])

         // Solicitar mensajes al servidor sin verificar caché
         socketRef.current?.emit("recoverMessages", chatId)
      }
   }, [chatId, isConnected])

   // 4. Efecto para reconexión a salas si se agrega un nuevo chat a la lista de salas
   useEffect(() => {
      if (isConnected && userChats.length > 0) {
         userChats.forEach((chatId) => {
            socketRef.current?.emit("joinRoom", chatId)
         })
      }
   }, [isConnected, userChats])

   // 5. Funciones de utilidad
   // 5.1 Enviar mensaje
   function handleSendMessage(message: string) {
      socketRef.current?.emit("sendMessage", { chatId, senderId, message })
   }

   // 5.2 Seleccionar chat
   function handleSelectChat(chatId: string) {
      setChatId(chatId)
   }

   // 6. Retornar valores y funciones necesarias
   return {
      senderId,
      messages,
      socketRef,
      chatId,
      handleSelectChat,
      handleSendMessage,
      isConnected,
   }
}
