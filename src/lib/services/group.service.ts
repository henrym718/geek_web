import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetAllGroupsResponse } from "@/data/dtos/gett-all-groups"

export async function fetchAllGroups(): Promise<ApiResponse<GetAllGroupsResponse[]>> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const { data } = await apiClient.get<ApiResponse<GetAllGroupsResponse[]>>("/group")
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
