import { RoleType } from "@/config/constants"

export interface RegisterRequest {
   role: RoleType
   email: string
   password: string
   username: string
   firstName: string
   lastName: string
   phone?: string
   city?: string
}

export interface RegisterResponse {
   accessToken: string
}
