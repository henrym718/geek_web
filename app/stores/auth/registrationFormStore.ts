import { AuthFormType, AUTH_FORM } from "@/app/lib/constants/auth.constants"
import { create } from "zustand"

interface State {
   currentForm: AuthFormType
   setForm(formName: AuthFormType): void
}

export const useRegistrationFormStore = create<State>((set) => ({
   currentForm: AUTH_FORM.ROLE,
   setForm: (formName: AuthFormType) => set({ currentForm: formName }),
}))
