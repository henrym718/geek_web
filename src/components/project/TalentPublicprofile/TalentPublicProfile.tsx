"use client"

import { Avatar, Box, Divider, Typography } from "../../ui"
import { RequestSkills } from "../client/request-panel/request-skills"
import { Skill } from "@/data/types/models/models"
import { ContactTalent } from "../ContactTalent/ContactTalent"

interface Props {
   firstName: string
   username: string
   lastName: string
   phone: string
   city: string
   title: string
   aboutme: string
   categoryName: string
   skills: Skill[]
   createdAt: string
}

export function TalentPublicProfile(props: Readonly<Props>) {
   const { firstName, lastName, username, phone, city, title, aboutme, categoryName, skills, createdAt } = props

   return (
      <Box className="flex flex-col w-3/5 mt-5">
         <Box className="flex gap-4 items-center">
            <Avatar
               size="9xl"
               name={firstName}
            />
            <Box className="flex flex-col gap-1">
               <Typography variant="subtitulo1">
                  {firstName} {lastName}
               </Typography>
               <Typography variant="parrafo">{title}</Typography>
               <Typography
                  variant="parrafo"
                  className="font-bold">
                  {`@${username}`}
               </Typography>
            </Box>
         </Box>

         <Box className="mt-10 w-full">
            <ContactTalent phone={phone} />
         </Box>

         <Box className="mt-10 w-full border border-black/10 p-4">
            <Box className="flex flex-col gap-4">
               <Box className="flex">
                  <Box className="flex flex-col w-1/3">
                     <Typography variant="label">Ubicación</Typography>
                     <Typography
                        variant="parrafo"
                        className="font-bold">
                        {city}
                     </Typography>
                  </Box>
                  <Box className="flex flex-col w-1/3">
                     <Typography variant="label">Miembro desde</Typography>
                     <Typography
                        variant="parrafo"
                        className="font-bold">
                        {createdAt}
                     </Typography>
                  </Box>
               </Box>
               <Box className="flex pt-3">
                  <Box className="flex flex-col w-1/3">
                     <Typography variant="label">Username</Typography>
                     <Typography
                        variant="parrafo"
                        className="font-bold">
                        {username}
                     </Typography>
                  </Box>
                  <Box className="flex flex-col w-1/3">
                     <Typography variant="label">Categoria</Typography>
                     <Typography
                        variant="parrafo"
                        className="font-bold">
                        {categoryName}
                     </Typography>
                  </Box>
               </Box>
            </Box>
            <Divider />
            <Typography
               variant="parrafo"
               className="pt-3">
               {aboutme}
            </Typography>
         </Box>

         {/* Skills */}
         <Box className="flex flex-col mt-10">
            <Typography
               variant="parrafo"
               className="font-bold">
               Skills
            </Typography>
            <RequestSkills skills={skills} />
         </Box>
      </Box>
   )
}
