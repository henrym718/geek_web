import { loginUser } from "@/app/services/auth/auth.services"
import { LoginType } from "../../validation/login.schema"
import { setLocalStorageItem } from "../../utils/localStorageData"
import { useAuthStore } from "@/app/stores/global/auth.store"

export const handleLogin = async (previousState: { success: boolean; error: string }, formData: LoginType) => {
   const email = formData.email
   const password = formData.password

   await new Promise((resolve) => setTimeout(resolve, 1000))
   const response = await loginUser({ email, password })

   if (response.success) {
      setLocalStorageItem("accessToken", response.data.accessToken)
      await useAuthStore.getState().loadUser()
      return { success: true, error: "" }
   }

   return { success: false, error: response.message }
}
