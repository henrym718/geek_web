"use client"

import { Box } from "@/components/ui"
import { ProformaRequestCard } from "./request-card"
import { fetchProformaRequestByProfileId } from "@/data/api/services/proforma-request.service"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"

export function RequestList() {
   const searchParams = useSearchParams()
   const profileId = searchParams.get("profile") ?? ""

   const { data, isLoading, isValidating } = useSWR(
      profileId ? ["request-list", profileId] : null,
      () => fetchProformaRequestByProfileId(profileId),
      { revalidateOnFocus: false }
   )

   if (isLoading || isValidating) {
      return <Box className="p-4 text-center">Cargando solicitudes...</Box>
   }

   if (data?.success && data?.data?.length === 0) {
      return <Box className="p-4 text-center">No hay solicitudes disponibles</Box>
   }

   return (
      <>
         {data?.success &&
            data?.data?.map((request) => (
               <ProformaRequestCard
                  key={request.id}
                  request={request}
                  profileId={profileId}
               />
            ))}
      </>
   )
}
