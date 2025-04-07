import { ApiResponse } from "@/app/data/dtos/api-response.types"
import { apiClient } from "@/app/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/app/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { GetCategoriesByGroupIdResponse } from "@/app/data/dtos/get-categories-by-groupId"

export async function fetchCategoriesByGroupId(groupId: string): Promise<ApiResponse<GetCategoriesByGroupIdResponse[]>> {
   try {
      const { data } = await apiClient.get(`/category/${groupId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
