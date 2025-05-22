// src/stores/registration-wizard.store.ts
import { create } from "zustand"
import { RoleType } from "@/config/constants"

interface State {
   role: RoleType | undefined
   step: number
   isLoading: boolean
   setRole: (role: RoleType) => void
   nextStep: () => void
   prevStep: () => void
   reset: () => void
   setIsLoading: (isLoading: boolean) => void
}

export const useRegisterWizard = create<State>((set) => ({
   role: undefined,
   step: 1,
   isLoading: false,
   setRole: (role) => set({ role }),
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   prevStep: () => set((state) => ({ step: state.step - 1 })),
   reset: () => set({ role: undefined, step: 1 }),
   setIsLoading: (isLoading) => set({ isLoading }),
}))
