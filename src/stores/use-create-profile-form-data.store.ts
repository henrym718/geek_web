import { create } from "zustand"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"
import { GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { GetAllGroupsResponse } from "@/data/dtos/gett-all-groups"
import { fetchAllGroups } from "@/lib/services/group.service"
import { fetchCategoriesByGroupId } from "@/lib/services/category.service"

interface State {
   groups: GetAllGroupsResponse[]
   loadGroups: () => Promise<void>

   categories: GetCategoriesByGroupIdResponse[]
   loadCategories: (groupId: string) => Promise<void>

   selectedTags: GetSkillsByCategoryIdResponse[]
   addSelectedTag: (tags: GetSkillsByCategoryIdResponse) => void
   removeSelectedTag: (tags: GetSkillsByCategoryIdResponse) => void
   cleanSelectedTags: () => void

   optionsTags: GetSkillsByCategoryIdResponse[]
   setOptionsTags: (tags: GetSkillsByCategoryIdResponse[]) => void
   addOptionsTag: (tags: GetSkillsByCategoryIdResponse) => void
   removeOptionsTag: (tags: GetSkillsByCategoryIdResponse) => void

   isLoading: boolean
   error: string | null
}

export const useWizardCreateProfileFormDataStore = create<State>((set) => ({
   groups: [],
   categories: [],
   selectedTags: [],
   optionsTags: [],

   isLoading: false,
   error: null,

   loadGroups: async () => {
      set({ isLoading: true, error: null })
      const res = await fetchAllGroups()

      if (res.success) {
         set({ groups: res.data })
      } else {
         set({ error: res.message })
      }

      set({ isLoading: false })
   },

   loadCategories: async (groupId: string) => {
      set({ isLoading: true, error: null })
      const response = await fetchCategoriesByGroupId(groupId)

      if (response.success) {
         set({ categories: response.data })
      } else {
         set({ error: response.message })
      }

      set({ isLoading: false })
   },

   addSelectedTag: (tags: GetSkillsByCategoryIdResponse) => {
      set((state) => ({ selectedTags: [...state.selectedTags, tags] }))
   },

   removeSelectedTag: (tags: GetSkillsByCategoryIdResponse) => {
      set((state) => ({ selectedTags: state.selectedTags.filter((tag) => tag.id !== tags.id) }))
   },

   setOptionsTags: (tags: GetSkillsByCategoryIdResponse[]) => {
      set({ optionsTags: tags })
   },

   addOptionsTag: (tags: GetSkillsByCategoryIdResponse) => {
      set((state) => ({ optionsTags: [...state.optionsTags, tags] }))
   },

   removeOptionsTag: (tags: GetSkillsByCategoryIdResponse) => {
      set((state) => ({ optionsTags: state.optionsTags.filter((tag) => tag.id !== tags.id) }))
   },

   cleanSelectedTags: () => {
      set({ selectedTags: [] })
   },
}))
