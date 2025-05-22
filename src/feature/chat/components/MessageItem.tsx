"use client"
import React from "react"
import { Box, Typography } from "@/components/ui"
import { cn } from "@/lib/utils/cn"

interface MessageProps {
   text: string
   isSender: boolean
}

export function MessageItem({ text, isSender }: Readonly<MessageProps>) {
   return (
      <Box className={cn("flex", isSender ? "justify-end" : "justify-start")}>
         <Typography className={cn("rounded-xl py-2 px-3 max-w-[50%] !text-white inline-block", isSender ? "bg-primary/80" : "bg-secondary")}>
            {text}
         </Typography>
      </Box>
   )
}
