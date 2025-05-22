"use client"

import { useEffect, useRef } from "react"
import { Message } from "@/data/types/models/models"
import { MessageItem } from "./MessageItem"

interface Props {
   messages: Message[]
   senderId: string
}

export function MessageList({ messages = [], senderId }: Readonly<Props>) {
   // Referencia al final de la lista
   const endRef = useRef<HTMLDivElement>(null)

   // Scroll al final de la lista
   useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages]) // se ejecuta cuando se actualizan los mensajes

   return (
      <ul className="flex flex-col gap-4 overflow-y-auto px-6 py-4 h-full">
         {messages.map((msg) => (
            <li key={msg.id}>
               <MessageItem
                  text={msg.message}
                  isSender={msg.senderId === senderId}
               />
            </li>
         ))}
         <div ref={endRef} /> {/* Ancla de scroll */}
      </ul>
   )
}
