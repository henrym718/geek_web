"use client"

import { Box, InputSearch, Typography } from "@/components/ui"
import { useForm } from "react-hook-form"

export function RequestScope() {
   const { control } = useForm()

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Es momento de definir el alcance de la solicitud.</Typography>
         <Typography variant="parrafo">El alcance permite mostrar tu necesidad a los profesionales que se encuentran en la zona.</Typography>
         <InputSearch
            label="Alcance"
            placeholder="Describe el alcance de la solicitud"
            options={[
               { id: "1", label: "El Piedrero" },
               { id: "2", label: "El Triunfo" },
               { id: "3", label: "Pueblo Nuevo" },
               { id: "4", label: "San pedro" },
            ]}
            name="scope"
            control={control}
         />
      </Box>
   )
}
