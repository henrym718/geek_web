"use client"
import { Box, Typography } from "@/components/ui"
import { UserMenu } from "../../UserMenu/UserMenu"
import { useRouter } from "next/navigation"

export function Header() {
   const router = useRouter()
   return (
      <Box className="w-full flex items-center justify-between py-4">
         <Box>
            <Typography
               variant="subtitulo2"
               color="secundario"
               className="cursor-pointer"
               onClick={() => router.push("/")}>
               Logo
            </Typography>
         </Box>

         <UserMenu />
      </Box>
   )
}
