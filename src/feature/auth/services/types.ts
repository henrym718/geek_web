// src/data/types/auth.types.ts

import { RoleType } from "@/config/constants"
import { Client, User, Vendor } from "@/data/types/models/models"

// Login
export interface LoginRequest {
   email: string
   password: string
}
export interface LoginResponse {
   accessToken: string
}

// Register
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

// Get Current Account
export interface GetUserResponse {
   user: User
   client?: Client
   vendor?: Vendor
}

// Check email Exists
export interface CheckEmailExistsRequest {
   email: string
}
export interface CheckEmailExistsResponse {
   exists: boolean
}

// Check username Exists
export interface CheckUsernameExistsRequest {
   username: string
}

export interface CheckUsernameExistsResponse {
   exists: boolean
}

// Logout
export interface LogoutResponse {
   details: string
}
