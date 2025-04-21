"use client"

import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Divider } from "@/components/ui/divider"
import { Typography } from "@/components/ui/typography"
import React, { useActionState, useEffect } from "react"
import { RequestSkills } from "./request-skills"
import { timeAgo } from "@/lib/utils/timeAgo"
import { Skill } from "@/data/types/models/models"
import { IoIosArrowRoundBack, IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io"
import { Button } from "@/components/ui"
import { updateStatusByClientAction } from "@/app/client/account/request-panel/actions"
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
      <Box className="flex flex-col p-10 gap-4 cursor-default w-[700px] min-h-[100vh] overflow-y-auto">
         <IoIosArrowRoundBack
            className="cursor-pointer hover:rounded-full hover:bg-gray-100 p-2"
            size={40}
            onClick={closeModal}
         />
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
         <Box className="flex gap-10  pt-10 justify-center">
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
               <Button
                  variant="secundary"
                  size="lg"
                  name="status"
                  value={STATUS_RESPONSE.ACCEPTED}
                  isLoading={pending}>
                  Aceptar Propuesta
                  <IoIosCheckmarkCircleOutline size={24} />
               </Button>
               <Button
                  variant="secundary"
                  size="lg"
                  name="status"
                  value={STATUS_RESPONSE.REJECTED}
                  isLoading={pending}>
                  Rechazar Propuesta
                  <IoIosCloseCircleOutline size={24} />
               </Button>
            </form>
         </Box>
      </Box>
   )
}
