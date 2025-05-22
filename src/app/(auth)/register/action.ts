import { AUTH_FORM, RoleType } from "@/config/constants"
import { useRegistrationStore } from "@/stores/use-registration.store"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { registerUser } from "@/data/api/services/auth.service"
import { setLocalStorageItem } from "@/lib/utils/localStorageData"
import { RegisterType } from "@/data/schemas/register.schema"

export const registerAction = async (prevState: { success: boolean; error: string | null } | null, formData: RegisterType) => {
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

export const roleAction = async (previousState: FormData | null, formData: RoleType) => {
   const role = formData
   useRegistrationStore.getState().setRole(role)
   useRegistrationStore.getState().setForm(AUTH_FORM.REGISTER)
   return null
}
