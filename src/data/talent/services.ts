import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiGet, apiPost } from "../api/api.client"
import {
   CreateTalentProfileRequest,
   CreateTalentProfileResponse,
   GetTalentsRequest,
   GetTalentsResponse,
   GetVendorProfileByIdResponse,
   TalentProfile,
} from "./dto"

export const fetchOwnerProfiles = async (accessToken?: string): Promise<ApiResponse<TalentProfile[]>> => {
   return await apiGet<TalentProfile[]>("/vendor-profile/access-token", {
      headers: { Authorization: `Bearer ${accessToken}` },
   })
}

export const createVendorProfile = async (vendorProfile: CreateTalentProfileRequest): Promise<ApiResponse<CreateTalentProfileResponse>> => {
   return await apiPost<CreateTalentProfileResponse, CreateTalentProfileRequest>("/vendor-profile", vendorProfile)
}

export const fetchTalents = async (params: GetTalentsRequest): Promise<ApiResponse<GetTalentsResponse>> => {
   return await apiGet<GetTalentsResponse>("/vendor-profile/talents", { params: { ...params } })
}

export const fetchVendorProfileById = async (id: string): Promise<ApiResponse<GetVendorProfileByIdResponse>> => {
   return await apiGet<GetVendorProfileByIdResponse>(`/vendor-profile/talent/${id}`)
}
