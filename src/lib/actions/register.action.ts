import { RoleType } from "../constants/auth.constants"
import { useRegistrationStore } from "@/stores/use-registration.store"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { registerUser } from "@/lib/services/auth.service"
import { setLocalStorageItem } from "../utils/localStorageData"
import { RegisterType } from "@/data/schemas/register.schema"

export const handleRegister = async (prevState: { success: boolean; error: string | null } | null, formData: RegisterType) => {
   const { email, password, firstName, lastName, city, phone, username } = formData
   const { role: roleStore, reset } = useRegistrationStore.getState()
   await new Promise((resolve) => setTimeout(resolve, 1000))
   const response = await registerUser({
      email,
      password,
      username,
      firstName,
      lastName,
      city: city.label,
      phone,
      role: roleStore as RoleType,
   })
   if (response.success) {
      setLocalStorageItem("accessToken", response.data.accessToken)
      await useSessionDataStore.getState().loadUser()
      reset()
      return { success: true, error: null }
   }
   return { success: false, error: response.message }
}
