/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Avatar, Box, Typography } from "../../ui"
import { MapPinCheckInside } from "lucide-react"
import { formatURLParam } from "@/lib/utils/formatURLParams"
interface Props {
   id: string
   firstName: string
   lastName: string
   bannerImage: string
   photo: string
   city: string
   title: string
}

export function CardTalent({ id, firstName, lastName, bannerImage, photo, city, title }: Readonly<Props>) {
   const [hoveringImageOrTitle, setHoveringImageOrTitle] = useState(false)

   function handleOpenProfile(title: string) {
      window.open(`/talents/profile?category=${formatURLParam(title)}&id=${id}`, "_blank")
   }

   return (
      <Box className="flex flex-col w-[302px] h-[366px] gap-1 relative">
         <Box
            className="w-[302px] h-[182px] bg-gray-200 rounded-lg"
            onMouseEnter={() => setHoveringImageOrTitle(true)}
            onMouseLeave={() => setHoveringImageOrTitle(false)}
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenProfile(title)}>
            <img
               src={bannerImage}
               alt={title}
               className="w-full h-full object-cover rounded-lg"
            />
         </Box>

         <Box className="flex items-center gap-2 pt-2">
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

         <Typography
            variant="label"
            className={`transition duration-200 ${hoveringImageOrTitle ? "underline cursor-pointer" : ""}`}
            onMouseEnter={() => setHoveringImageOrTitle(true)}
            onMouseLeave={() => setHoveringImageOrTitle(false)}
            onClick={() => handleOpenProfile(title)}>
            {title}
         </Typography>

         <Box className="flex gap-2 pt-4">
            <MapPinCheckInside size={16} />
            <Typography variant="etiqueta">{city}</Typography>
         </Box>
      </Box>
   )
}
