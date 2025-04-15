import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"
import { apiGet } from "../api.client"
import { CATEGORY_ENDPOINTS } from "@/config/constants"

export async function fetchCategoriesByGroupId(groupId: string): Promise<ApiResponse<GetCategoriesByGroupIdResponse[]>> {
   return await apiGet<GetCategoriesByGroupIdResponse[]>(CATEGORY_ENDPOINTS.CATEGORIES_BY_GROUP_ID(groupId))
}
