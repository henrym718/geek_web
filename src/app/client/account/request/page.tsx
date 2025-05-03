import { FilterRequestTab } from "@/components/project/client/request-panel/filter-request-tab"
import { Box, Typography } from "@/components/ui"
import { STATUS_REQUEST } from "@/config/constants"
import { ActiveRequestList } from "@/components/project/client/request-panel/active-request-list"
import { MatchedRequestView } from "@/components/project/client/request-panel/matched-request-view"
import { AnnulledRequestCards } from "@/components/project/client/request-panel/annulled-request-cards"
import { StartCreateRequestButton } from "@/components/project/client/create-request/start-create-request-button"
import { ProposalsList } from "@/components/project/client/request-panel/proposals-list"

const tabs = [
   { label: "Activo", value: STATUS_REQUEST.ACTIVE },
   { label: "Completado", value: STATUS_REQUEST.MATCHED },
   { label: "Anulado", value: STATUS_REQUEST.ANNULLED },
   { label: "Caducado", value: STATUS_REQUEST.FINISHED },
]

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
      <Box className="max-w-screen-xl bg-zinc-100 rounded-2xl px-6 pb-10 mt-5 pt-8 flex flex-col gap-4 min-h-[500px]">
         {requestid ? (
            <Box className="flex flex-col gap-4">
               <Typography variant="subtitulo1">Respuestas a la solicitud</Typography>
               <ProposalsList requestid={requestid} />
            </Box>
         ) : (
            <Box className="flex flex-col gap-4">
               <Typography variant="subtitulo1">Panel de solicitudes</Typography>
               <Box className="sticky flex justify-between top-0 z-10 py-2 bg-zinc-100">
                  <FilterRequestTab tabs={tabs} />
                  <StartCreateRequestButton />
               </Box>

               <Box className="overflow-y-auto max-h-[calc(100vh-233px)]">
                  {search === STATUS_REQUEST.ACTIVE.toLowerCase() && <ActiveRequestList search={search} />}
                  {search === STATUS_REQUEST.MATCHED.toLowerCase() && <MatchedRequestView />}
                  {search === STATUS_REQUEST.ANNULLED.toLowerCase() && <AnnulledRequestCards />}
               </Box>
            </Box>
         )}
      </Box>
   )
}
