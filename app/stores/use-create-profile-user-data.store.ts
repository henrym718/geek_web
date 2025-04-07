import { CreateVendorProfileRequest } from "@/app/data/dtos/create-vendor-profile.types"
import { create } from "zustand"

interface State {
   vendorProfile: CreateVendorProfileRequest
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
   resetVendorProfile: () => void
}

export const useWizardUserDataStore = create<State>((set) => ({
   vendorProfile: {
      title: "",
      skills: [],
      aboutme: "",
      categoryId: "",
   },
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) =>
      set((state) => ({ vendorProfile: { ...state.vendorProfile, ...data } })),

   resetVendorProfile: () =>
      set({
         vendorProfile: {
            title: "",
            skills: [],
            aboutme: "",
            categoryId: "",
         },
      }),
}))
