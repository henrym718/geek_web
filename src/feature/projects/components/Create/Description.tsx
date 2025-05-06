"use client"

import { Box, TextArea, Typography } from "@/components/ui"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   description: string
   setProject: (project: Partial<CreateRequestRequest>) => void
}

export function Description({ setProject, description }: Readonly<Props>) {
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
            onChange={(e) => setProject({ description: e.target.value })}
            value={description}
         />
      </Box>
   )
}
