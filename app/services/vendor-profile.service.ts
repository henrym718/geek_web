import { ApiResponse } from "@/app/data/dtos/api-response.types"
import { apiClient } from "@/app/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/app/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetVendorProfileResponse } from "@/app/data/dtos/get-vendor-profile"
import { CreateVendorProfileRequest, CreateVendorProfileResponse } from "@/app/data/dtos/create-vendor-profile.types"

export const fetchVendorProfilesByAccessToken = async (accessToken: string): Promise<ApiResponse<GetVendorProfileResponse[]>> => {
   try {
      // Incluyendo el token manualmente en los headers
      const { data } = await apiClient.get<ApiResponse<GetVendorProfileResponse[]>>("/vendor-profile/me", {
         headers: {
            Authorization: `Bearer ${accessToken}`, // Agregamos el token en las cabeceras
         },
      })

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
