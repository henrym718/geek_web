import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"
import { PROFORMA_REQUEST_ENDPOINTS } from "@/config/constants"
import { apiGet } from "../api.client"

export async function fetchProformaRequestByProfileId(vendorProfileId: string): Promise<ApiResponse<GetRequestByProfileIdResponse[]>> {
   return await apiGet<GetRequestByProfileIdResponse[]>(PROFORMA_REQUEST_ENDPOINTS.PROFORMA_REQUEST_BY_VENDOR_PROFILE_ID(vendorProfileId))
}
