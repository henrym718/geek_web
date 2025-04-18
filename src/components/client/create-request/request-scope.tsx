"use client"

import { Box, InputSearch, Typography } from "@/components/ui"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"
import { useForm } from "react-hook-form"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"

export function RequestScope() {
   const { setRequestData } = useCreateRequestUserDataStore((state) => state)
   const { selectedScope, setSelectedScope } = useCreateRequestFormDataStore((state) => state)

   const { control } = useForm()

   const handleScopeSelected = (option: { id: string; label: string }) => {
      setRequestData({ scope: option.id })
      setSelectedScope(option.label)
   }

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Es momento de definir el alcance de la solicitud.</Typography>
         <Typography variant="parrafo">El alcance permite mostrar tu necesidad a los profesionales que se encuentran en la zona.</Typography>
         <InputSearch
            label="Alcance"
            placeholder="Describe el alcance de la solicitud"
            options={[
               { id: "09a48491-e0f4-4f56-9194-59c4f8d02084", label: "El Piedrero" },
               { id: "09a48491-e0f4-4f56-9194-59c4f8d02085", label: "El Triunfo" },
               { id: "09a48491-e0f4-4f56-9194-59c4f8d02086", label: "Pueblo Nuevo" },
               { id: "09a48491-e0f4-4f56-9194-59c4f8d02087", label: "San pedro" },
            ]}
            name="scope"
            control={control}
            onSelected={handleScopeSelected}
            value={selectedScope}
         />
      </Box>
   )
}
