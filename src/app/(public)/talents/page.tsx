import { CardListTalent } from "@/components/CardListTalent/CardListTalent"
import { FilterTalentForm } from "@/components/FilterTalentForm/FilterTalentForm"
import { Box, Typography } from "@/components/ui"
import { fetchTalents } from "@/data/api/services/vendor-profile.service"
import { formatApiParams } from "@/lib/utils/formatURLParams"

interface TalentsPageProps {
   searchParams: {
      query?: string
      skills?: string
   }
}

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
   const { query, skills } = await searchParams
   const formattedQuery = query ? formatApiParams(query) : undefined
   const formattedSkills = skills ? formatApiParams(skills) : undefined

   if (!formattedQuery && !formattedSkills) {
      return <div>No query or skills</div>
   }

   const response = await fetchTalents({ query: formattedQuery, skills: formattedSkills })
   const talents = response.success ? response.data.results : []

   return (
      <Box className="flex flex-col gap-4 w-full h-full">
         <Typography variant="titulo1">Talentos</Typography>
         <Box className="flex items-center">
            <Typography variant="label">Encuentra el talento perfecto para tu proyecto, puede filtrar por skills, nombre, ciudad, etc.</Typography>
            <FilterTalentForm />
         </Box>
         <CardListTalent talents={talents} />
      </Box>
   )
}
