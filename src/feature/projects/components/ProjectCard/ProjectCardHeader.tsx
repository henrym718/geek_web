import { Box, Typography } from "@/components/ui"
import { timeAgo } from "@/lib/utils/timeAgo"
import { GrNext } from "react-icons/gr"

interface Props {
   createdAt: Date
   title: string
   nextButton?: boolean
}

export function ProjectCardHeader({ createdAt, title, nextButton = true }: Readonly<Props>) {
   return (
      <Box className="relative flex flex-col gap-0.5">
         <Typography variant="etiqueta">{timeAgo(createdAt ?? new Date())}</Typography>
         <Typography
            className="pb-2 flex items-center gap-2"
            variant="subtitulo1">
            {title}
         </Typography>
         {nextButton && (
            <span className="absolute top-4 right-0">
               <GrNext className="w-8 h-8 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            </span>
         )}
      </Box>
   )
}
