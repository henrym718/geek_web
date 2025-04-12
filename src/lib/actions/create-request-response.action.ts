"use server"
import { createProformaResponse } from "@/services/proforma-response.service"
import { getAccessTokenFromCookie } from "../utils/get-access-token-from-cookie"
import { revalidatePath } from "next/cache"

export const createRequestResponse = async (prevState: { error: string }, formData: FormData) => {
   const { message, proformaRequestId, profileVendorId } = Object.fromEntries(formData)
   const accessToken = await getAccessTokenFromCookie()

   if (!accessToken) {
      return { error: "No se pudo obtener el token de acceso", success: false }
   }

   const response = await createProformaResponse(accessToken, {
      message: message as string,
      proformaRequestId: proformaRequestId as string,
      profileVendorId: profileVendorId as string,
   })

   if (response.success) {
      return { success: true, error: "" }
   }

   revalidatePath(`/vendor/account/request/`)

   return { success: false, error: response.message }
}
