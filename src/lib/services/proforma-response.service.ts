import { ApiResponse } from "@/data/dtos/api-response.types"
import { CheckResponseExistsRes, CheckResponseExistsReq } from "@/data/dtos/check-reaponse-exists"
import { CreateResponse, CreateResponseRequest } from "@/data/dtos/create-proforma-response"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"

export const createProformaResponse = async (accessToken: string, request: CreateResponseRequest): Promise<ApiResponse<CreateResponse>> => {
   try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await apiClient.post<ApiResponse<CreateResponse>>("/proforma-response", request, {
         headers: { Authorization: `Bearer ${accessToken}` },
      })
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const checkResponseExists = async (request: CheckResponseExistsReq): Promise<ApiResponse<CheckResponseExistsRes>> => {
   try {
      const { proformaRequestId, profileVendorId } = request
      const { data } = await apiClient.get<ApiResponse<CheckResponseExistsRes>>(`/proforma-response/exists/${proformaRequestId}/${profileVendorId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
