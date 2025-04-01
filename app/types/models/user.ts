export interface User {
   id: string
   email: string
   role: string
   profileCompleted: boolean
   createdAt: Date
   updatedAt: Date | null
   isActive: boolean
}
