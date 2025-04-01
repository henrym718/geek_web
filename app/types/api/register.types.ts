import { RoleType } from "@/app/lib/constants/auth.constants"

export interface RegisterRequest {
   role: RoleType
   email: string
   password: string
   firstName: string
   lastName: string
   phone?: string
   city?: string
}

export interface RegisterResponse {
   accessToken: string
}
