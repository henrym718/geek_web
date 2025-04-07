"use client"

import { Box, Typography } from "@/app/components/ui"
import InputTag from "@/app/components/ui/InputTag"
import { useWizardUserDataStore } from "@/app/stores/use-create-profile-user-data.store"

export default function SkillsSelector() {
   const { vendorProfile } = useWizardUserDataStore((state) => state)
   return (
      <Box className="flex w-full gap-20">
         <Box className="w-3/6 flex flex-col gap-2">
            <Typography variant="titulo3">Excelente, Ahora cuentanos sobre tus habilidades</Typography>
            <Typography variant="parrafo">
               Tus habilidades muestran a los clientes que puedes ofrecer y nos ayudan a aelegir que trabajos recomendarte. Agregue o
               elimine nuestra sugerencias, o comience a escribir para elegir mas.
            </Typography>
            <Typography
               className="pt-6"
               variant="label">
               Tus habilidades
            </Typography>
            <InputTag
               categoryId={vendorProfile.categoryId}
               maxVisibleOptions={3}
               maxSelectedTags={2}
            />
         </Box>
         <Box className="w-2/8 border border-gray-700 rounded-md p-4 bg-black/5">
            <Typography
               className="pb-6"
               variant="titulo3">
               Skills Recomendadas
            </Typography>
            <Typography variant="destacado">
               Tus habilidades muestran a los clientes que puedes ofrecer y nos ayudan a aelegir que trabajos recomendarte. Agregue o
               elimine nuestra sugerencias, o comience a escribir para elegir mas.
            </Typography>
         </Box>
      </Box>
   )
}
