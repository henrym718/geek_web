"use client"

import { Box, TextArea, Typography } from "@/components/ui"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

export function RequestDetails() {
   const { setRequestData, requestData } = useCreateRequestUserDataStore((state) => state)
   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Permitenos entender mejor tu necesidad, agrega un detalle de la solicitud</Typography>
         <Typography variant="parrafo">
            Describe lo que necesitas de manera precisa y clara para que los profesionales puedan ofrecerte su ayuda, no dudes en agregar detalles.
         </Typography>
         <TextArea
            placeholder="Ingeniero en desarrollo web con enfasis en frontend y backend"
            className="mt-4"
            rows={10}
            onChange={(e) => setRequestData({ description: e.target.value })}
            value={requestData.description}
         />
      </Box>
   )
}
