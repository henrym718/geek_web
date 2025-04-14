import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetVendorProfileResponse } from "@/data/dtos/get-vendor-profile"
import { CreateVendorProfileRequest, CreateVendorProfileResponse } from "@/data/dtos/create-vendor-profile.types"

export const fetchVendorProfilesByAccessToken = async (): Promise<ApiResponse<GetVendorProfileResponse[]>> => {
   try {
      // Incluyendo el token manualmente en los headers
      const { data } = await apiClient.get<ApiResponse<GetVendorProfileResponse[]>>("/vendor-profile/me", {})

      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const createVendorProfile = async (vendorProfile: CreateVendorProfileRequest): Promise<ApiResponse<CreateVendorProfileResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CreateVendorProfileResponse>>("/vendor-profile", vendorProfile)

      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
