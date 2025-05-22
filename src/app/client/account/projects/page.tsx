import { FilterProjectTabClient } from "@/feature/projects/components/FilterTabs/FilterProjectTabClient"
import { Box, Typography } from "@/components/ui"
import { CLIENT_TABS, STATUS_REQUEST } from "@/config/constants"
import { CreateProjectButton } from "@/feature/projects/components/Create/CreateProjectButton"
import { ProposalsList } from "@/feature/proposals/components/ProposalList/ProposalList"
import { ActiveProjectListClient } from "@/feature/projects/components/ProjectList/ProjectListClient"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Props {
   searchParams: Promise<{
      search?: string
      requestid?: string
   }>
}

export default async function RequestPanelPage({ searchParams }: Readonly<Props>) {
   const params = await searchParams
   const search = params.search || "active"
   const requestid = params.requestid

   return (
      <Box className="px-6 pb-10 flex flex-col gap-4 ">
         {/* Si ha seleccionado una solicitud, se muestra la lista de respuestas */}
         {requestid ? (
            <Box className="flex flex-col gap-4">
               <Link href="/client/account/projects">
                  <ChevronLeft className="cursor-pointer hover:text-black/50 hover:bg-black/5 hover:rounded-full" />
               </Link>
               <Typography variant="subtitulo1">Respuestas a la solicitud</Typography>
               <ProposalsList requestid={requestid} />
            </Box>
         ) : (
            <Box className="flex flex-col gap-4">
               <Typography variant="subtitulo1">Panel de solicitudes</Typography>

               {/* Tabs para filtrar los proyectos y el botón para crear un nuevo proyecto */}
               <Box className="flex justify-between top-0 z-10 py-2 bg-zinc-100">
                  <FilterProjectTabClient tabs={CLIENT_TABS} />
                  <CreateProjectButton />
               </Box>

               {/* Lista de proyectos segun el estado de la solicitud */}
               <Box className="overflow-y-auto max-h-[calc(100vh-233px)]">
                  {search === STATUS_REQUEST.ACTIVE.toLowerCase() && <ActiveProjectListClient search={search} />}
               </Box>
            </Box>
         )}
      </Box>
   )
}
