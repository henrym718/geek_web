import { CardListCategory } from "@/components/project/CardListCategory/CardListCategory"
import { CardListGroup } from "@/components/project/CardListGroup/CardListGroup"
import { SearchGroups } from "@/components/project/SearchGroups/SearchGroups"
import { Box, Divider } from "@/components/ui"
import { fecthSuggestions } from "@/data/api/services/suggestions.service"

export default async function HomePage() {
   const suggestions = await fecthSuggestions()
   const suggestionsData = suggestions.success ? suggestions.data : []

   return (
      <Box className="flex flex-col w-full h-full items-center gap-5">
         {/* Buscador principal */}
         <SearchGroups suggestions={suggestionsData} />

         {/* Divisor */}
         <Divider className="w-screen" />

         {/* Lista de grupos */}
         <CardListGroup />

         {/* Lista de categorías */}
         <CardListCategory />
      </Box>
   )
}
