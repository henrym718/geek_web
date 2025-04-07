"use client"
import { useRegistrationFormStore } from "@/app/stores/auth/registrationFormStore"
import { Box, Button, Typography } from "../../ui"
import { useRouter } from "next/navigation"
import { AUTH_FORM } from "@/app/lib/constants/auth.constants"

export default function Header() {
   const router = useRouter()
   const { setForm } = useRegistrationFormStore((state) => state)

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
