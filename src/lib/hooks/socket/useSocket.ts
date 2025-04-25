"use client"

import { Message } from "@/data/types/models/models"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

export const useSocket = (userChats: string[], senderId: string) => {
   const [messages, setMessages] = useState<Message[]>([])
   const [chatId, setChatId] = useState("")
   const [isConnected, setIsConnected] = useState(false)
   const socketRef = useRef<Socket | null>(null)

   // 1. Conexión inicial
   useEffect(() => {
      // 1. Crear conexión
      if (!socketRef.current) {
         socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || "", {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
         })
      }
      // 2. Conexión al socket
      const socket = socketRef.current

      // 3. Unirse a todos los chats
      const joinAllChats = () => {
         userChats.forEach((chatId) => {
            socket.emit("joinRoom", chatId)
         })
      }

      // 4. Manejar la conexión
      const handleConnect = () => {
         console.log("🟢 Connected:", socket.id)
         setIsConnected(true)
         joinAllChats()
      }

      // 5. Manejar la desconexión
      const handleDisconnect = () => {
         console.log("🔴 Disconnected")
         setIsConnected(false)
      }

      // 6. Manejar el mensaje recibido
      const handleReceiveMessage = (message: Message[]) => {
         setMessages((prev) => [...prev, ...message])
      }

      // 7. Escuchar eventos
      socket.on("receiveMessage", handleReceiveMessage)
      socket.on("connect", handleConnect)
      socket.on("disconnect", handleDisconnect)

      // Cleanup
      return () => {
         socket.off("connect", handleConnect)
         socket.off("disconnect", handleDisconnect)
         socket.off("receiveMessage")
      }
   }, [userChats])

   // 2. Recuperar mensajes
   useEffect(() => {
      if (chatId) {
         setMessages([])
         socketRef.current?.emit("recoverMessages", chatId)
      }
   }, [chatId])

   // 3. Enviar mensaje
   function handleSendMessage(message: string) {
      socketRef.current?.emit("sendMessage", { chatId, senderId, message })
   }

   // 4. Seleccionar un chat
   function handleSelectChat(chatId: string) {
      setChatId(chatId)
   }

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
