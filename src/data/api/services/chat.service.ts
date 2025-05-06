import { CreateChatRequest, CreateChatResponse, GetChatsByUserIdResponse } from "@/data/types/api/chat.types"
import { apiGet, apiPost } from "../api.client"
import { CHAT_ENDPOINTS } from "@/config/endpoints"
import { ApiResponse } from "@/data/dtos/api-response.types"

export async function fecthChatsByAccessToken(): Promise<ApiResponse<GetChatsByUserIdResponse[]>> {
   return await apiGet<GetChatsByUserIdResponse[]>(CHAT_ENDPOINTS.GET_CHATS_BY_ACCESS_TOKEN)
}

export async function createChat(data: CreateChatRequest): Promise<ApiResponse<CreateChatResponse>> {
   return await apiPost<CreateChatResponse, CreateChatRequest>(CHAT_ENDPOINTS.CREATE_CHAT, data)
}
