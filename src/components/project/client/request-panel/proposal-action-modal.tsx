"use client"

import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Divider } from "@/components/ui/divider"
import { Typography } from "@/components/ui/typography"
import React, { useActionState, useEffect } from "react"
import { RequestSkills } from "./request-skills"
import { timeAgo } from "@/lib/utils/timeAgo"
import { Skill } from "@/data/types/models/models"
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io"
import { Button } from "@/components/ui"
import { updateStatusByClientAction } from "@/app/client/account/request/actions"
import { STATUS_RESPONSE } from "@/config/constants"
import { mutate } from "swr"

interface Props {
   username: string
   title: string
   city: string
   message: string
   skills: Skill[]
   createdAt: string
   closeModal: () => void
   requestid: string
   responseid: string
}

const initialState = {
   success: false,
   error: null,
}

export function ProposalActionModal({ username, title, city, message, skills, createdAt, closeModal, requestid, responseid }: Readonly<Props>) {
   const [state, action, pending] = useActionState(updateStatusByClientAction, initialState)

   useEffect(() => {
      if (state.success) {
         closeModal()
         mutate(["response", requestid])
      }
   }, [state.success, closeModal, requestid])

   return (
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
         <form action={action}>
            <input
               type="hidden"
               name="requestid"
               value={requestid}
            />
            <input
               type="hidden"
               name="responseid"
               value={responseid}
            />
            <Box className="flex gap-8 justify-center mt-6">
               <Button
                  className="flex-1"
                  variant="outline"
                  size="lg"
                  name="status"
                  value={STATUS_RESPONSE.ACCEPTED}
                  isLoading={pending}>
                  Aceptar Propuesta
                  <IoIosCheckmarkCircleOutline size={24} />
               </Button>
               <Button
                  className="flex-1"
                  variant="outline"
                  size="lg"
                  name="status"
                  value={STATUS_RESPONSE.REJECTED}
                  isLoading={pending}>
                  Rechazar Propuesta
                  <IoIosCloseCircleOutline size={24} />
               </Button>
            </Box>
         </form>
      </Box>
   )
}
