import React from "react"
import { Box, Typography, TextArea } from "@/components/ui"
import { useWizardUserDataStore } from "@/stores/use-create-profile-user-data.store"

export function ProfileAboutMe() {
   const { setVendorProfile, vendorProfile } = useWizardUserDataStore((state) => state)

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Genial, ahora escribe una biografia para contarle al mundo sobre ti</Typography>
         <Typography variant="parrafo">
            Ayuda a la gente a conocerte de un vistazo. Cuentales cuales son tus fortalezas, procura ser claro, usanddo párrafo o viñetas. Siempre
            podrás editar más tarde.
         </Typography>
         <TextArea
            placeholder="Escribe tu biografia"
            className="mt-4"
            rows={10}
            value={vendorProfile?.aboutme}
            onChange={(e) => setVendorProfile({ aboutme: e.target.value })}
         />
      </Box>
   )
}
