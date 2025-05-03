import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"
import { PROFORMA_REQUEST_ENDPOINTS } from "@/config/endpoints"
import { apiGet, apiPost } from "../api.client"
import { CreateRequestRequest, CreateRequestResponse } from "@/data/dtos/create-request.type"
import { GetRequestsByClientIdResponse } from "@/data/types/api/request.types"

export async function fetchProformaRequestByProfileId(
   vendorProfileId: string,
   accessToken?: string
): Promise<ApiResponse<GetRequestByProfileIdResponse[]>> {
   return await apiGet<GetRequestByProfileIdResponse[]>(PROFORMA_REQUEST_ENDPOINTS.PROFORMA_REQUEST_BY_VENDOR_PROFILE_ID(vendorProfileId), {
      headers: { Authorization: `Bearer ${accessToken}` },
   })
}

export async function createRequest(request: CreateRequestRequest, token: string): Promise<ApiResponse<CreateRequestResponse>> {
   return await apiPost<CreateRequestResponse, CreateRequestRequest>(PROFORMA_REQUEST_ENDPOINTS.CREATE_REQUEST, request, {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export async function fetchRequestByClientId(params: Record<string, string>): Promise<ApiResponse<GetRequestsByClientIdResponse[]>> {
   return await apiGet<GetRequestsByClientIdResponse[]>(PROFORMA_REQUEST_ENDPOINTS.PROFORMA_REQUEST_BY_CLIENT_ID(), {
      params,
   })
}
