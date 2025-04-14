import { create } from "zustand"

interface CreateRequestStepHandlerStore {
   step: number
   totalSteps: number
   nextStep: () => void
   previousStep: () => void
   resetStep: () => void
}

export const useCreateRequestStepHandlerStore = create<CreateRequestStepHandlerStore>((set) => ({
   step: 1,
   totalSteps: 7,
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   previousStep: () => set((state) => ({ step: state.step - 1 })),
   resetStep: () => set({ step: 1 }),
}))
