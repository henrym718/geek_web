"use client"
import { Box, Divider } from "@/components/ui"
import { ChatInputForm } from "@/feature/chat/components/ChatInputForm"
import { useSocket } from "@/feature/chat/hooks/useSocket"
import { useChatList } from "@/lib/hooks/chats/useChatList"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { ChatNotData } from "@/feature/chat/components/ChatNotData"
import { ChatList } from "@/feature/chat/components/ChatList"
import { ChatAvatar } from "@/feature/chat/components/ChatAvatar"
import { MessageList } from "@/feature/chat/components/MessageList"

export function ChatView() {
   const senderId = useSessionDataStore((state) => state.user?.user.id)
   const { chatsIds, chats, parsedChats, chatData, handleSelectChatData } = useChatList(senderId || "")
   const { messages, chatId, handleSendMessage, handleSelectChat } = useSocket(chatsIds, senderId || "")

   if (!senderId || !chats) {
      return <ChatNotData />
   }

   return (
      <Box className="flex h-full py-4 px-6 gap-6">
         {/* Sidebar */}
         <Box className="w-2/5 h-full">
            <ChatList
               chats={parsedChats}
               onSelectChat={handleSelectChat}
               onSelectChatData={handleSelectChatData}
               selectedChatId={chatId}
            />
         </Box>

         {/* Chat */}
         <Box className="w-3/5 h-full flex flex-col justify-between bg-white rounded-2xl">
            {chatId ? (
               <Box className="flex flex-col h-full">
                  <Box className="flex items-center py-4 px-6">
                     <ChatAvatar
                        fullName={chatData.fullName}
                        image={chatData.image}
                     />
                  </Box>
                  <Divider />
                  <Box className="flex-1 overflow-y-auto">
                     <MessageList
                        messages={messages}
                        senderId={senderId || ""}
                     />
                  </Box>
                  <ChatInputForm onSendMessage={handleSendMessage} />
               </Box>
            ) : (
               <ChatNotData text="Selecciona un chat" />
            )}
         </Box>
      </Box>
   )
}
