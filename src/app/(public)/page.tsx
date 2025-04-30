import { CardListCategory } from "@/components/CardListCategory/CardListCategory"
import { CardListGroup } from "@/components/CardListGroup/CardListGroup"
import { SearchGroups } from "@/components/SearchGroups/SearchGroups"
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
         <Box className="w-screen">
            <Divider />
         </Box>

         {/* Lista de grupos */}
         <CardListGroup />

         {/* Lista de categorías */}
         <CardListCategory />
      </Box>
   )
}
