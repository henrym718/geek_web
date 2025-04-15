import { ApiResponse } from "@/data/dtos/api-response.types"
import { CheckResponseExistsRes, CheckResponseExistsReq } from "@/data/dtos/check-reaponse-exists"
import { CreateResponse, CreateResponseRequest } from "@/data/dtos/create-proforma-response"
import { apiGet, apiPost } from "../api.client"
import { PROFORMA_RESPONSE_ENDPOINTS } from "@/config/constants"

export const createProformaResponse = async (request: CreateResponseRequest): Promise<ApiResponse<CreateResponse>> => {
   return await apiPost<CreateResponse, CreateResponseRequest>(PROFORMA_RESPONSE_ENDPOINTS.CREATE_PROFORMA_RESPONSE, request)
}

export const checkResponseExists = async (request: CheckResponseExistsReq): Promise<ApiResponse<CheckResponseExistsRes>> => {
   return await apiGet<CheckResponseExistsRes>(PROFORMA_RESPONSE_ENDPOINTS.CHECK_RESPONSE_EXISTS(request.proformaRequestId, request.profileVendorId))
}
