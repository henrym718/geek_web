import { CategoryCardPublic } from "@/feature/categories/components/CategoryList/CategoryListPublic"
import { GroupListPublic } from "@/feature/groups/components/CardListGroup/GroupListPublic"
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
         <GroupListPublic />

         {/* Lista de categorías */}
         <CategoryCardPublic />
      </Box>
   )
}
