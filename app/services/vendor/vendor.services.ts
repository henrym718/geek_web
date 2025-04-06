// getVendorProfiles.ts

import { apiClient } from "../api/api.client"
import { ApiResponse } from "@/app/types/dtos/api-response.types"
import { AxiosError } from "axios"
import { mapAxiosErrorToApiResponse } from "../api/api.error-adapter"
import { GetVendorProfileResponse } from "@/app/types/dtos/get-vendor-profile"

// Esta función obtiene el perfil del vendedor
export const getVendorProfiles = async (accessToken: string): Promise<ApiResponse<GetVendorProfileResponse[]>> => {
   try {
      // Incluyendo el token manualmente en los headers
      const response = await apiClient.get("/vendor-profile/me", {
         headers: {
            Authorization: `Bearer ${accessToken}`, // Agregamos el token en las cabeceras
         },
      })

      return response.data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
