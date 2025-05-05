import { GetAllGroupsResponse } from "@/data/dtos/get-all-groups"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"
import { GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { create } from "zustand"

interface CreateRequestFormDataStore {
   groups: GetAllGroupsResponse[]
   selectedGroup: GetAllGroupsResponse
   setGroups: (groups: GetAllGroupsResponse[]) => void
   setSelectedGroup: (group: GetAllGroupsResponse) => void

   categories: GetCategoriesByGroupIdResponse[]
   selectedCategory: GetCategoriesByGroupIdResponse
   setCategories: (categories: GetCategoriesByGroupIdResponse[]) => void
   setSelectedCategory: (category: GetCategoriesByGroupIdResponse) => void

   skillsOptions: GetSkillsByCategoryIdResponse[]
   skillsSelected: GetSkillsByCategoryIdResponse[]
   setSkillsOptions: (skillsOptions: GetSkillsByCategoryIdResponse[]) => void
   addSkillsOptions: (skillsOptions: GetSkillsByCategoryIdResponse) => void
   removeSkillsOptions: (skillsOptions: GetSkillsByCategoryIdResponse) => void
   addSkillsSelected: (skillsSelected: GetSkillsByCategoryIdResponse) => void
   removeSkillsSelected: (skillsSelected: GetSkillsByCategoryIdResponse) => void
   cleanSkillsSelected: () => void

   selectedProjectLength: { id: string; name: string }
   setSelectedProjectLength: (id: string, name: string) => void

   selectedProjectWorkload: { id: string; name: string }
   setSelectedProjectWorkload: (id: string, name: string) => void

   resetFormData: () => void

   selectedScope: string
   setSelectedScope: (scope: string) => void
}

export const useCreateProjectRecoveryData = create<CreateRequestFormDataStore>((set) => ({
   groups: [],
   selectedGroup: { id: "", name: "" },
   setGroups: (groups) => set({ groups }),
   setSelectedGroup: (group) => set({ selectedGroup: group }),

   categories: [],
   selectedCategory: { id: "", name: "" },
   setCategories: (categories) => set({ categories }),
   setSelectedCategory: (category) => set({ selectedCategory: category }),

   skillsOptions: [],
   skillsSelected: [],
   setSkillsOptions: (skillsOptions) => set({ skillsOptions }),
   addSkillsOptions: (skillsOptions) => set((state) => ({ skillsOptions: [...state.skillsOptions, skillsOptions] })),
   removeSkillsOptions: (skillsOptions) => set((state) => ({ skillsOptions: state.skillsOptions.filter((skill) => skill.id !== skillsOptions.id) })),
   addSkillsSelected: (skillsSelected) => set((state) => ({ skillsSelected: [...state.skillsSelected, skillsSelected] })),
   removeSkillsSelected: (skillsSelected) =>
      set((state) => ({ skillsSelected: state.skillsSelected.filter((skill) => skill.id !== skillsSelected.id) })),
   cleanSkillsSelected: () => set({ skillsSelected: [] }),

   selectedProjectLength: { id: "", name: "" },
   setSelectedProjectLength: (id, name) => set({ selectedProjectLength: { id, name } }),

   selectedProjectWorkload: { id: "", name: "" },
   setSelectedProjectWorkload: (id, name) => set({ selectedProjectWorkload: { id, name } }),

   resetFormData: () =>
      set({
         groups: [],
         selectedGroup: { id: "", name: "" },
         categories: [],
         selectedCategory: { id: "", name: "" },
         skillsOptions: [],
         skillsSelected: [],
         selectedProjectLength: { id: "", name: "" },
         selectedProjectWorkload: { id: "", name: "" },
      }),

   selectedScope: "",
   setSelectedScope: (scope) => set({ selectedScope: scope }),
}))
