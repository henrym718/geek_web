import { create } from "zustand"
import { fetchAuthenticatedUser, logoutUser } from "../data/api/services/auth.service"
import { GetUserResponse } from "@/data/dtos/get-user.types"

interface State {
   user: GetUserResponse | null
   loadUser: () => Promise<void>
   logout: () => Promise<void>
   setUser: (userData: GetUserResponse) => void
}

export const useSessionDataStore = create<State>((set) => ({
   user: null,

   loadUser: async () => {
      const response = await fetchAuthenticatedUser()
      if (response.success) {
         set({ user: response.data })
      } else {
         set({ user: null })
      }
   },

   setUser: (userData: GetUserResponse) => set({ user: userData }),

   logout: async () => {
      await logoutUser()
      set({ user: null })
      window.location.replace("/")
   },
}))
