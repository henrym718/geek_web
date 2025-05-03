import { CreateRequestRequest } from "@/data/dtos/create-request.type"
import { Skill } from "@/data/types/models/models"
import { create } from "zustand"

interface CreateRequestUserDataStore {
   requestData: CreateRequestRequest
   setRequestData: (requestData: Partial<CreateRequestRequest>) => void
   resetRequestData: () => void
   addSkill: (skill: Skill) => void
   removeSkill: (skill: Skill) => void
}

export const useCreateRequestUserDataStore = create<CreateRequestUserDataStore>((set) => ({
   requestData: {
      title: "",
      description: "",
      budget: 0,
      budgetUnit: "PROJECT",
      quotation: false,
      city: "",
      categoryId: "",
      skills: [],
      projectType: null,
      projectLength: null,
      projectWorkload: null,
   },
   setRequestData: (requestData: Partial<CreateRequestRequest>) => set((state) => ({ requestData: { ...state.requestData, ...requestData } })),
   resetRequestData: () =>
      set({
         requestData: {
            title: "",
            description: "",
            budget: 0,
            budgetUnit: "PROJECT",
            quotation: false,
            city: "",
            categoryId: "",
            skills: [],
            projectType: null,
            projectLength: null,
            projectWorkload: null,
         },
      }),
   addSkill: (skill: Skill) => set((state) => ({ requestData: { ...state.requestData, skills: [...state.requestData.skills, skill.id] } })),
   removeSkill: (skill: Skill) =>
      set((state) => ({ requestData: { ...state.requestData, skills: state.requestData.skills.filter((s) => s !== skill.id) } })),
}))
