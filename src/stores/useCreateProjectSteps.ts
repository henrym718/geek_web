import { create } from "zustand"

interface State {
   step: number
   totalSteps: number
   nextStep: () => void
   previousStep: () => void
   resetStep: () => void
}

export const useCreateProjectSteps = create<State>((set) => ({
   step: 1,
   totalSteps: 6,
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   previousStep: () => set((state) => ({ step: state.step - 1 })),
   resetStep: () => set({ step: 1 }),
}))
