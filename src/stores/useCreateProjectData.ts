import { CreateRequestRequest } from "@/data/types/api/request.types"
import { Skill } from "@/data/types/models/models"
import { create } from "zustand"

interface State {
   project: CreateRequestRequest
   setProject: (project: Partial<CreateRequestRequest>) => void
   resetProject: () => void
   addSkill: (skill: Skill) => void
   removeSkill: (skill: Skill) => void
}

export const useCreateProjectData = create<State>((set) => ({
   project: {
      title: "",
      description: "",
      budget: 0,
      budgetUnit: "PROJECT",
      quotation: false,
      city: "",
      categoryId: "",
      skills: [],
      projectType: "",
      projectLength: "",
      projectWorkload: "",
      clientId: "",
   },
   setProject: (project: Partial<CreateRequestRequest>) => set((state) => ({ project: { ...state.project, ...project } })),
   resetProject: () =>
      set({
         project: {
            title: "",
            description: "",
            budget: 0,
            budgetUnit: "PROJECT",
            quotation: false,
            city: "",
            categoryId: "",
            skills: [],
            projectType: "",
            projectLength: "",
            projectWorkload: "",
            clientId: "",
         },
      }),
   addSkill: (skill: Skill) => set((state) => ({ project: { ...state.project, skills: [...state.project.skills, skill.id] } })),
   removeSkill: (skill: Skill) => set((state) => ({ project: { ...state.project, skills: state.project.skills.filter((s) => s !== skill.id) } })),
}))
