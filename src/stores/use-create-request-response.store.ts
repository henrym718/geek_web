import { create } from "zustand"

interface State {
   profileActive: string
   setProfileActive: (profileId: string) => void
}

export const useCreateRequestResponseStore = create<State>((set) => ({
   profileActive: "",
   setProfileActive: (profileId) => set({ profileActive: profileId }),
}))
