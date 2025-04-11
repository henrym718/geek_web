import { ApiResponse } from "@/data/dtos/api-response.types"
import { CreateProformaResponse, CreateProformaResponseRequest } from "@/data/dtos/create-proforma-response"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"

export const createProformaResponse = async (
   accessToken: string,
   request: CreateProformaResponseRequest
): Promise<ApiResponse<CreateProformaResponse>> => {
   try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await apiClient.post<ApiResponse<CreateProformaResponse>>("/proforma-response", request, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      })
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
