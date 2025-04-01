import { RoleType } from "@/app/lib/constants/auth.constants"
import { create } from "zustand"

interface RoleState {
   role: RoleType | undefined
   setRoleData: (role: RoleType) => void
   clearRoleData: () => void
}

export const useRolStore = create<RoleState>((set) => ({
   role: undefined,
   setRoleData: (role) => set({ role }),
   clearRoleData: () => set({ role: undefined }),
}))
