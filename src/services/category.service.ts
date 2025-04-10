import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"

export async function fetchCategoriesByGroupId(groupId: string): Promise<ApiResponse<GetCategoriesByGroupIdResponse[]>> {
   try {
      const { data } = await apiClient.get(`/category/${groupId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
