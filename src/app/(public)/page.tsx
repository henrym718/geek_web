import { CardListGroup } from "@/components/CardListGroup/CardListGroup"
import { RequestSkills } from "@/components/client/request-panel/request-skills"
import { Search } from "@/components/search/Search"
import { Box, Button, Divider } from "@/components/ui"
import { ListFilter } from "lucide-react"

export default function HomePage() {
   const options = [
      { label: "Opción 1", value: "opcion1" },
      { label: "Opción 2", value: "opcion2" },
      { label: "Opción 3", value: "opcion3" },
      { label: "Opción 4", value: "opcion4" },
      { label: "Opción 5", value: "opcion5" },
      { label: "Opción 6", value: "opcion6" },
      { label: "Opción 7", value: "opcion7" },
      { label: "Opción 8", value: "opcion8" },
      { label: "Opción 9", value: "opcion9" },
      { label: "Opción 10", value: "opcion10" },
   ]

   return (
      <Box className="flex flex-col w-full h-full items-center gap-5">
         <Box className="w-[700px]">
            <Search
               options={options}
               limit={5}
            />
         </Box>

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
