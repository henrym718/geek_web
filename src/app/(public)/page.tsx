import { CardListGroup } from "@/components/CardListGroup/CardListGroup"
import { RequestSkills } from "@/components/client/request-panel/request-skills"
import { SearchGroups } from "@/components/SearchGroups/SearchGroups"
import { Box, Button, Divider } from "@/components/ui"
import { fecthSuggestions } from "@/data/api/services/suggestions.service"
import { ListFilter } from "lucide-react"

export default async function HomePage() {
   const suggestions = await fecthSuggestions()

   const suggestionsData = suggestions.success ? suggestions.data : []

   return (
      <Box className="flex flex-col w-full h-full items-center gap-5">
         <SearchGroups suggestions={suggestionsData} />

         {/* Divider fuera del layout limitado */}
         <Box className="w-screen">
            <Divider />
         </Box>

         <Box className="flex flex-col gap-4 items-center w-full">
            <CardListGroup />
            <RequestSkills
               skills={[
                  { id: "1", name: "Desarrollo web personalizado" },
                  { id: "2", name: "Diseño de aplicaciones móviles " },
                  { id: "3", name: "Marketing digital integral" },
                  { id: "5", name: "Gestión de redes sociales" },
                  { id: "6", name: "Desarrollo de ecommerce" },
                  { id: "7", name: "Ciberseguridad y protección de datos" },
                  { id: "8", name: "Análisis de datos y Business Intelligence" },
                  { id: "9", name: "Desarrollo de software a medida" },
                  { id: "10", name: "Diseño web responsive" },
               ]}
            />
         </Box>
         <Box className="flex w-full justify-start">
            <Button variant="outline">
               <ListFilter />
               Filtros
            </Button>
         </Box>
      </Box>
   )
}
