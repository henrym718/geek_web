import { Box, Typography } from "@/components/ui"
import { projectWorkloadMap, projectLengthMap, projectTypeMap } from "@/config/constants"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineCalendarToday, MdOutlineSchedule } from "react-icons/md"
import { RiBuilding4Line } from "react-icons/ri"

interface Props {
   projectType: string
   projectLength: string
   projectWorkload: string
   scope: string
   countResponses: number
}

export function RequestMetadata({ projectType, projectLength, projectWorkload, scope, countResponses }: Readonly<Props>) {
   return (
      <>
         <Box className="flex gap-6 items-center">
            <Box className="flex gap-1 items-center">
               <RiBuilding4Line />
               <Typography variant="label">{projectTypeMap[projectType]}</Typography>
            </Box>
            <Box className="flex gap-1 items-center">
               <MdOutlineCalendarToday />
               <Typography variant="label">{projectLengthMap[projectLength]}</Typography>
            </Box>

            <Box className="flex gap-1 items-center">
               <MdOutlineSchedule />
               <Typography variant="label">{projectWorkload !== "FLEXIBLE" ? projectWorkloadMap[projectWorkload] : "Horario flexible"}</Typography>
            </Box>
         </Box>

         <Box className="flex gap-6 items-center">
            <Box className="flex gap-1 items-center">
               <IoLocationOutline />
               <Typography variant="label">{scope}</Typography>
            </Box>
            <Typography variant="label">{`Propuestas: ${countResponses}`}</Typography>
         </Box>
      </>
   )
}
