"use client"

import { fetchAllResponsesByRequestId } from "@/data/api/services/proforma-response.service"
import useSWR from "swr"
import { Box } from "@/components/ui"
import { ProposalItem } from "../ProposalItem/ProposalItem"
interface Props {
   requestid: string
}

export function ProposalsList({ requestid }: Readonly<Props>) {
   const { data: proposals, isLoading } = useSWR(requestid ? ["response", requestid] : null, () => fetchAllResponsesByRequestId({ requestid }))

   if (isLoading) return <div>Loading...</div>
   if (!proposals?.success) return <div>Error: {proposals?.message}</div>

   return (
      <Box className="flex gap-6">
         <Box className="flex flex-col h-[calc(100vh-9rem)] overflow-y-auto gap-4 w-5/12">
            {proposals?.data.map((data) => (
               <ProposalItem
                  key={data.proformaResponse.id}
                  username={data.user.username}
                  title={data.vendorProfile.title}
                  city={data.vendor.city}
                  message={data.proformaResponse.message}
                  status={data.proformaResponse.status}
                  skills={data.skills}
                  createdAt={data.user.createdAt}
                  requestid={requestid}
                  responseid={data.proformaResponse.id}
               />
            ))}
         </Box>
      </Box>
   )
}
