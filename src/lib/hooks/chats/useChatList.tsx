import { fecthChatsByAccessToken } from "@/data/api/services/chat.service"
import { useMemo, useState } from "react"
import useSWR from "swr"

export const useChatList = (senderId: string) => {
   // 1. Obtener chats
   const { data } = useSWR("chats", fecthChatsByAccessToken)

   // 2. Estado para almacenar los datos del chat seleccionado
   const [chatData, setChatData] = useState({ fullName: "", image: "" })

   // 3. Función para seleccionar el chat
   const handleSelectChatData = (fullName: string, image: string) => {
      setChatData({ fullName, image })
   }

   // 4. Memoizar chats
   const chats = useMemo(() => {
      return data?.success ? data.data : []
   }, [data])

   // 5. Memoizar ids de chats
   const chatsIds = useMemo(() => {
      return chats.map((chat) => chat.chats.id)
   }, [chats])

   // 6. Memoizar chats parseados
   const parsedChats = useMemo(() => {
      return chats.map((chat) => {
         const participant = senderId === chat.client.id ? chat.vendor : chat.client
         return {
            chatId: chat.chats.id,
            fullName: participant.fullName,
            image: participant.image,
         }
      })
   }, [chats, senderId])
   return {
      chatsIds,
      parsedChats,
      chats,
      handleSelectChatData,
      chatData,
   }
}
