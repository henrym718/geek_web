import { Avatar } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Typography } from "@/components/ui/typography"
import { IoLocationOutline } from "react-icons/io5"
import { STATUS_RESPONSE } from "@/config/constants"
import { Button } from "@/components/ui"

interface Props {
   username: string
   title: string
   city: string
   message: string
   status: string
}

export function ProposalCard({ username, title, city, message, status }: Readonly<Props>) {
   return (
      <Box className="flex flex-col relative bg-white pb-2 border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow hover:cursor-pointer">
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
         <Button
            data-status={status}
            className="absolute bottom-2 right-2 text-white data-[status=ACCEPTED]:bg-green-500 data-[status=REJECTED]:bg-red-500  data-[status=REJECTED]:text-white data-[status=PENDING]:bg-yellow-500"
            variant="secundary">
            {status === STATUS_RESPONSE.ACCEPTED && "Aceptado"}
            {status === STATUS_RESPONSE.REJECTED && "Rechazado"}
            {status === STATUS_RESPONSE.PENDING && "Pendiente"}
         </Button>
      </Box>
   )
}
