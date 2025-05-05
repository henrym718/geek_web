"use client"

import { Box, Typography, InputTag } from "@/components/ui"
import { CreateVendorProfileRequest } from "@/data/dtos/create-vendor-profile.types"
import { Skill } from "@/data/types/models/models"

interface Props {
   categoryId: string
   selectedTags: Skill[]
   addSelectedTag: (tags: Skill) => void
   removeSelectedTag: (tags: Skill) => void
   addOptionsTag: (tags: Skill) => void
   removeOptionsTag: (tags: Skill) => void
   optionsTags: Skill[]
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
}

export function SkillsSelector(props: Readonly<Props>) {
   const { selectedTags, addSelectedTag, removeSelectedTag, optionsTags, addOptionsTag, removeOptionsTag, setVendorProfile } = props

   const handleSelectedTags = (tag: Skill) => {
      addSelectedTag(tag)
      removeOptionsTag(tag)
      setVendorProfile({ skills: [tag.id] })
   }

   const handleUnselectedTags = (tag: Skill) => {
      removeSelectedTag(tag)
      addOptionsTag(tag)
   }

   return (
      <Box className="flex w-full gap-20">
         <Box className="w-3/6 flex flex-col gap-2">
            <Typography variant="titulo3">Excelente, Ahora cuentanos sobre tus habilidades</Typography>
            <Typography variant="parrafo">
               Tus habilidades muestran a los clientes que puedes ofrecer y nos ayudan a aelegir que trabajos recomendarte. Agregue o elimine nuestra
               sugerencias, o comience a escribir para elegir mas.
            </Typography>
            <Typography
               className="pt-6"
               variant="label">
               Tus habilidades
            </Typography>
            <InputTag
               maxVisibleOptions={10}
               maxSelectedTags={10}
               optionsTags={optionsTags}
               selectedTags={selectedTags}
               setSelectedTags={handleSelectedTags}
               setUnselectedTags={handleUnselectedTags}
            />
         </Box>
         <Box className="w-2/8 border border-gray-700 rounded-md p-4 bg-black/5">
            <Typography
               className="pb-6"
               variant="titulo3">
               Skills Recomendadas
            </Typography>
            <Typography variant="destacado">
               Tus habilidades muestran a los clientes que puedes ofrecer y nos ayudan a aelegir que trabajos recomendarte. Agregue o elimine nuestra
               sugerencias, o comience a escribir para elegir mas.
            </Typography>
         </Box>
      </Box>
   )
}
