import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiGet } from "../api.client"
import { Suggestion } from "@/data/types/models/models"
import { SUGGESTION_ENDPOINTS } from "@/config/endpoints"

export const fecthSuggestions = async (): Promise<ApiResponse<Suggestion[]>> => {
   return await apiGet<Suggestion[]>(SUGGESTION_ENDPOINTS.SUGGESTIONS)
}
