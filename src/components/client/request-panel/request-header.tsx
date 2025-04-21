import { Box, Typography } from "@/components/ui"
import { timeAgo } from "@/lib/utils/timeAgo"

interface Props {
   createdAt: Date
   title: string
}

export function RequestHeader({ createdAt, title }: Readonly<Props>) {
   return (
      <Box>
         <Typography variant="etiqueta">{timeAgo(createdAt ?? new Date())}</Typography>
         <Typography
            className="pb-2 flex items-center gap-2"
            variant="subtitulo1">
            {title}
         </Typography>
      </Box>
   )
}
