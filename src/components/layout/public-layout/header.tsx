"use client"
import { useRouter } from "next/navigation"
import { Box, Button, Typography } from "@/components/ui"
import { useRegistrationStore } from "@/stores/use-registration.store"
import { AUTH_FORM } from "@/lib/constants/auth.constants"

export function Header() {
   const router = useRouter()
   const { setForm } = useRegistrationStore((state) => state)

   return (
      <Box className="flex items-center justify-between p-4">
         <Box>
            <Typography variant="subtitulo2">Logo</Typography>
         </Box>
         <Box className="flex items-center gap-2">
            <Button
               variant="link"
               onClick={() => router.push("/login")}>
               Login
            </Button>
            <Button
               variant="primary"
               color="primary"
               onClick={() => {
                  setForm(AUTH_FORM.ROLE)
                  router.push("/register")
               }}>
               Unete
            </Button>
         </Box>
      </Box>
   )
}
