import { ApiResponse } from "@/app/types/dtos/api-response.types"
import { GetAllGroupsResponse } from "@/app/types/dtos/gett-all-groups"
import { apiClient } from "../api/api.client"
import { AxiosError } from "axios"
import { mapAxiosErrorToApiResponse } from "../api/api.error-adapter"

export async function getAllGroups(): Promise<ApiResponse<GetAllGroupsResponse[]>> {
   try {
      const { data } = await apiClient.get("/group")
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
