"use client"

import { IoChatbubbleEllipsesOutline } from "react-icons/io5"

interface Props {
   text?: string
}

export function ChatNotData({ text = "No hay mensajes" }: Readonly<Props>) {
   return (
      <div className="flex flex-col items-center justify-center h-full rounded-xl">
         <IoChatbubbleEllipsesOutline className="text-gray-400 text-4xl" />
         <p className="text-gray-400 text-sm">{text}</p>
      </div>
   )
}
