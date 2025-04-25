import { ChatAvatar } from "@/components/chat/chat-avatar/chat-avatar"
import { MessageList } from "@/components/chat/message-list/message-list"
import { Box } from "@/components/ui"

interface ChatMessagesProps {
   chatAvatar: {
      fullName: string
      image: string
   }
   messages: {
      message: string
      senderId: string
      chatId: string
   }[]
   currentUserId: string
}

export function ChatMessages({ chatAvatar, messages, currentUserId }: Readonly<ChatMessagesProps>) {
   const parsedMessages = messages.map((message) => ({
      id: message.chatId,
      text: message.message,
      isSender: message.senderId === currentUserId,
   }))

   return (
      <Box className="flex flex-col flex-grow gap-4 rounded-xl overflow-hidden bg-white">
         <Box className="border-b border-gray-200 py-2 px-4">
            <ChatAvatar
               fullName={chatAvatar?.fullName}
               image={chatAvatar?.image}
            />
         </Box>
         <MessageList messages={parsedMessages} />
      </Box>
   )
}
