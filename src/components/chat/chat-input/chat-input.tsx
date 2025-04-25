"use client"

import { Box, InputField } from "@/components/ui"
import { LucideSendHorizontal } from "lucide-react"
import React from "react"

interface ChatInputProps {
   value: string
   onChange: (value: string) => void
}

export function ChatInput({ value, onChange }: Readonly<ChatInputProps>) {
   return (
      <Box className="flex w-full relative items-center bg-white">
         <InputField
            placeholder="Mensaje..."
            rounded="full"
            sizing="lg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
         />

         <LucideSendHorizontal className="absolute right-5" />
      </Box>
   )
}
