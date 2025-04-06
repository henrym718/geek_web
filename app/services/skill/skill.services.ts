import { GetSkillsByCategoryIdRequest, GetSkillsByCategoryIdResponse } from "@/app/types/dtos/get-skills-by-categoryId"
import { apiClient } from "../api/api.client"
import { mapAxiosErrorToApiResponse } from "../api/api.error-adapter"
import { AxiosError } from "axios"
import { ApiResponse } from "@/app/types/dtos/api-response.types"

export async function getSkillsByCategoryId(request: GetSkillsByCategoryIdRequest): Promise<ApiResponse<GetSkillsByCategoryIdResponse[]>> {
   try {
      const { data } = await apiClient.get<ApiResponse<GetSkillsByCategoryIdResponse[]>>(`/skill/${request.categoryId}`)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
