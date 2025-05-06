"use client"

import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Divider } from "@/components/ui/divider"
import { Typography } from "@/components/ui/typography"
import React, { useState } from "react"
import { RequestSkills } from "../../../../components/project/client/request-panel/request-skills"
import { timeAgo } from "@/lib/utils/timeAgo"
import { Skill } from "@/data/types/models/models"
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io"
import { Button, SideModal, SideModalContent, SideModalTrigger } from "@/components/ui"
import { STATUS_RESPONSE, StatusResponseType } from "@/config/constants"
import { mutate } from "swr"
import { updateStatusByClient } from "@/data/api/services/proforma-response.service"
import { sleep } from "@/lib/utils/sleep"
import { toast, Toaster } from "sonner"
interface Props {
   username: string
   title: string
   city: string
   message: string
   skills: Skill[]
   createdAt: string
   requestid: string
   responseid: string
   children: React.ReactElement<{ onClick: () => void }>
}

export function ProposalResponseModal({ username, title, city, message, skills, createdAt, requestid, responseid, children }: Readonly<Props>) {
   const [pending, setPending] = useState(false)

   const handleAcceptProposal = async (closeModal: () => void, status: StatusResponseType) => {
      setPending(true)

      try {
         await sleep(1000)
         const response = await updateStatusByClient({
            proformaRequestId: requestid,
            proformaResponseId: responseid,
            newStatus: status,
         })

         if (response.success) {
            closeModal()
            mutate(["response", requestid])
         } else {
            toast(response.message)
         }
      } finally {
         setPending(false)
      }
   }

   return (
      <SideModal>
         <SideModalTrigger>
            <div>{children}</div>
         </SideModalTrigger>
         <SideModalContent>
            {(closeModal) => (
               <Box className="flex flex-col px-4 gap-4 cursor-default overflow-y-auto">
                  <Box className="flex items-center gap-2">
                     <Avatar size="7xl" />
                     <Box className="flex flex-col">
                        <Typography
                           variant="label"
                           className="font-bold">
                           {`@${username}`}
                        </Typography>
                        <Typography variant="parrafo">{title}</Typography>
                     </Box>
                  </Box>
                  <Divider />
                  <Box className="flex flex-col gap-2">
                     <Typography variant="subtitulo2">Un poco sobre mi</Typography>
                     <Typography
                        variant="parrafo"
                        className="pt-4">
                        {message}
                     </Typography>
                  </Box>
                  <Divider />
                  <Typography variant="subtitulo2">Hablidades y experiencia</Typography>
                  <RequestSkills skills={skills} />
                  <Divider />
                  <Box className="flex gap-32">
                     <Box className="flex flex-col gap-1 items-center">
                        <Typography variant="parrafo">Ubicación</Typography>
                        <Typography
                           variant="parrafo"
                           className="font-bold">
                           {city}
                        </Typography>
                     </Box>
                     <Box className="flex flex-col gap-1 items-center">
                        <Typography variant="parrafo">Miembro desde</Typography>
                        <Typography
                           variant="parrafo"
                           className="font-bold">
                           {timeAgo(new Date(createdAt))}
                        </Typography>
                     </Box>
                  </Box>
                  <Divider />
                  <Box className="flex gap-8 justify-center mt-6">
                     <Button
                        className="flex-1"
                        variant="outline"
                        size="lg"
                        onClick={() => handleAcceptProposal(closeModal, STATUS_RESPONSE.ACCEPTED)}
                        isLoading={pending}>
                        Aceptar Propuesta
                        <IoIosCheckmarkCircleOutline size={24} />
                     </Button>
                     <Button
                        className="flex-1"
                        variant="outline"
                        size="lg"
                        onClick={() => handleAcceptProposal(closeModal, STATUS_RESPONSE.REJECTED)}
                        isLoading={pending}>
                        Rechazar Propuesta
                        <IoIosCloseCircleOutline size={24} />
                     </Button>
                  </Box>
               </Box>
            )}
         </SideModalContent>
         <Toaster />
      </SideModal>
   )
}
