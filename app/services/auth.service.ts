import { ApiResponse } from "@/app/data/dtos/api-response.types"
import { apiClient } from "@/app/lib/api/api.client"
import { mapAxiosErrorToApiResponse } from "@/app/lib/api/api.error-adapter"
import { AxiosError } from "axios"
import { LoginRequest, LoginResponse } from "@/app/data/dtos/login.types"
import { RegisterRequest, RegisterResponse } from "@/app/data/dtos/register.types"
import { GetUserResponse } from "@/app/data/dtos/get-user.types"
import { CheckEmailExistsRequest, CheckEmailExistsResponse } from "@/app/data/dtos/check-email.types"
import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "@/app/data/dtos/check-username.types"

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
