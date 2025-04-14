"use client"

import { Select } from "@/components/ui/select/select"
import { SelectContent } from "@/components/ui/select/select-content"
import SelectItem from "@/components/ui/select/select-item"
import { SelectTrigger } from "@/components/ui/select/select-trigger"
import { SelectValue } from "@/components/ui/select/select-value"
import { fetchCategoriesByGroupId } from "@/lib/services/category.service"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import { useEffect, useMemo } from "react"
import useSWR from "swr"

export function CategorySelector() {
   const { categories, selectedGroup, selectedCategory, setCategories, setSelectedCategory, cleanSkillsSelected } = useCreateRequestFormDataStore(
      (state) => state
   )

   const categorySWRKey = selectedGroup?.id ? `categories/${selectedGroup.id}` : null
   const { data: categoriesApiResponse, isLoading: isLoadingCategories } = useSWR(categorySWRKey, () => fetchCategoriesByGroupId(selectedGroup.id))

   useEffect(() => {
      if (categoriesApiResponse?.success && categoriesApiResponse.data) {
         setCategories(categoriesApiResponse.data)
      }
   }, [categoriesApiResponse, selectedGroup?.id, setCategories])

   const categoryOptions = useMemo(() => categories || [], [categories])

   const handleCategorySelect = (value: { id: string; name: string }) => {
      if (!value) return
      setSelectedCategory(value)
      cleanSkillsSelected()
   }

   return (
      <Select
         value={selectedCategory}
         onChange={handleCategorySelect}>
         <SelectTrigger>
            <SelectValue placeholder="Seleccione una categoría" />
         </SelectTrigger>
         <SelectContent>
            {isLoadingCategories && <SelectItem value="loading">Cargando categorías...</SelectItem>}
            {categoryOptions.map((category) => (
               <SelectItem
                  key={category.id}
                  value={category.id}>
                  {category.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
