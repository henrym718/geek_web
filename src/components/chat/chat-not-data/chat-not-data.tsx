"use client"

import { IoChatbubbleEllipsesOutline } from "react-icons/io5"

export function ChatNotData() {
   return (
      <div className="flex flex-col items-center justify-center h-full">
         <IoChatbubbleEllipsesOutline className="text-gray-400 text-4xl" />
         <p className="text-gray-400 text-sm">No hay mensajes</p>
      </div>
   )
}
