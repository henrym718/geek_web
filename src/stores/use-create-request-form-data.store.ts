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
}

export const useCreateRequestFormDataStore = create<CreateRequestFormDataStore>((set) => ({
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
}))
