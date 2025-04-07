import { registerUser } from "@/app/services/auth.service"
import { useRegistrationStore } from "@/app/stores/use-registration.store"
import { RoleType } from "../../constants/auth.constants"
import { useSessionDataStore } from "@/app/stores/user-session-data.store"
import { setLocalStorageItem } from "../../utils/localStorageData"
import { RegisterType } from "@/app/data/schemas/register.schema"

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
