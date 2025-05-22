import { ApiResponse } from "@/data/dtos/api-response.types"
import { City } from "@/data/types/models/models"
import { apiGet } from "../api.client"
import { CITY_ENDPOINTS } from "@/config/endpoints"

export const fetchAllCities = async (): Promise<ApiResponse<City[]>> => {
   return await apiGet<City[]>(CITY_ENDPOINTS.ALL_CITIES)
}
