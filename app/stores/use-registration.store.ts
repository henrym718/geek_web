// src/stores/registration-wizard.store.ts
import { create } from "zustand"
import { AuthFormType, AUTH_FORM, RoleType } from "@/app/lib/constants/auth.constants"

interface State {
   currentForm: AuthFormType
   role: RoleType | undefined
   setForm: (formName: AuthFormType) => void
   setRole: (role: RoleType) => void
   reset: () => void
}

export const useRegistrationStore = create<State>((set) => ({
   currentForm: AUTH_FORM.ROLE,
   role: undefined,
   setForm: (formName) => set({ currentForm: formName }),
   setRole: (role) => set({ role }),
   reset: () => set({ currentForm: AUTH_FORM.ROLE, role: undefined }),
}))
