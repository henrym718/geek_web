export interface GetChatsByUserIdResponse {
   chats: { id: string }
   client: { id: string; fullName: string; image: string }
   vendor: { id: string; fullName: string; image: string }
}

export interface CreateChatRequest {
   clientId: string
   vendorId: string
}
export interface CreateChatResponse {
   charId: string
}
