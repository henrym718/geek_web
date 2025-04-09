"use client"

import { GetRequestByProfileIdResponse } from "@/app/data/dtos/get-request-by-vendor-profile-id"
import { Box, Typography } from "@/app/components/ui"
import { timeAgo } from "@/app/lib/utils/timeAgo"
import { Badge } from "@/app/components/ui/badge"
import { IoLocationOutline } from "react-icons/io5"
import { MdFavoriteBorder } from "react-icons/md"
import { MdOutlineFavorite } from "react-icons/md"
import { useState } from "react"

interface Props {
   request: GetRequestByProfileIdResponse[]
}

export default function ProformaRequestCard({ request }: Props) {
   const [isFavorite, setIsFavorite] = useState(false)

   console.log(request)
   return (
      <Box className="flex flex-col relative border-b border-t border-black/10 gap-4 px-4 py-4 hover:bg-black/5 hover:cursor-pointer hover:border-black/5 transition-all duration-300">
         {request.map((request) => (
            <Box key={request.id}>
               <Typography variant="etiqueta">{timeAgo(request.createdAt ?? new Date())}</Typography>
               <Typography
                  className="pb-2"
                  variant="subtitulo1">
                  {request.title}
               </Typography>
               <Typography
                  className="mb-8"
                  variant="etiqueta">{`Presupuesto: $${request.budget}`}</Typography>
               <Typography
                  className="pb-4"
                  variant="parrafo">
                  {request.description}
               </Typography>
               <Box className="flex gap-2 pb-4">
                  {request.skills.map((skill) => (
                     <Badge key={skill.id}>{skill.name}</Badge>
                  ))}
               </Box>
               <Box className="flex gap-6 items-center">
                  <Box className="flex gap-1 items-center">
                     <IoLocationOutline />
                     <Typography variant="label">{request.scope}</Typography>
                  </Box>
                  <Typography variant="label">Propuestas: 10 a 20</Typography>
               </Box>

               <Box
                  className="absolute right-10 top-6 cursor-pointer"
                  onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? <MdOutlineFavorite size={22} /> : <MdFavoriteBorder size={22} />}
               </Box>
            </Box>
         ))}
      </Box>
   )
}
