"use client"

import { InputTag } from "@/components/ui/input-tag"
import { GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { fetchSkillsByCategoryId } from "@/data/api/services/skill.service"
import { useCreateProjectRecoveryData } from "@/stores/useCreateProjectRecoveryData"
import { useEffect } from "react"
import useSWR from "swr"
import { useCreateProjectData } from "@/stores/useCreateProjectData"

export function SkillsSelector() {
   const {
      selectedCategory,
      skillsOptions,
      skillsSelected,
      setSkillsOptions,
      addSkillsOptions,
      removeSkillsOptions,
      addSkillsSelected,
      removeSkillsSelected,
   } = useCreateProjectRecoveryData((state) => state)

   const { addSkill, removeSkill } = useCreateProjectData((state) => state)

   const skillSWRKey = selectedCategory?.id ? `skills/${selectedCategory.id}` : null
   const { data: skillApiResponse } = useSWR(skillSWRKey, () => fetchSkillsByCategoryId({ categoryId: selectedCategory.id }))

   useEffect(() => {
      if (skillApiResponse?.success && skillApiResponse.data) {
         setSkillsOptions(skillApiResponse.data)
      }
   }, [skillApiResponse, selectedCategory?.id, setSkillsOptions])

   const handleSelectedSkills = (skill: GetSkillsByCategoryIdResponse) => {
      removeSkillsOptions(skill)
      addSkillsSelected(skill)
      addSkill(skill)
   }

   const handleUnselectedSkills = (skill: GetSkillsByCategoryIdResponse) => {
      removeSkillsSelected(skill)
      addSkillsOptions(skill)
      removeSkill(skill)
   }

   return (
      <InputTag
         maxVisibleOptions={10}
         maxSelectedTags={10}
         optionsTags={skillsOptions}
         selectedTags={skillsSelected}
         setSelectedTags={handleSelectedSkills}
         setUnselectedTags={handleUnselectedSkills}
      />
   )
}
