/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Message } from "@/data/types/models/models"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

interface UseSocketIoProps {
   chatId: string[]
}

export default function UseSocketIo({ chatId }: Readonly<UseSocketIoProps>) {
   const [messages, setMessages] = useState<Message[]>([])

   useEffect(() => {
      //Establesco la conexion con el socketio
      const socket = io("http://localhost:4000")

      // Uusario se une a todas las salas activas
      chatId.forEach((id) => {
         socket.emit("joinChat", id)
      })

      // Se empieza a escuchar los mensajes nuevos
      const handleNewMessage = (message: Message) => {
         setMessages((prev) => [...prev, message])
      }

      socket.on("newMessage", handleNewMessage)

      // Limpiar al desmontar
      return () => {
         socket.disconnect()
         socket.off("newMessage", handleNewMessage)
      }
   }, [])

   return { messages }
}
