"use client"
import { Box } from "@/components/ui"
import React from "react"
import { RequestList } from "./request-list"
import { ProposalsList } from "./proposals-list"

interface Props {
   search: string
   requestid: string
}

export function ActiveRequestList({ search, requestid }: Readonly<Props>) {
   return (
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
   )
}
