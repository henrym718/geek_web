"use client"

import { ChatList } from "@/components/chat/chat-list/chat-list"
import { Box } from "@/components/ui"

interface ChatSidebarProps {
   onSelectChat: (chatId: string) => void
   selectedChatId: string
   chats: {
      chatId: string
      fullName: string
      image: string
   }[]
}

export function ChatSidebar({ onSelectChat, selectedChatId, chats }: Readonly<ChatSidebarProps>) {
   return (
      <Box className="flex flex-col gap-4 border-r border-gray-200 px-4 h-full w-full">
         <ChatList
            chats={chats}
            onSelectChat={onSelectChat}
            selectedChatId={selectedChatId}
         />
      </Box>
   )
}
