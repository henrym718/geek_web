"use client"
import { Box, Button, Typography } from "@/app/components/ui"
import { Badge } from "@/app/components/ui/badge"
import { Divider } from "@/app/components/ui/Divider"
import { TextArea } from "@/app/components/ui/TextArea"
import { GetRequestByProfileIdResponse } from "@/app/data/dtos/get-request-by-vendor-profile-id"
import { timeAgo } from "@/app/lib/utils/timeAgo"
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoLocationOutline, IoPricetagOutline, IoTimeOutline } from "react-icons/io5"
import { TfiAnnouncement } from "react-icons/tfi"

interface Props {
   request: GetRequestByProfileIdResponse
}

export default function ResponseForm({ request }: Props) {
   return (
      <Box className="flex flex-col p-10 gap-4 cursor-default w-[700px] min-h-[100vh] overflow-y-auto">
         <IoIosArrowRoundBack size={30} />
         <Typography
            className="pb-2"
            variant="subtitulo1">
            {request.title}
         </Typography>
         <Box className="flex items-center gap-4">
            <Typography variant="etiqueta">{`Publicado: ${timeAgo(request.createdAt ?? new Date())}`}</Typography>
            <Box className="flex gap-1 items-center">
               <IoLocationOutline size={20} />
               <Typography variant="label">{request.scope}</Typography>
            </Box>
         </Box>
         <Box className="flex gap-4">
            <TfiAnnouncement
               size={24}
               className="flex items-start"
            />
            <Typography variant="nota">
               Los perfiles especializados pueden ayudarte a destacar mejor tu experiencia al presentar propuestas para puestos como estos, esfuerzate
               en crear el mejor perfil para que te contraten.
            </Typography>
         </Box>
         <Divider />
         <Typography
            className="pb-4"
            variant="mensaje">
            {request.description}
         </Typography>
         <Divider />
         <Box className="flex gap-36">
            <Box className="flex gap-1">
               <IoPricetagOutline size={22} />
               <Box className="flex flex-col items-center">
                  <Typography variant="etiqueta">{`$${request.budget.toFixed(2)}`}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Presupuesto
                  </Typography>
               </Box>
            </Box>
            <Box className="flex gap-1">
               <IoTimeOutline size={22} />
               <Box className="flex flex-col items-center">
                  <Typography variant="etiqueta">10 a 20 días</Typography>
                  <Typography
                     variant="etiqueta"
                     className="text-center font-light">
                     Duración <br /> del proyecto
                  </Typography>
               </Box>
            </Box>
         </Box>
         <Divider />
         <Typography variant="subtitulo2">Hablidades y experiencia</Typography>
         <Box className="flex gap-2 pb-4">
            {request.skills.map((skill) => (
               <Badge key={skill.id}>{skill.name}</Badge>
            ))}
         </Box>
         <Divider />
         <Typography variant="subtitulo2">Aplica a esta propuesta</Typography>
         <TextArea rows={5} />
         <Button
            variant="primary"
            size="lg">
            Enviar propuesta
         </Button>
      </Box>
   )
}
