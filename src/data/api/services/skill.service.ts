import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetSkillsByCategoryIdRequest, GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { apiGet } from "../api.client"
import { SKILL_ENDPOINTS } from "@/config/constants"

export async function fetchSkillsByCategoryId(request: GetSkillsByCategoryIdRequest): Promise<ApiResponse<GetSkillsByCategoryIdResponse[]>> {
   return await apiGet<GetSkillsByCategoryIdResponse[]>(SKILL_ENDPOINTS.SKILLS_BY_CATEGORY_ID(request.categoryId))
}
