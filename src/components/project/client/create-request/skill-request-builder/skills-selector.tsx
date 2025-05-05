"use client"

import { InputTagCopy } from "@/components/ui/input-tag"
import { GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { fetchSkillsByCategoryId } from "@/data/api/services/skill.service"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import { useEffect } from "react"
import useSWR from "swr"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

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
   } = useCreateRequestFormDataStore((state) => state)

   const { addSkill, removeSkill } = useCreateRequestUserDataStore((state) => state)

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
      <InputTagCopy
         maxVisibleOptions={10}
         maxSelectedTags={10}
         optionsTags={skillsOptions}
         selectedTags={skillsSelected}
         setSelectedTags={handleSelectedSkills}
         setUnselectedTags={handleUnselectedSkills}
      />
   )
}
