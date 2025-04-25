import { ChatInput } from "@/components/chat/chat-input/chat-input"
import { useState } from "react"
import { Socket } from "socket.io-client"

interface ChatInputFormProps {
   socketRef: React.RefObject<Socket | null>
   chatId: string
   senderId: string
}

export function ChatInputForm({ socketRef, chatId, senderId }: Readonly<ChatInputFormProps>) {
   const [message, setMessage] = useState("")

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message.trim()) return
      setMessage("")
      socketRef.current?.emit("sendMessage", {
         chatId,
         senderId,
         message,
      })
   }
   return (
      <form onSubmit={handleSubmit}>
         <ChatInput
            value={message}
            onChange={setMessage}
         />
      </form>
   )
}
