import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"
import { PROFORMA_REQUEST_ENDPOINTS } from "@/config/constants"
import { apiGet, apiPost } from "../api.client"
import { CreateRequestRequest, CreateRequestResponse } from "@/data/dtos/create-request.type"

export async function fetchProformaRequestByProfileId(vendorProfileId: string): Promise<ApiResponse<GetRequestByProfileIdResponse[]>> {
   return await apiGet<GetRequestByProfileIdResponse[]>(PROFORMA_REQUEST_ENDPOINTS.PROFORMA_REQUEST_BY_VENDOR_PROFILE_ID(vendorProfileId))
}

export async function createRequest(requestData: CreateRequestRequest, token: string): Promise<ApiResponse<CreateRequestResponse>> {
   return await apiPost<CreateRequestResponse, CreateRequestRequest>(PROFORMA_REQUEST_ENDPOINTS.CREATE_REQUEST, requestData, {
      headers: { Authorization: `Bearer ${token}` },
   })
}
