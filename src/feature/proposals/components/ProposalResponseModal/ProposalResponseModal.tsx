"use client"

import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Divider } from "@/components/ui/divider"
import { Typography } from "@/components/ui/typography"
import React, { useState } from "react"
import { ProjectCardSkills } from "@/feature/projects/components/ProjectCard/ProjectCardSkills"
import { timeAgo } from "@/lib/utils/timeAgo"
import { Skill } from "@/data/types/models/models"
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io"
import { Button, SideModal, SideModalContent, SideModalTrigger } from "@/components/ui"
import { STATUS_RESPONSE, StatusResponseType } from "@/config/constants"
import { mutate } from "swr"
import { updateStatusByClient } from "@/data/api/services/proforma-response.service"
import { sleep } from "@/lib/utils/sleep"
import { toast, Toaster } from "sonner"
import { createChat } from "@/data/api/services/chat.service"
import { useRouter } from "next/navigation"

interface Props {
   username: string
   firstName: string
   lastName: string
   title: string
   city: string
   aboutme: string
   message: string
   skills: Skill[]
   createdAt: string
   requestid: string
   responseid: string
   clientId: string
   vendorId: string
   children: React.ReactElement<{ onClick: () => void }>
}

export function ProposalResponseModal({
   username,
   vendorId,
   clientId,
   firstName,
   lastName,
   title,
   city,
   aboutme,
   message,
   skills,
   createdAt,
   requestid,
   responseid,
   children,
}: Readonly<Props>) {
   const [pending, setPending] = useState(false)
   const router = useRouter()
   const handleAcceptProposal = async (closeModal: () => void, status: StatusResponseType) => {
      try {
         setPending(true)
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

         if (status === STATUS_RESPONSE.ACCEPTED) {
            const chat = await createChat({
               clientId: clientId,
               vendorId: vendorId,
            })

            if (chat.success) {
               toast.success("Chat creado correctamente")
               router.push("/client/account/chat")
            } else {
               toast.error(chat.message)
            }
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
               <Box className="flex flex-col w-[650px] p-10 space-y-6 overflow-y-auto">
                  <header className="flex items-center gap-4">
                     <Avatar
                        size="7xl"
                        name={firstName}
                     />
                     <div className="space-y-1">
                        <Typography variant="subtitulo1">{`${firstName} ${lastName}`}</Typography>
                        <Typography variant="parrafo">{title}</Typography>
                        <Typography
                           variant="label"
                           className="font-bold">{`@${username}`}</Typography>
                     </div>
                  </header>

                  <section className="border border-gray-200 p-6 space-y-6 ">
                     <Typography variant="parrafo">{aboutme}</Typography>

                     <Divider />
                     <div className="grid grid-cols-3 gap-8 pt-5">
                        <div>
                           <Typography variant="parrafo">Ubicación</Typography>
                           <Typography
                              variant="parrafo"
                              className="font-bold">
                              {city}
                           </Typography>
                        </div>
                        <div>
                           <Typography variant="parrafo">Miembro desde</Typography>
                           <Typography
                              variant="parrafo"
                              className="font-bold">
                              {timeAgo(new Date(createdAt))}
                           </Typography>
                        </div>
                     </div>
                  </section>

                  <section className="space-y-2 mx-5">
                     <Typography variant="subtitulo2">Hablidades y experiencia</Typography>
                     <ProjectCardSkills skills={skills} />
                  </section>

                  <section className="space-y-2 border border-gray-200 p-6">
                     <Typography variant="subtitulo2">Mensaje de la propuesta</Typography>
                     <Typography variant="parrafo">{message}</Typography>
                  </section>

                  <footer className="flex gap-4 justify-center pt-4">
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
                  </footer>
               </Box>
            )}
         </SideModalContent>
         <Toaster />
      </SideModal>
   )
}
