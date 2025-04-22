import { create } from "zustand"

interface State {
   requestid: string
   responseid: string
   setRequestid: (requestid: string) => void
   setResponseid: (responseid: string) => void
}

export const useUpdateStatusResponseStore = create<State>((set) => ({
   requestid: "",
   responseid: "",
   setRequestid: (requestid: string) => set({ requestid }),
   setResponseid: (responseid: string) => set({ responseid }),
}))
