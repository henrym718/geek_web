import { CreateVendorProfileRequest } from "@/app/types/dtos/create-vendor-profile.types"
import { create } from "zustand"

interface State {
   vendorProfile: CreateVendorProfileRequest
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
}

export const useWizardUserDataStore = create<State>((set) => ({
   vendorProfile: {
      title: "",
      skills: [],
      aboutme: "",
      vendorId: "",
      categoryId: "",
   },
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) =>
      set((state) => ({ vendorProfile: { ...state.vendorProfile, ...data } })),
}))
