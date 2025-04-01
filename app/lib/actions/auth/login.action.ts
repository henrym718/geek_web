import { useAuthStore } from "@/app/stores/common/auth.store"
import { loginUser } from "@/app/services/auth/auth.services"
import { setLocalStorageItem } from "../../utils/localStorageData"

/**
 * Maneja la acción de inicio de sesión del usuario.
 * @param previousState - Estado anterior del formulario.
 * @param formData - Datos del formulario con email y contraseña.
 * @returns Un objeto indicando si hubo un error en la autenticación.
 */
export const handleLogin = async (previousState: any, formData: FormData) => {
   const email = formData.get("email") as string
   const password = formData.get("password") as string

   const authResponse = await loginUser({ email, password })

   // Simulación de retraso (1s) para mejorar UX en el login
   await new Promise((resolve) => setTimeout(resolve, 1000))

   if (authResponse.success) {
      useAuthStore.getState().setUser(authResponse.data)
      setLocalStorageItem("accessToken", authResponse.data.accessToken)
      return { error: false }
   }

   return { error: authResponse.message, email, password }
}
