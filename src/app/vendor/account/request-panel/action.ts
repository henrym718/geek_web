import { createProformaResponse } from "@/data/api/services/proforma-response.service"
import { getAccessTokenFromCookie } from "@/lib/utils/get-access-token-from-cookie"

export const createRequestResponseAction = async (prevState: { error: string }, formData: FormData) => {
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

   return { success: false, error: response.message }
}
