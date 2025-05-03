"use client"

import { Box, Typography } from "@/components/ui"
import { fetchProformaRequestByProfileId } from "@/data/api/services/proforma-request.service"
import useSWR from "swr"
import { ProjectTalentItem } from "../ProjectTalentItem/ProjectTalentItem"

interface Props {
   profileId: string
}

export function ProjectListTalent({ profileId }: Readonly<Props>) {
   const {
      data: response,
      isLoading,
      isValidating,
   } = useSWR(profileId ? ["request-list", profileId] : null, () => fetchProformaRequestByProfileId(profileId))

   if (isLoading || isValidating) {
      return <Box className="p-4 text-center">Cargando solicitudes...</Box>
   }

   // No hay profileId seleccionado
   if (!profileId) {
      return <Box className="p-4 text-center">Selecciona un perfil para ver las solicitudes.</Box>
   }

   // Si la API devuelve success: false en este caso, ajustar la lógica.
   if (response?.success && response?.data?.length === 0) {
      return (
         <Box className="p-4 text-center flex flex-col items-center gap-4">
            <Typography variant="mensaje">No hay solicitudes disponibles</Typography>
         </Box>
      )
   }

   const projects = response?.success ? response.data : []

   console.log(projects)

   return (
      <Box className="flex flex-col gap-4">
         {projects?.map((data) => (
            <ProjectTalentItem
               key={data.request.id}
               profileId={profileId}
               project={data.request}
               skills={data.skills}
               category={data.category}
               city={data.city}
            />
         ))}
      </Box>
   )
}
