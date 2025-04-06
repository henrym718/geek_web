import { create } from "zustand"

interface State {
   step: number
   totalSteps: number
   nextStep: () => void
   previousStep: () => void
}

export const useWizardCreateProfileStepHandlerStore = create<State>((set) => ({
   step: 1,
   totalSteps: 4,
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   previousStep: () => set((state) => ({ step: state.step - 1 })),
}))
