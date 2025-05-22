"use client"

import { fetchAllResponsesByRequestId } from "@/data/api/services/proforma-response.service"
import useSWR from "swr"
import { Box } from "@/components/ui"
import { ProposalItem } from "../ProposalItem/ProposalItem"
import { useSessionDataStore } from "@/stores/user-session-data.store"
interface Props {
   requestid: string
}

export function ProposalsList({ requestid }: Readonly<Props>) {
   const { data: proposals, isLoading } = useSWR(requestid ? ["response", requestid] : null, () => fetchAllResponsesByRequestId({ requestid }))
   const { user } = useSessionDataStore()
   if (isLoading) return <div>Loading...</div>
   if (!proposals?.success) return <div>Error: {proposals?.message}</div>

   return (
      <Box className="flex gap-6">
         <Box className="flex flex-col overflow-y-auto gap-4 w-full">
            {proposals?.data.map((data) => (
               <ProposalItem
                  key={data.proformaResponse.id}
                  vendorId={data.user.id}
                  clientId={user?.user.id ?? ""}
                  username={data.user.username}
                  firstName={data.vendor.firstName}
                  aboutme={data.vendorProfile.aboutme}
                  lastName={data.vendor.lastName}
                  title={data.vendorProfile.title}
                  city={data.city.name}
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
