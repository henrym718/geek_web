import { CreateVendorProfileRequest } from "@/data/dtos/create-vendor-profile.types"
import { create } from "zustand"

interface State {
   vendorProfile: CreateVendorProfileRequest
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
   resetVendorProfile: () => void
   bannerImage: File | null
   setBannerImage: (file: File | null) => void
}

export const useWizardUserDataStore = create<State>((set) => ({
   vendorProfile: {
      title: "",
      skills: [],
      aboutme: "",
      categoryId: "",
      bannerImage: "",
   },
   bannerImage: null,
   setBannerImage: (file: File | null) => set({ bannerImage: file }),

   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => set((state) => ({ vendorProfile: { ...state.vendorProfile, ...data } })),

   resetVendorProfile: () =>
      set({
         vendorProfile: {
            title: "",
            skills: [],
            aboutme: "",
            categoryId: "",
            bannerImage: "",
         },
         bannerImage: null,
      }),
}))
