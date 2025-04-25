"use client"

import { MessageBubble } from "../message-bubble/message-bubble"

interface Props {
   messages: {
      id: string
      text: string
      isSender: boolean
   }[]
}

export function MessageList({ messages = [] }: Readonly<Props>) {
   return (
      <ul className="flex flex-col gap-4 overflow-y-auto px-6">
         {messages.map((message) => (
            <li key={message.id}>
               <MessageBubble
                  text={message.text}
                  isSender={message.isSender}
               />
            </li>
         ))}
      </ul>
   )
}
