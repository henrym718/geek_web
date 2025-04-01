import { create } from "zustand"
import { fetchAuthenticatedUser } from "@/app/services/auth/auth.services"
import { GetUserResponse } from "@/app/types/api/get-user.types"

interface AuthStore {
   user: GetUserResponse | null
   loadUser: () => Promise<boolean>
   logout: () => void
   setUser: (userData: GetUserResponse) => void
}

/**
 * Hook de Zustand para manejar los datos de authentication de usuario.
 */
export const useAuthStore = create<AuthStore>((set) => ({
   user: null,

   /**
    * Carga la información del usuario autenticado desde la API.
    * @returns {Promise<boolean>} - `true` si el usuario se carga correctamente, `false` si falla.
    */
   loadUser: async () => {
      const response = await fetchAuthenticatedUser()
      if (response.success) {
         set({ user: response.data })
         return true
      } else {
         set({ user: null })
         return false
      }
   },

   /**
    * Establece manualmente la información del usuario en el store.
    * @param userData - Datos del usuario autenticado.
    */
   setUser: (userData: GetUserResponse) => set({ user: userData }),

   /**
    * Cierra sesión limpiando la información del usuario.
    */
   logout: () => set({ user: null }),
}))
