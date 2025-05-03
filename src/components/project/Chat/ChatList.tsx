"use client"

import { ChatAvatar } from "./ChatAvatar"

interface Props {
   chats: {
      chatId: string
      fullName: string
      image: string
   }[]
   onSelectChat?: (id: string) => void
   onSelectChatData?: (fullName: string, image: string) => void
   selectedChatId?: string
}

export function ChatList({ chats = [], onSelectChat, selectedChatId, onSelectChatData }: Readonly<Props>) {
   const handleSelectChat = (chatId: string, fullName: string, image: string) => {
      onSelectChat?.(chatId)
      onSelectChatData?.(fullName, image)
   }

   return (
      <ul className="flex h-full flex-col gap-4 overflow-y-auto bg-white p-4 rounded-xl">
         {chats.map((chat) => (
            <li
               data-selected={selectedChatId === chat.chatId}
               key={chat.chatId}
               className="border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-xl data-[selected=true]:bg-gray-100"
               onClick={() => handleSelectChat(chat.chatId, chat.fullName, chat.image)}>
               <ChatAvatar
                  size="2xl"
                  fullName={chat.fullName}
                  image={chat.image}
               />
            </li>
         ))}
      </ul>
   )
}
