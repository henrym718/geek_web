import { ApiResponse } from "@/data/dtos/api-response.types"
import { CreateProformaResponse, CreateProformaResponseRequest } from "@/data/dtos/create-proforma-response"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"

export const createProformaResponse = async (request: CreateProformaResponseRequest): Promise<ApiResponse<CreateProformaResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CreateProformaResponse>>("/proforma-response", request)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
