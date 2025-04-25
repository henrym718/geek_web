export interface GetChatsByUserIdResponse {
   chats: { id: string }
   client: { id: string; fullName: string; image: string }
   vendor: { id: string; fullName: string; image: string }
}
