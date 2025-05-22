import { ApiResponse } from "@/data/dtos/api-response.types"
import { CheckResponseExistsRes, CheckResponseExistsReq } from "@/data/dtos/check-reaponse-exists"
import { CreateResponse, CreateResponseRequest } from "@/data/dtos/create-proforma-response"
import { apiGet, apiPost, apiPut } from "../api.client"
import { PROFORMA_RESPONSE_ENDPOINTS } from "@/config/endpoints"
import {
   GetResponsesByRequestIdRequest,
   GetResponsesByRequestIdResponse,
   UpdateStatusByClientRequest,
   UpdateStatusByClientResponse,
} from "@/data/types/api/response.types"

export const createProformaResponse = async (request: CreateResponseRequest): Promise<ApiResponse<CreateResponse>> => {
   return await apiPost<CreateResponse, CreateResponseRequest>(PROFORMA_RESPONSE_ENDPOINTS.CREATE_PROFORMA_RESPONSE, request)
}

export const checkResponseExists = async (request: CheckResponseExistsReq): Promise<ApiResponse<CheckResponseExistsRes>> => {
   return await apiGet<CheckResponseExistsRes>(PROFORMA_RESPONSE_ENDPOINTS.CHECK_RESPONSE_EXISTS(request.proformaRequestId, request.profileVendorId))
}

export const fetchAllResponsesByRequestId = async (
   request: GetResponsesByRequestIdRequest
): Promise<ApiResponse<GetResponsesByRequestIdResponse[]>> => {
   return await apiGet<GetResponsesByRequestIdResponse[]>(PROFORMA_RESPONSE_ENDPOINTS.GET_ALL_RESPONSES_BY_REQUESTID(request.requestid))
}

export const updateStatusByClient = async (request: UpdateStatusByClientRequest): Promise<ApiResponse<UpdateStatusByClientResponse>> => {
   return await apiPut<UpdateStatusByClientResponse, UpdateStatusByClientRequest>(PROFORMA_RESPONSE_ENDPOINTS.UPDATE_STATUS_BY_CLIENT, request)
}
