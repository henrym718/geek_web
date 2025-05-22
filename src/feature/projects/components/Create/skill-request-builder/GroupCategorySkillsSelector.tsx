"use client"

import { Box, Typography } from "@/components/ui"
import { GroupSelector } from "./GroupSelector"
import { CategorySelector } from "./CategorySelector"
import { SkillsSelector } from "./SkillsSelector"
import { GetAllGroupsResponse } from "@/data/dtos/get-all-groups"
import { GetCategoriesByGroupIdResponse } from "@/data/dtos/get-categories-by-groupId"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   setSelectedGroup: (group: { id: string; name: string }) => void
   setSelectedCategory: (category: { id: string; name: string }) => void
   cleanSkillsSelected: () => void
   groups: GetAllGroupsResponse[]
   selectedGroup: GetAllGroupsResponse
   setGroups: (groups: GetAllGroupsResponse[]) => void
   categories: GetCategoriesByGroupIdResponse[]
   selectedCategory: GetAllGroupsResponse
   setCategories: (categories: GetCategoriesByGroupIdResponse[]) => void
   setProject: (project: Partial<CreateRequestRequest>) => void
}

export function GroupCategorySkillsSelector(props: Readonly<Props>) {
   const {
      setSelectedGroup,
      setSelectedCategory,
      cleanSkillsSelected,
      groups,
      selectedGroup,
      setGroups,
      categories,
      selectedCategory,
      setCategories,
      setProject,
   } = props

   return (
      <Box className="flex flex-col gap-8 w-1/2">
         <Typography variant="titulo3">Ahora, define las habilidades que necesitas para tu proyecto.</Typography>
         <GroupSelector
            setSelectedGroup={setSelectedGroup}
            setSelectedCategory={setSelectedCategory}
            cleanSkillsSelected={cleanSkillsSelected}
            groups={groups}
            selectedGroup={selectedGroup}
            setGroups={setGroups}
         />
         <CategorySelector
            setSelectedCategory={setSelectedCategory}
            cleanSkillsSelected={cleanSkillsSelected}
            selectedGroup={selectedGroup}
            categories={categories}
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            setProject={setProject}
         />
         <SkillsSelector />
      </Box>
   )
}
