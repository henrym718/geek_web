import { AxiosError } from "axios"
import { mapAxiosErrorToApiResponse } from "../api/api.error-adapter"
import { ApiResponse } from "@/app/types/dtos/api-response.types"
import { GetCategoriesByGroupIdResponse } from "@/app/types/dtos/get-categories-by-groupId"
import { apiClient } from "../api/api.client"

export async function getCategoriesByGroupId(groupId: string): Promise<ApiResponse<GetCategoriesByGroupIdResponse[]>> {
   try {
      const { data } = await apiClient.get(`/category/${groupId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
