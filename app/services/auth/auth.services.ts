import { ApiResponse } from "@/app/types/api/api-response.types"
import { apiClient } from "../api/api.client"
import { mapAxiosErrorToApiResponse } from "@/app/services/api/api.error-adapter"
import { AxiosError } from "axios"
import { LoginRequest, LoginResponse } from "@/app/types/api/login.types"
import { RegisterRequest, RegisterResponse } from "@/app/types/api/register.types"
import { GetUserResponse } from "@/app/types/api/get-user.types"
import { CheckEmailExistsRequest, CheckEmailExistsResponse } from "@/app/types/api/check-email.types"
import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "@/app/types/api/check-username.types"

/**
 * Inicia sesión con credenciales locales.
 * @param credentials - Datos del usuario para autenticación.
 * @returns Respuesta de la API con la información del usuario autenticado.
 */
export const loginUser = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/authenticate/login", credentials)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

/**
 * Registra un nuevo usuario con credenciales locales.
 * @param userDetails - Datos del usuario a registrar.
 * @returns Respuesta de la APIClient con la información del usuario registrado.
 */
export const registerUser = async (userDetails: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<RegisterResponse>>("/authenticate/register", userDetails)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

/**
 * Obtiene la información del usuario autenticado.
 * @returns Datos del usuario si está autenticado.
 */
export const fetchAuthenticatedUser = async (): Promise<ApiResponse<GetUserResponse>> => {
   try {
      const { data } = await apiClient.get<ApiResponse<GetUserResponse>>("/authenticate/me")
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

/**
 * Verifica si un correo electrónico ya existe.
 * @param request - Datos del usuario para verificar el correo electrónico.
 * @returns Respuesta de la API con la información de la existencia del correo electrónico.
 */
export const checkEmailExists = async (request: CheckEmailExistsRequest): Promise<ApiResponse<CheckEmailExistsResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CheckEmailExistsResponse>>("/authenticate/check-email", request)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

/**
 * Verifica si un nombre de usuario ya existe.
 * @param request - Datos del usuario para verificar el nombre de usuario.
 * @returns Respuesta de la API con la información de la existencia del nombre de usuario.
 */
export const checkUsernameExists = async (request: CheckUsernameExistsRequest): Promise<ApiResponse<CheckUsernameExistsResponse>> => {
   try {
      const { data } = await apiClient.post<ApiResponse<CheckUsernameExistsResponse>>("/authenticate/check-username", request)
      return data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
