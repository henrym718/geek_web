"use client"
import { Box } from "@/components/ui/box"
import React from "react"
import { RequestCard } from "./request-card"
import useSWR from "swr"
import { fetchRequestByClientId } from "@/data/api/services/proforma-request.service"

interface Props {
   search: string
}

export function ActiveRequestList({ search }: Readonly<Props>) {
   const { data: request, isLoading } = useSWR(search ? ["request", search] : null, () => fetchRequestByClientId({ search }))

   if (isLoading) return <div>Loading...</div>
   if (!request?.success) return <div>Error: {request?.message}</div>

   return (
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
         {request.data.map((data) => (
            <RequestCard
               key={data.request.id}
               id={data.request.id}
               title={data.request.title}
               description={data.request.description}
               quotation={data.request.quotation}
               budget={data.request.budget}
               budgetUnit={data.request.budgetUnit}
               scope={data.request.scope}
               projectType={data.request.projectType}
               projectLength={data.request.projectLength}
               projectWorkload={data.request.projectWorkload}
               countResponses={data.request.countResponses}
               createdAt={data.request.createdAt ?? new Date()}
               skills={data.skills}
            />
         ))}
      </Box>
   )
}
