import { AxiosError } from "axios"
import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { GetSkillsByCategoryIdRequest, GetSkillsByCategoryIdResponse } from "../../data/dtos/get-skills-by-categoryId"

export async function fetchSkillsByCategoryId(request: GetSkillsByCategoryIdRequest): Promise<ApiResponse<GetSkillsByCategoryIdResponse[]>> {
   try {
      const { data } = await apiClient.get<ApiResponse<GetSkillsByCategoryIdResponse[]>>(`/skill/${request.categoryId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
