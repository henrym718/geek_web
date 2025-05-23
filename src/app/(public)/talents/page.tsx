import { TalentListPublic } from "@/feature/talent/components/TalentList/TalentListPublic"
import { FilterTalentForm } from "@/components/project/FilterTalentForm/FilterTalentForm"
import { Box, Typography } from "@/components/ui"
import { fetchTalents } from "@/data/api/services/vendor-profile.service"
import { formatApiParams } from "@/lib/utils/formatURLParams"
import { notFound } from "next/navigation"

interface Props {
   searchParams: Promise<{
      query?: string
      skills?: string
      categoryId?: string
   }>
}

export default async function TalentsPage({ searchParams }: Props) {
   const { query, skills, categoryId } = await searchParams
   const formattedQuery = query ? formatApiParams(query) : undefined
   const formattedSkills = skills ? formatApiParams(skills) : undefined

   if (!formattedQuery && !formattedSkills && !categoryId) {
      return <div>No query or skills</div>
   }

   const response = await fetchTalents({ query: formattedQuery, skills: formattedSkills, categoryId })
   const talents = response.success ? response.data.results : []

   if (talents.length === 0) {
      return notFound()
   }

   return (
      <Box className="flex flex-col gap-4 w-full h-full">
         {/* Título */}
         <Typography variant="titulo1">Talentos</Typography>

         {/* Encabezado */}
         <Box className="flex items-center">
            <Typography variant="label">Encuentra el talento perfecto para tu proyecto, puede filtrar por skills, nombre, ciudad, etc.</Typography>

            {/* Formulario de filtro */}
            <FilterTalentForm />
         </Box>

         {/* Lista de talentos */}
         <Box className="grid grid-cols-4 gap-x-4 w-full h-full place-items-center">
            <TalentListPublic talents={talents} />
         </Box>
      </Box>
   )
}
