"use client"
import { Box, Divider } from "@/components/ui"
import { ChatInputForm } from "@/components/Chat/ChatInputForm"
import { useSocket } from "@/lib/hooks/socket/useSocket"
import { useChatList } from "@/lib/hooks/chats/useChatList"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { ChatNotData } from "@/components/Chat/ChatNotData"
import { ChatList } from "@/components/Chat/ChatList"
import { ChatAvatar } from "@/components/chat/ChatAvatar"
import { MessageList } from "@/components/Chat/MessageList"

export function ChatView() {
   const senderId = useSessionDataStore((state) => state.user?.user.id)
   const { chatsIds, chats, parsedChats, chatData, handleSelectChatData } = useChatList(senderId || "")
   const { messages, chatId, handleSendMessage, handleSelectChat } = useSocket(chatsIds, senderId || "")

   if (!chats) {
      return <ChatNotData />
   }

   return (
      <Box className="flex h-[calc(100vh-10rem)] py-4 mt-6 bg-zinc-100 rounded-2xl px-6 gap-6">
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
               <Box className="flex flex-col overflow-y-auto">
                  <Box className="flex items-center py-4 px-6">
                     <ChatAvatar
                        fullName={chatData.fullName}
                        image={chatData.image}
                     />
                  </Box>
                  <Divider />
                  <MessageList
                     messages={messages}
                     senderId={senderId || ""}
                  />
                  <ChatInputForm onSendMessage={handleSendMessage} />
               </Box>
            ) : (
               <ChatNotData text="Selecciona un chat" />
            )}
         </Box>
      </Box>
   )
}
