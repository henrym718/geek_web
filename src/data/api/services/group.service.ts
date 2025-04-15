import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetAllGroupsResponse } from "@/data/dtos/gett-all-groups"
import { apiGet } from "../api.client"
import { GROUP_ENDPOINTS } from "@/config/constants"

export async function fetchAllGroups(): Promise<ApiResponse<GetAllGroupsResponse[]>> {
   return await apiGet<GetAllGroupsResponse[]>(GROUP_ENDPOINTS.ALL_GROUPS)
}
