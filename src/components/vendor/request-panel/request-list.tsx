// ProformaRequestList.tsx
"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Box } from "@/components/ui"
import { ProformaRequestCard } from "./request-card"
import { fetchProformaRequestByProfileId } from "@/services/proforma-request.service"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"

export function RequestList() {
   const searchParams = useSearchParams()
   const search = searchParams.get("search") || "recommended"
   const profileId = searchParams.get("profile")

   const [proformaRequest, setProformaRequest] = useState<GetRequestByProfileIdResponse[]>([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      async function fetchData() {
         if (!profileId) return
         setIsLoading(true)
         const response = await fetchProformaRequestByProfileId(profileId)
         setProformaRequest(response.success ? response.data : [])
         setIsLoading(false)
      }
      fetchData()
   }, [search, profileId])

   if (isLoading) {
      return <Box className="p-4 text-center">Cargando solicitudes...</Box>
   }

   if (proformaRequest.length === 0) {
      return <Box className="p-4 text-center">No hay solicitudes disponibles</Box>
   }
   return <ProformaRequestCard request={proformaRequest} />
}
