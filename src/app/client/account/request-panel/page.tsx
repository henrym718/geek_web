import { FilterRequestTab } from "@/components/client/request-panel/filter-request-tab"
import { Box } from "@/components/ui"
import { STATUS_REQUEST } from "@/config/constants"
import { ActiveRequestList } from "@/components/client/request-panel/active-request-list"

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

   const Render: Record<string, React.ReactNode> = {
      active: (
         <ActiveRequestList
            search={search}
            requestid={requestid}
         />
      ),
   }

   return (
      <Box className="flex flex-col gap-4 w-7xl mx-auto">
         <Box className="sticky top-0 z-10 bg-white py-2">
            <FilterRequestTab tabs={tabs} />
         </Box>
         {Render[search]}
      </Box>
   )
}
