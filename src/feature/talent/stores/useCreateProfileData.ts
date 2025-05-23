import { CreateVendorProfileRequest } from "@/data/dtos/create-vendor-profile.types"
import { create } from "zustand"

interface State {
   vendorProfile: CreateVendorProfileRequest
   bannerImage: File | null
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
   resetProfileData: () => void
   setBannerImage: (file: File | null) => void
   addSkill: (skill: string) => void
   removeSkill: (skill: string) => void
}

export const useCreateProfileData = create<State>((set) => ({
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

   resetProfileData: () =>
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

   addSkill: (skill) => set((state) => ({ vendorProfile: { ...state.vendorProfile, skills: [...state.vendorProfile.skills, skill] } })),
   removeSkill: (skill: string) =>
      set((state) => ({ vendorProfile: { ...state.vendorProfile, skills: state.vendorProfile.skills.filter((s) => s !== skill) } })),
}))
