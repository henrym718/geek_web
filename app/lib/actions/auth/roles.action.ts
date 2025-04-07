import { AUTH_FORM, RoleType } from "../../constants/auth.constants"
import { useRegistrationStore } from "@/app/stores/use-registration.store"

export const handleRoles = async (previousState: FormData | null, formData: RoleType) => {
   const role = formData
   useRegistrationStore.getState().setRole(role)
   useRegistrationStore.getState().setForm(AUTH_FORM.REGISTER)
   return null
}
