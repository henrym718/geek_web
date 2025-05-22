import { useState } from "react"
import { Box, InputField } from "@/components/ui"
import { LucideSendHorizontal } from "lucide-react"

interface ChatInputFormProps {
   onSendMessage: (message: string) => void
}

export function ChatInputForm({ onSendMessage }: Readonly<ChatInputFormProps>) {
   const [message, setMessage] = useState("")

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message.trim()) return
      setMessage("")
      onSendMessage(message)
   }
   return (
      <form onSubmit={handleSubmit}>
         <Box className="flex w-full rounded-full relative items-center bg-white mt-2">
            <InputField
               rounded="full"
               sizing="lg"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            />

            <LucideSendHorizontal className="absolute right-5" />
         </Box>
      </form>
   )
}
