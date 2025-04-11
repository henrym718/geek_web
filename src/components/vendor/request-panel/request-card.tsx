"use client"

import { useState } from "react"
import { Box, Typography, Badge, SideModal } from "@/components/ui"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"
import { timeAgo } from "@/lib/utils/timeAgo"
import { RequestResponseForm } from "./request-response-form"
import { MdFavoriteBorder } from "react-icons/md"
import { MdOutlineFavorite } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"

interface Props {
   request: GetRequestByProfileIdResponse[]
}

export function ProformaRequestCard({ request }: Props) {
   const [isFavorite, setIsFavorite] = useState(false)

   return (
      <Box className="flex flex-col relative border-b border-t border-black/10 gap-4 px-4 py-4 hover:bg-black/5 hover:cursor-pointer hover:border-black/5 transition-all duration-300">
         {request.map((request) => (
            <SideModal
               key={request.id}
               trigger={
                  <Box>
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
                  </Box>
               }>
               {(close) => (
                  <RequestResponseForm
                     request={request}
                     closeModal={close}
                  />
               )}
            </SideModal>
         ))}
         <Box
            className="absolute right-10 top-6 cursor-pointer"
            onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? <MdOutlineFavorite size={22} /> : <MdFavoriteBorder size={22} />}
         </Box>
      </Box>
   )
}
