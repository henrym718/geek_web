"use client"
import { Avatar, Box, Typography } from "@/components/ui"
import React from "react"

interface AvatarChatProps {
   fullName: string
   image?: string
   size?: "xl" | "2xl"
}

export function ChatAvatar({ fullName, image, size = "xl" }: Readonly<AvatarChatProps>) {
   return (
      <Box className="flex items-center gap-2">
         {image ? (
            <Avatar
               size={size}
               src={image}
            />
         ) : (
            <Avatar size={size} />
         )}
         <Typography
            variant="mensaje"
            className="font-bold">
            {fullName}
         </Typography>
      </Box>
   )
}
