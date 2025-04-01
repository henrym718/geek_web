import { registerUser } from "@/app/services/auth/auth.services"
import { useRolStore } from "@/app/stores/auth/role.store"
import { RoleType } from "../../constants/auth.constants"
import { useAuthStore } from "@/app/stores/common/auth.store"
import { setLocalStorageItem } from "../../utils/localStorageData"
import { RegisterType } from "../../validation/register.schema"

export const handleRegister = async (prevState: { success: boolean; error: string | null } | null, formData: RegisterType) => {
   const { email, password, firstName, lastName, city, phone } = formData
   const { role: roleStore, clearRoleData } = useRolStore.getState()
   await new Promise((resolve) => setTimeout(resolve, 1000))
   const response = await registerUser({ email, password, firstName, lastName, city: city.label, phone, role: roleStore as RoleType })
   if (response.success) {
      setLocalStorageItem("accessToken", response.data.accessToken)
      useAuthStore.getState().loadUser()
      clearRoleData()
      return { success: true, error: null }
   }
   return { success: false, error: response.message }
}
