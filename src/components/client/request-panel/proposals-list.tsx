"use client"

import { fetchAllResponsesByRequestId } from "@/data/api/services/proforma-response.service"
import useSWR from "swr"
import { ProposalsInteractionCard } from "./proposal-interaction-card"
import { Box } from "@/components/ui"
import { ProposalActionModal } from "./proposal-action-modal"
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
               <ProposalsInteractionCard
                  key={data.proformaResponse.id}
                  response={data.proformaResponse}
                  user={data.user}
                  vendor={data.vendor}
                  vendorProfile={data.vendorProfile}
                  skills={data.skills}
                  requestid={requestid}
               />
            ))}
         </Box>
         <Box className="w-7/12 h-[calc(100vh-9rem)] overflow-y-auto bg-white rounded-xl p-4">
            <ProposalActionModal
               username={proposals.data[0].user.username}
               title={proposals.data[0].vendorProfile.title}
               city={proposals.data[0].vendor.city}
               message={proposals.data[0].proformaResponse.message}
               skills={proposals.data[0].skills}
               createdAt={proposals.data[0].user.createdAt}
               closeModal={close}
               requestid={requestid}
               responseid={proposals.data[0].proformaResponse.id}
            />{" "}
         </Box>
      </Box>
   )
}
