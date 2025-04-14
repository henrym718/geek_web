"use client"

import { Box } from "@/components/ui"
import { GroupSelector } from "./group-selector"
import { CategorySelector } from "./category-selector"
import { SkillsSelector } from "./skills-selector"

export function GroupCategorySkillsSelector() {
   return (
      <Box className="flex flex-col gap-4">
         <GroupSelector />
         <CategorySelector />
         <SkillsSelector />
      </Box>
   )
}
