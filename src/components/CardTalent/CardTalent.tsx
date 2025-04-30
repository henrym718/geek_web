import React from "react"
import { Avatar, Box, Typography } from "../ui"
import { MapPinCheckInside } from "lucide-react"

interface Props {
   firstName: string
   lastName: string
   photo: string
   city: string
   title: string
}

export function CardTalent({ firstName, lastName, photo, city, title }: Readonly<Props>) {
   return (
      <Box className="flex flex-col w-[302px] h-[366px] gap-1">
         <div className="w-[302px] h-[182px] bg-gray-200 rounded-lg" />
         <Box className="flex items-center gap-1 pt-2">
            <Avatar
               name={firstName.toUpperCase() || photo}
               size="sm"
            />
            <Typography
               variant="etiqueta"
               className="font-bold">
               {firstName} {lastName}
            </Typography>
         </Box>
         <Typography variant="label">{title}</Typography>
         <Box className="flex gap-2 pt-4">
            <MapPinCheckInside size={16} />
            <Typography variant="etiqueta">{city}</Typography>
         </Box>
      </Box>
   )
}
