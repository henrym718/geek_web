"use client"

import { SelectButton, SelectButtonContent, SelectButtonItem, SelectButtonTrigger, SelectButtonValue } from "@/components/ui"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"
import { useEffect, useMemo } from "react"
import useSWR from "swr"

export function CategorySelector() {
   const { categories, selectedGroup, selectedCategory, setCategories, setSelectedCategory, cleanSkillsSelected } = useCreateRequestFormDataStore(
      (state) => state
   )
   const { setRequestData } = useCreateRequestUserDataStore((state) => state)
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
      setRequestData({ categoryId: value.id })
   }

   return (
      <SelectButton
         selected={selectedCategory}
         onChange={handleCategorySelect}>
         <SelectButtonTrigger>
            <SelectButtonValue placeholder="Seleccione una categoría" />
         </SelectButtonTrigger>
         <SelectButtonContent>
            {isLoadingCategories && <SelectButtonItem value="loading">Cargando categorías...</SelectButtonItem>}
            {categoryOptions.map((category) => (
               <SelectButtonItem
                  key={category.id}
                  value={category.id}>
                  {category.name}
               </SelectButtonItem>
            ))}
         </SelectButtonContent>
      </SelectButton>
   )
}
