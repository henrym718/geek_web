import React from "react"
import { Box, Typography } from "../ui"

interface CardGroupProps {
   title: string
   Icon: React.ElementType
}

export function CardGroup({ title, Icon }: Readonly<CardGroupProps>) {
   return (
      <Box className="flex flex-col gap-4 px-4 w-[160px] h-[118px] border border-border rounded-xl">
         <Box className="flex justify-start items-start pt-2">
            <Icon
               size={24}
               strokeWidth={1.2}
            />
         </Box>
         <Typography variant="mensaje">{title}</Typography>
      </Box>
   )
}
