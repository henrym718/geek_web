import { ApiResponse } from "@/data/dtos/api-response.types"
import { apiClient } from "@/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { LoginRequest, LoginResponse } from "@/data/dtos/login.types"
import { RegisterRequest, RegisterResponse } from "@/data/dtos/register.types"
import { GetUserResponse } from "@/data/dtos/get-user.types"
import { CheckEmailExistsRequest, CheckEmailExistsResponse } from "@/data/dtos/check-email.types"
import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "@/data/dtos/check-username.types"

export async function getAccessTokenFromApi(): Promise<string | null> {
   const res = await fetch("/api/token")
   const data = await res.json()
   return data.token ?? null
}

export const loginUser = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/authenticate/login", credentials)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const registerUser = async (userDetails: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<RegisterResponse>>("/authenticate/register", userDetails)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const fetchAuthenticatedUser = async (): Promise<ApiResponse<GetUserResponse>> => {
   try {
      const { data } = await apiClient.get<ApiResponse<GetUserResponse>>("/authenticate/me")
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const checkEmailExists = async (request: CheckEmailExistsRequest): Promise<ApiResponse<CheckEmailExistsResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CheckEmailExistsResponse>>("/authenticate/check-email", request)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export const checkUsernameExists = async (request: CheckUsernameExistsRequest): Promise<ApiResponse<CheckUsernameExistsResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CheckUsernameExistsResponse>>("/authenticate/check-username", request)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
