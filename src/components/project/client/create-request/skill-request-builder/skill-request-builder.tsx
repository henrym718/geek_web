"use client"

import { Box, Typography } from "@/components/ui"
import { GroupSelector } from "./group-selector"
import { CategorySelector } from "./category-selector"
import { SkillsSelector } from "./skills-selector"

export function GroupCategorySkillsSelector() {
   return (
      <Box className="flex flex-col gap-8 w-1/2">
         <Typography variant="titulo3">Ahora, define las habilidades que necesitas para tu proyecto.</Typography>
         <GroupSelector />
         <CategorySelector />
         <SkillsSelector />
      </Box>
   )
}
