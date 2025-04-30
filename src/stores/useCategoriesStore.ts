import { Category } from "@/data/types/models/models"
import { create } from "zustand"

interface CategoriesStore {
   categories: Category[]
   setCategories: (categories: Category[]) => void
   isLoading: boolean
   setIsLoading: (isLoading: boolean) => void
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
   categories: [],
   setCategories: (categories) => set({ categories }),
   isLoading: false,
   setIsLoading: (isLoading) => set({ isLoading }),
}))
