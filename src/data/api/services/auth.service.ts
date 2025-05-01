import { ApiResponse } from "@/data/dtos/api-response.types"
import { LoginRequest, LoginResponse } from "@/data/dtos/login.types"
import { RegisterRequest, RegisterResponse } from "@/data/dtos/register.types"
import { GetUserResponse } from "@/data/dtos/get-user.types"
import { CheckEmailExistsRequest, CheckEmailExistsResponse } from "@/data/dtos/check-email.types"
import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "@/data/dtos/check-username.types"
import { apiGet, apiPost } from "@/data/api/api.client"
import { AUTH_ENDPOINTS } from "@/config/endpoints"
import { LogoutResponse } from "@/data/types/api/auth.types"

export const loginUser = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
   return await apiPost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, credentials)
}

export const registerUser = async (userDetails: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
   return await apiPost<RegisterResponse, RegisterRequest>(AUTH_ENDPOINTS.REGISTER, userDetails)
}

export const fetchAuthenticatedUser = async (): Promise<ApiResponse<GetUserResponse>> => {
   return await apiGet<GetUserResponse>(AUTH_ENDPOINTS.CURRENT_USER)
}

export const checkEmailExists = async (request: CheckEmailExistsRequest): Promise<ApiResponse<CheckEmailExistsResponse>> => {
   return await apiPost<CheckEmailExistsResponse, CheckEmailExistsRequest>(AUTH_ENDPOINTS.CHECK_EMAIL, request)
}

export const checkUsernameExists = async (request: CheckUsernameExistsRequest): Promise<ApiResponse<CheckUsernameExistsResponse>> => {
   return await apiPost<CheckUsernameExistsResponse, CheckUsernameExistsRequest>(AUTH_ENDPOINTS.CHECK_USERNAME, request)
}

export const logoutUser = async (): Promise<ApiResponse<LogoutResponse>> => {
   return await apiGet<LogoutResponse>(AUTH_ENDPOINTS.LOGOUT)
}
