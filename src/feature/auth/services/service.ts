import { ApiResponse } from "@/data/dtos/api-response.types"
import {
   LoginRequest,
   LoginResponse,
   RegisterRequest,
   RegisterResponse,
   GetUserResponse,
   CheckEmailExistsRequest,
   CheckEmailExistsResponse,
   CheckUsernameExistsRequest,
   CheckUsernameExistsResponse,
   LogoutResponse,
} from "./types"
import { apiGet, apiPost } from "@/data/api/api.client"
import { authEndpoints } from "./endpoints"

export const loginUser = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
   return await apiPost<LoginResponse, LoginRequest>(authEndpoints.login, credentials)
}

export const registerUser = async (userDetails: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
   return await apiPost<RegisterResponse, RegisterRequest>(authEndpoints.register, userDetails)
}

export const fetchAuthenticatedUser = async (): Promise<ApiResponse<GetUserResponse>> => {
   return await apiGet<GetUserResponse>(authEndpoints.currentUser)
}

export const checkEmailExists = async (request: CheckEmailExistsRequest): Promise<ApiResponse<CheckEmailExistsResponse>> => {
   return await apiPost<CheckEmailExistsResponse, CheckEmailExistsRequest>(authEndpoints.checkEmail, request)
}

export const checkUsernameExists = async (request: CheckUsernameExistsRequest): Promise<ApiResponse<CheckUsernameExistsResponse>> => {
   return await apiPost<CheckUsernameExistsResponse, CheckUsernameExistsRequest>(authEndpoints.checkUsername, request)
}

export const logoutUser = async (): Promise<ApiResponse<LogoutResponse>> => {
   return await apiGet<LogoutResponse>(authEndpoints.logout)
}
