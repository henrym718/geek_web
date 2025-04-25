"use client"

import { ChatAvatar } from "../chat-avatar/chat-avatar"

interface Props {
   chats: {
      chatId: string
      fullName: string
      image: string
   }[]
   onSelectChat?: (id: string) => void
   selectedChatId?: string
}

export function ChatList({ chats = [], onSelectChat, selectedChatId }: Readonly<Props>) {
   return (
      <ul className="flex h-full flex-col gap-4 overflow-y-auto bg-white">
         {chats.map((chat) => (
            <li
               data-selected={selectedChatId === chat.chatId}
               key={chat.chatId}
               className="border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-xl data-[selected=true]:bg-gray-100"
               onClick={() => onSelectChat?.(chat.chatId)}>
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
