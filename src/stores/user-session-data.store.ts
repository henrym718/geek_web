import { create } from "zustand"
import { fetchAuthenticatedUser } from "../lib/services/auth.service"
import { GetUserResponse } from "@/data/dtos/get-user.types"

interface State {
   user: GetUserResponse | null
   loadUser: () => Promise<void>
   logout: () => void
   setUser: (userData: GetUserResponse) => void
}

/**
 * Hook de Zustand para manejar los datos de authentication de usuario.
 */
export const useSessionDataStore = create<State>((set) => ({
   user: null,

   /**
    * Carga la información del usuario autenticado desde la API.
    * @returns {Promise<boolean>} - `true` si el usuario se carga correctamente, `false` si falla.
    */
   loadUser: async () => {
      const response = await fetchAuthenticatedUser()
      if (response.success) {
         set({ user: response.data })
      } else {
         set({ user: null })
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
