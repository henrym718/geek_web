"use server"
import { createRequest } from "@/data/api/services/proforma-request.service"
import { CreateRequestRequest } from "@/data/dtos/create-request.type"
import { getAccessTokenFromCookie } from "@/lib/utils/get-access-token-from-cookie"
import { sleep } from "@/lib/utils/sleep"
import { redirect } from "next/navigation"

export async function createRequestAction(prevState: { success: boolean; error: string }, formData: FormData) {
   const token = await getAccessTokenFromCookie()
   if (!token) return { success: false, error: "No se pudo obtener el token de acceso" }

   const payloadJson = formData.get("payload") as string
   const requestData: CreateRequestRequest = JSON.parse(payloadJson)

   await sleep(3000)
   const response = await createRequest(requestData, token)

   console.log(response)
   if (response.success) {
      redirect("/client/account/request")
   }

   return { success: false, error: response.message }
}
