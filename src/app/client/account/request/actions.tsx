import { StatusResponseType } from "@/config/constants"
import { updateStatusByClient } from "@/data/api/services/proforma-response.service"
import { sleep } from "@/lib/utils/sleep"

export const updateStatusByClientAction = async (prevState: { success: boolean | null; error: string | null }, formData: FormData) => {
   const { requestid, responseid, status } = Object.fromEntries(formData)

   await sleep(3000)
   const response = await updateStatusByClient({
      proformaRequestId: requestid as string,
      proformaResponseId: responseid as string,
      newStatus: status as StatusResponseType,
   })

   if (!response.success) {
      return {
         success: false,
         error: response.message,
      }
   }

   return {
      success: true,
      error: null,
   }
}
