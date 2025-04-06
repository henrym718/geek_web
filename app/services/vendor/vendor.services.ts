// getVendorProfiles.ts

import { apiClient } from "../api/api.client"
import { ApiResponse } from "@/app/types/dtos/api-response.types"
import { AxiosError } from "axios"
import { mapAxiosErrorToApiResponse } from "../api/api.error-adapter"
import { GetVendorProfileResponse } from "@/app/types/dtos/get-vendor-profile"
import { CreateVendorProfileRequest, CreateVendorProfileResponse } from "@/app/types/dtos/create-vendor-profile.types"

// Esta función obtiene el perfil del vendedor
export const getVendorProfiles = async (accessToken: string): Promise<ApiResponse<GetVendorProfileResponse[]>> => {
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
