import { AxiosError } from "axios"
import { ApiResponse } from "../data/dtos/api-response.types"
import { GetRequestByProfileIdResponse } from "../data/dtos/get-request-by-vendor-profile-id"
import { apiClient } from "../lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "../lib/api/api.error-adapter"

export async function fetchProformaRequestByProfileId(vendorProfileId: string): Promise<ApiResponse<GetRequestByProfileIdResponse[]>> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { data } = await apiClient.get<ApiResponse<GetRequestByProfileIdResponse[]>>(`/proforma-request/vendor/${vendorProfileId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
