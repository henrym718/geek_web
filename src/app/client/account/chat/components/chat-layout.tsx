"use client"
import { Box } from "@/components/ui"
import { ChatSidebar } from "./chat-sidebar"
import { useState, useEffect, useMemo, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { ChatMessages } from "./chat-messages"
import { ChatInputForm } from "./chat-input-form"
import useSWR from "swr"
import { fecthChatsByAccessToken } from "@/data/api/services/chat.service"
import { useSessionDataStore } from "@/stores/user-session-data.store"

export default function ChatLayout() {
   const socketRef = useRef<Socket | null>(null)
   const [selectedChatId, setSelectedChatId] = useState("")
   const { data: chats } = useSWR("chats", fecthChatsByAccessToken)
   const [messages, setMessages] = useState<
      {
         message: string
         senderId: string
         chatId: string
      }[]
   >([])
   const currentUser = useSessionDataStore((state) => state.user)

   const parsedChats = useMemo(
      () =>
         chats?.success &&
         chats.data.map((chat) => {
            const participant = currentUser?.user.id === chat.client.id ? chat.vendor : chat.client
            return {
               chatId: chat.chats.id,
               fullName: participant.fullName,
               image: participant.image,
            }
         }),
      [chats, currentUser?.user.id]
   )

   const handleSelectChat = (chatId: string) => {
      setSelectedChatId(chatId)
   }

   useEffect(() => {
      if (!socketRef.current) {
         socketRef.current = io("http://localhost:4000")
      }

      const socket = socketRef.current

      if (chats?.success && chats.data.length > 0) {
         chats.data.forEach((chat) => {
            console.log(chat.chats.id, "entro al chat")
            socket.emit("joinRoom", chat.chats.id)
         })

         socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, ...message])
         })
      }
   }, [chats])

   useEffect(() => {
      if (selectedChatId) {
         socketRef.current?.emit("recoverMessages", selectedChatId)
         setMessages([])
      }
   }, [selectedChatId])

   return (
      <Box className="flex h-[calc(100vh-10rem)] py-4 mt-6 bg-zinc-100 rounded-2xl">
         <Box className="w-2/5 h-full">
            <ChatSidebar
               onSelectChat={handleSelectChat}
               selectedChatId={selectedChatId}
               chats={parsedChats || []}
            />
         </Box>
         <Box className="w-3/5 h-full flex flex-col justify-between">
            {selectedChatId && (
               <>
                  <ChatMessages
                     chatAvatar={{ fullName: "", image: "" }}
                     messages={messages}
                     currentUserId={currentUser?.user.id || ""}
                  />
                  <ChatInputForm
                     socketRef={socketRef}
                     chatId={selectedChatId}
                     senderId={currentUser?.user.id || ""}
                  />
               </>
            )}
         </Box>
      </Box>
   )
}
