// src/data/types/auth.types.ts

import { Client, User, Vendor } from "../models/models"

export interface RegisterLocalRequest {
   role: string
   email: string
   password: string
   firstName: string
   lastName: string
   city: string
   phone: string
   photo?: string
   username: string
}

export interface RegisterLocalResponse {
   accessToken: string
}

export interface LoginRequest {
   email: string
   password: string
}

export interface LoginResponse {
   accessToken: string
}

export interface GetCurrentAccountRequest {
   email: string
}

export interface GetCurrentAccountResponse {
   user: User
   client?: Client
   vendor?: Vendor
}

export interface CheckUsernameExistsRequest {
   username: string
}

export interface CheckUsernameExistsResponse {
   exists: boolean
}

export interface CheckEmailExistsRequest {
   email: string
}

export interface CheckEmailExistsResponse {
   exists: boolean
}

export interface LogoutResponse {
   details: string
}
