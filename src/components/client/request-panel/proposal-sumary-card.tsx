import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Typography } from "@/components/ui/typography"
import { IoLocationOutline } from "react-icons/io5"
import { Skill } from "@/data/types/models/models"
import { RequestSkills } from "./request-skills"

interface Props {
   username: string
   title: string
   city: string
   message: string
   skills: Skill[]
}

export function ProposalSumaryCard({ username, title, city, message, skills }: Readonly<Props>) {
   return (
      <Box className="flex flex-col pb-2 border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-100">
         <Box className="flex items-center gap-2">
            <Avatar size="5xl" />
            <Box className="flex flex-col">
               <Typography
                  variant="label"
                  className="font-bold">
                  {`@${username}`}
               </Typography>
               <Typography variant="parrafo">{title}</Typography>
               <Box className="flex gap-1 items-center">
                  <IoLocationOutline size={14} />
                  <Typography variant="label">{city}</Typography>
               </Box>
            </Box>
         </Box>
         <Typography variant="parrafo">{message}</Typography>
         <RequestSkills skills={skills} />
      </Box>
   )
}
