import { AxiosError } from "axios"
import { ApiResponse, FailureApiResponse } from "../../types/dtos/api-response.types"

/**
 * Verifica si el error recibido proviene del servidor y cumple con la estructura esperada.
 * @param error - Objeto de error recibido en la respuesta de la API.
 * @returns `true` si el error tiene un formato esperado, `false` en caso contrario.
 */
const isServerError = (error: unknown): error is FailureApiResponse => {
   return error?.success === false && typeof error?.message === "string"
}

/**
 * Adapta un error de Axios a un formato estandarizado de respuesta de API.
 * @param error - Error capturado en la solicitud HTTP.
 * @returns Un objeto `ApiResponse` con el mensaje de error correspondiente.
 */
export const mapAxiosErrorToApiResponse = (error: AxiosError): ApiResponse<never> => {
   // Si la API responde con un error estructurado, lo adaptamos.
   if (error.response && isServerError(error.response.data)) {
      return {
         success: false,
         message: error.response.data.message,
      }
   }

   // Si el error ocurre debido a una falla en la conexión (sin respuesta del servidor).
   if (error.request) {
      return {
         success: false,
         message: "Error de conexión con el servidor",
      }
   }

   // Error genérico en caso de que no se pueda determinar la causa exacta.
   return {
      success: false,
      message: "Error desconocido",
   }
}
