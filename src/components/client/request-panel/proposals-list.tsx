"use client"

import { fetchAllResponsesByRequestId } from "@/data/api/services/proforma-response.service"
import useSWR from "swr"
import { ProposalsInteractionCard } from "./proposal-interaction-card"
import { Box } from "@/components/ui"

interface Props {
   requestid: string
}

export function ProposalsList({ requestid }: Readonly<Props>) {
   const { data: proposals, isLoading } = useSWR(requestid ? ["response", requestid] : null, () => fetchAllResponsesByRequestId({ requestid }))

   if (isLoading) return <div>Loading...</div>
   if (!proposals?.success) return <div>Error: {proposals?.message}</div>

   return (
      <Box className="flex flex-col gap-4 h-[calc(100vh-5rem)] overflow-y-auto">
         {proposals?.data.map((data) => (
            <ProposalsInteractionCard
               key={data.proformaResponse.id}
               response={data.proformaResponse}
               user={data.user}
               vendor={data.vendor}
               vendorProfile={data.vendorProfile}
               skills={data.skills}
            />
         ))}
      </Box>
   )
}
