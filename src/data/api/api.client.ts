import { ApiResponse, FailureApiResponse } from "@/data/types/api/common"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const apiClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true })

// Interceptor para tokens
apiClient.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      return config
   },
   (error: AxiosError) => {
      return Promise.reject(error)
   }
)

apiClient.interceptors.response.use(
   (response: AxiosResponse) => {
      return response
   },
   async (error: AxiosError) => {
      if (error.response?.status === 401) {
         const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

         if (originalRequest._retry) {
            return Promise.reject(error)
         }

         try {
            originalRequest._retry = true

            const refreshedAccessToken = await "llamar a la API para obtener un nuevo token"

            if (refreshedAccessToken) {
               originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${refreshedAccessToken}`,
               }

               return await apiClient(originalRequest)
            }
         } catch (refreshError) {
            return Promise.reject(refreshError as AxiosError)
         }
      }

      return Promise.reject(error)
   }
)

//

const isServerError = (error: unknown): error is FailureApiResponse => {
   return (
      typeof error === "object" &&
      error !== null &&
      "success" in error &&
      "message" in error &&
      (error as FailureApiResponse).success === false &&
      typeof (error as FailureApiResponse).message === "string"
   )
}

export const mapAxiosErrorToApiResponse = (error: AxiosError): ApiResponse<never> => {
   let message = "La solicitud no se pudo completar"
   const success = false

   if (error.response && isServerError(error.response.data)) {
      message = error.response.data.message
   } else if (error.request) {
      message = "El servidor no respondió"
   }

   return { success, message }
}

// Métodos CRUD genéricos
export async function apiGet<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
   try {
      const response = await apiClient.get<ApiResponse<T>>(endpoint, { ...config })
      return response.data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export async function apiPost<T, D>(endpoint: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
   try {
      const response = await apiClient.post<ApiResponse<T>>(endpoint, data, { ...config })
      return response.data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export async function apiPut<T, D>(endpoint: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
   try {
      const response = await apiClient.put<ApiResponse<T>>(endpoint, data, { ...config })
      return response.data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}

export async function apiDelete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
   try {
      const response = await apiClient.delete<ApiResponse<T>>(endpoint, { ...config })
      return response.data
   } catch (error) {
      return mapAxiosErrorToApiResponse(error as AxiosError)
   }
}
