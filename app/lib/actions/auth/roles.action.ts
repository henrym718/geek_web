import { useRolStore } from "@/app/stores/auth/role.store"
import { AUTH_FORM, RoleType } from "../../constants/auth.constants"
import { useRegistrationFormStore } from "@/app/stores/auth/registrationFormStore"

export const handleRoles = async (previousState: FormData | null, formData: RoleType) => {
   const role = formData
   useRolStore.getState().setRoleData(role)
   useRegistrationFormStore.getState().setForm(AUTH_FORM.REGISTER)
   return null
}
