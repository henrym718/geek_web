import { VendorProfile } from "../models/vendor"
import { Client } from "../models/client"
import { User } from "../models/user"

export interface LoginRequest {
   email: string
   password: string
}
export interface LoginResponse {
   user: User
   clientProfile?: Client
   vendorProfile?: VendorProfile
   accessToken: string
}
