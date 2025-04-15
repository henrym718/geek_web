import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetVendorProfileResponse } from "@/data/dtos/get-vendor-profile"
import { CreateVendorProfileRequest, CreateVendorProfileResponse } from "@/data/dtos/create-vendor-profile.types"
import { apiGet, apiPost } from "../api.client"
import { VENDOR_PROFILE_ENDPOINTS } from "@/config/constants"

export const fetchVendorProfilesByAccessToken = async (): Promise<ApiResponse<GetVendorProfileResponse[]>> => {
   return await apiGet<GetVendorProfileResponse[]>(VENDOR_PROFILE_ENDPOINTS.VENDOR_PROFILE_BY_ACCESS_TOKEN)
}

export const createVendorProfile = async (vendorProfile: CreateVendorProfileRequest): Promise<ApiResponse<CreateVendorProfileResponse>> => {
   return await apiPost<CreateVendorProfileResponse, CreateVendorProfileRequest>(VENDOR_PROFILE_ENDPOINTS.CREATE_VENDOR_PROFILE, vendorProfile)
}
