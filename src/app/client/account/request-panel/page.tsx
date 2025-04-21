import { FilterRequestTab } from "@/components/client/request-panel/filter-request-tab"
import { RequestList } from "@/components/client/request-panel/request-list"
import { ProposalsList } from "@/components/client/request-panel/proposals-list"
import { Box } from "@/components/ui"
import { STATUS_REQUEST } from "@/config/constants"

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
   const requestid = params.requestid || ""

   return (
      <Box className="flex flex-col gap-4 w-7xl mx-auto">
         <Box className="sticky top-0 z-10 bg-white py-2">
            <FilterRequestTab tabs={tabs} />
         </Box>
         <Box className="flex gap-4">
            <Box
               data-search={search === "active"}
               className="data-[search=true]:w-5/9 data-[search=false]:w-full">
               <RequestList search={search} />
            </Box>
            <Box
               data-search={search === "active"}
               className="data-[search=true]:w-4/9 data-[search=false]:hidden">
               <ProposalsList requestid={requestid} />
            </Box>
         </Box>
      </Box>
   )
}
