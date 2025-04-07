import { loginUser } from "@/app/services/auth.service"
import { LoginType } from "@/app/data/schemas/login.schema"
import { setLocalStorageItem } from "../../utils/localStorageData"
import { useSessionDataStore } from "@/app/stores/user-session-data.store"

export const handleLogin = async (previousState: { success: boolean; error: string }, formData: LoginType) => {
   const email = formData.email
   const password = formData.password

   await new Promise((resolve) => setTimeout(resolve, 1000))
   const response = await loginUser({ email, password })

   if (response.success) {
      setLocalStorageItem("accessToken", response.data.accessToken)
      await useSessionDataStore.getState().loadUser()
      return { success: true, error: "" }
   }

   return { success: false, error: response.message }
}
