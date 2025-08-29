import { ApiResponse } from "@/data/dtos/api-response.types"
import { CreateVendorProfileRequest, CreateVendorProfileResponse } from "@/data/dtos/create-vendor-profile.types"
import { apiGet, apiPost } from "../api.client"
import { VENDOR_PROFILE_ENDPOINTS } from "@/config/endpoints"
import { GetAllProfilesByTokenResponse, GetTalentsRequest, GetTalentsResponse, GetVendorProfileByIdResponse } from "@/data/types/api/profiles.types"

export interface GetAllProfilesByTokenResponse {
   id: string
   firstName: string
   lastName: string
   bannerImage: string
   photo: string
   city: string
   title: string
}

export const fetchProfiles = async (accessToken?: string): Promise<ApiResponse<GetAllProfilesByTokenResponse[]>> => {
   return await apiGet<GetAllProfilesByTokenResponse[]>(VENDOR_PROFILE_ENDPOINTS.VENDOR_PROFILE_BY_ACCESS_TOKEN, {
      headers: { Authorization: `Bearer ${accessToken}` },
   })
}

export const fetchVendorProfilesByAccessToken = async (accessToken?: string): Promise<ApiResponse<GetAllProfilesByTokenResponse[]>> => {
   return await apiGet<GetAllProfilesByTokenResponse[]>(VENDOR_PROFILE_ENDPOINTS.VENDOR_PROFILE_BY_ACCESS_TOKEN, {
      headers: { Authorization: `Bearer ${accessToken}` },
   })
}

export const createVendorProfile = async (vendorProfile: CreateVendorProfileRequest): Promise<ApiResponse<CreateVendorProfileResponse>> => {
   return await apiPost<CreateVendorProfileResponse, CreateVendorProfileRequest>(VENDOR_PROFILE_ENDPOINTS.CREATE_VENDOR_PROFILE, vendorProfile)
}

export const fetchTalents = async (params: GetTalentsRequest): Promise<ApiResponse<GetTalentsResponse>> => {
   return await apiGet<GetTalentsResponse>(VENDOR_PROFILE_ENDPOINTS.GET_TALENTS, { params: { ...params } })
}

export const fetchVendorProfileById = async (id: string): Promise<ApiResponse<GetVendorProfileByIdResponse>> => {
   return await apiGet<GetVendorProfileByIdResponse>(VENDOR_PROFILE_ENDPOINTS.GET_TALENT_BY_ID(id))
}
