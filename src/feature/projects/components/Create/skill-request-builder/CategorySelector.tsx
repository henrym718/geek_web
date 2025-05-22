"use client"

import { SelectButton, SelectButtonContent, SelectButtonItem, SelectButtonTrigger, SelectButtonValue } from "@/components/ui"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"
import { useEffect, useMemo } from "react"
import useSWR from "swr"
import { GetAllGroupsResponse } from "@/data/dtos/get-all-groups"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   setSelectedCategory: (category: GetCategoriesByGroupIdResponse) => void
   cleanSkillsSelected: () => void
   selectedGroup: GetAllGroupsResponse
   categories: GetCategoriesByGroupIdResponse[]
   selectedCategory: GetAllGroupsResponse
   setCategories: (categories: GetCategoriesByGroupIdResponse[]) => void
   setProject: (project: Partial<CreateRequestRequest>) => void
}

export function CategorySelector(props: Readonly<Props>) {
   const { setSelectedCategory, cleanSkillsSelected, selectedGroup, categories, selectedCategory, setCategories, setProject } = props

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
      setProject({ categoryId: value.id })
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
