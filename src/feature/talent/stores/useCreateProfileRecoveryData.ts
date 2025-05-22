import { create } from "zustand"
import { Category, Group, Skill } from "@/data/types/models/models"

interface State {
   groups: Group[]
   selectedGroupId: string
   setGroups: (groups: Group[]) => void
   setSelectedGroupId: (groupId: string) => void

   categories: Category[]
   setCategories: (categories: Category[]) => void

   selectedTags: Skill[]
   addSelectedTag: (tags: Skill) => void
   removeSelectedTag: (tags: Skill) => void
   cleanSelectedTags: () => void

   optionsTags: Skill[]
   setOptionsTags: (tags: Skill[]) => void
   addOptionsTag: (tags: Skill) => void
   removeOptionsTag: (tags: Skill) => void

   bannerImagePreview: string
   setBannerImagePreview: (bannerImagePreview: string) => void

   resetProfileRecoveryData: () => void
}

export const useCreateProfileRecoveryData = create<State>((set) => ({
   groups: [],
   selectedGroupId: "",
   categories: [],
   selectedTags: [],
   optionsTags: [],
   bannerImagePreview: "",
   setGroups: (groups: Group[]) => {
      set({ groups })
   },

   setSelectedGroupId: (groupId: string) => {
      set({ selectedGroupId: groupId })
   },

   setCategories: (categories: Category[]) => {
      set({ categories })
   },

   addSelectedTag: (tags: Skill) => {
      set((state) => ({ selectedTags: [...state.selectedTags, tags] }))
   },

   removeSelectedTag: (tags: Skill) => {
      set((state) => ({ selectedTags: state.selectedTags.filter((tag) => tag.id !== tags.id) }))
   },

   setOptionsTags: (tags: Skill[]) => {
      set({ optionsTags: tags })
   },

   addOptionsTag: (tags: Skill) => {
      set((state) => ({ optionsTags: [...state.optionsTags, tags] }))
   },

   removeOptionsTag: (tags: Skill) => {
      set((state) => ({ optionsTags: state.optionsTags.filter((tag) => tag.id !== tags.id) }))
   },

   setBannerImagePreview: (bannerImagePreview: string) => {
      set({ bannerImagePreview })
   },

   cleanSelectedTags: () => {
      set({ selectedTags: [] })
   },

   resetProfileRecoveryData: () => {
      set({
         groups: [],
         selectedGroupId: "",
         categories: [],
         selectedTags: [],
         optionsTags: [],
         bannerImagePreview: "",
      })
   },
}))
