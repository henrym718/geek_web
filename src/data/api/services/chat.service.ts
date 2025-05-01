import { GetChatsByUserIdResponse } from "@/data/types/api/chat.types"
import { apiGet } from "../api.client"
import { CHAT_ENDPOINTS } from "@/config/endpoints"
import { ApiResponse } from "@/data/dtos/api-response.types"

export async function fecthChatsByAccessToken(): Promise<ApiResponse<GetChatsByUserIdResponse[]>> {
   return await apiGet<GetChatsByUserIdResponse[]>(CHAT_ENDPOINTS.GET_CHATS_BY_ACCESS_TOKEN)
}
