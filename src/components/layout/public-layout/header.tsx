"use client"
import { Box, Typography } from "@/components/ui"
import { UserMenu } from "@/components/UserMenu/UserMenu"

export function Header() {
   return (
      <Box className="flex items-center justify-between p-4">
         <Box>
            <Typography
               variant="subtitulo2"
               color="secundario">
               Logo
            </Typography>
         </Box>

         <UserMenu />
      </Box>
   )
}
