import { getLocalStorageItem } from "@/app/lib/utils/localStorageData"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

// URL base de la API, obtenida desde las variables de entorno.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Instancia de Axios configurada con la URL base.
export const apiClient = axios.create({ baseURL: API_BASE_URL })

/**
 * Interceptor de solicitudes (request).
 * Agrega el token de acceso en los encabezados de cada solicitud si existe en `localStorage`.
 */
apiClient.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      const accessToken = getLocalStorageItem("accessToken")
      if (accessToken !== null) {
         config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
   },
   (error: AxiosError) => {
      return Promise.reject(error)
   }
)

/**
 * Interceptor de respuestas (response).
 * Maneja errores globales, como la expiración del token (401 Unauthorized).
 */
apiClient.interceptors.response.use(
   (response: AxiosResponse) => {
      return response
   },
   async (error: AxiosError) => {
      // Si la respuesta tiene un error 401 (no autorizado), intenta renovar el token.
      if (error.response?.status === 401) {
         const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

         // Evita múltiples intentos de renovación para la misma solicitud.
         if (originalRequest._retry) {
            return Promise.reject(error)
         }

         try {
            originalRequest._retry = true

            // TODO: Implementar la lógica para obtener un nuevo token llamando a la API.
            const refreshedAccessToken = await "llamar a la API para obtener un nuevo token"

            if (refreshedAccessToken) {
               // Agrega el nuevo token a los encabezados de la solicitud original.
               originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${refreshedAccessToken}`,
               }

               // Reintenta la solicitud original con el nuevo token.
               return await apiClient(originalRequest)
            }
         } catch (refreshError) {
            return Promise.reject(refreshError as AxiosError)
         }
      }

      return Promise.reject(error)
   }
)
