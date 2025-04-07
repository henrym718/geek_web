import { ApiResponse } from "@/app/data/dtos/api-response.types"
import { apiClient } from "@/app/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/app/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetAllGroupsResponse } from "@/app/data/dtos/gett-all-groups"

export async function fetchAllGroups(): Promise<ApiResponse<GetAllGroupsResponse[]>> {
   try {
      const { data } = await apiClient.get<ApiResponse<GetAllGroupsResponse[]>>("/group")
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
