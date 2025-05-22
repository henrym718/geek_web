"use client"
import { useState } from "react"
import { Search } from "../Search/Search"
import { Box } from "../../ui"
import { cn } from "@/lib/utils/cn"
import useSWR from "swr"
import { fetchAllGroups } from "@/data/api/services/group.service"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"
import { useRouter } from "next/navigation"
import { fetchSkillsByCategoryId } from "@/data/api/services/skill.service"

export function SearchProjects() {
   const router = useRouter()
   const [activeIndex, setActiveIndex] = useState(-1)
   const [groupSearchText, setGroupSearchText] = useState("")
   const [categorySearchText, setCategorySearchText] = useState("")
   const [skillSearchText, setSkillSearchText] = useState("")

   const [groupId, setGroupId] = useState("")
   const [categoryId, setCategoryId] = useState("")

   const { data: groups } = useSWR(["groups"], fetchAllGroups)
   const { data: categories } = useSWR(groupId ? ["categories", groupId] : null, () => fetchCategoriesByGroupId(groupId))
   const { data: skills } = useSWR(categoryId ? ["skills", categoryId] : null, () => fetchSkillsByCategoryId({ categoryId }))

   const groupsOptions = groups?.success ? groups.data : []
   const categoriesOptions = categories?.success ? categories.data : []
   const skillsOptions = skills?.success ? skills.data : []

   const handleGroupSelect = (groupId: string, groupName: string) => {
      setGroupId(groupId)
      setGroupSearchText(groupName)
   }

   const handleChangeGroup = (searchText: string) => {
      setGroupSearchText(searchText)
      setCategoryId("")
      setCategorySearchText("")
      setSkillSearchText("")
   }

   const handleCategorySelect = (categoryId: string, categoryName: string) => {
      setCategoryId(categoryId)
      setCategorySearchText(categoryName)
      setSkillSearchText("")
   }

   const handleChangeCategory = (searchText: string) => {
      setCategorySearchText(searchText)
      setSkillSearchText("")
   }

   const handleSkillSelect = (skillId: string, skillName: string) => {
      setSkillSearchText(skillName)
      router.push(`/projects?skill=${skillId}`) // Cambiado de /search a /talents
   }

   const handleChangeSkill = (searchText: string) => {
      setSkillSearchText(searchText)
   }

   return (
      <Box
         className={cn(
            "flex w-[850px] rounded-full border border-zinc-200 transition-colors duration-300",
            activeIndex !== -1 ? "bg-black/5" : "bg-white"
         )}>
         <Search
            options={groupsOptions}
            label="Grupo"
            placeholder="Elige un grupo"
            limit={5}
            isVisibleIcon={false}
            isVisibleTyping={false}
            index={0}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onSelect={handleGroupSelect}
            value={groupSearchText}
            onChange={handleChangeGroup}
            openOptionsFocus={true}
            isScrollable={true}
         />
         <Search
            options={categoriesOptions}
            label="Categoría"
            placeholder="Selecciona una categoría"
            limit={5}
            isVisibleIcon={false}
            isVisibleTyping={false}
            index={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onSelect={handleCategorySelect}
            value={categorySearchText}
            onChange={handleChangeCategory}
            openOptionsFocus={true}
            isScrollable={true}
         />
         <Search
            options={skillsOptions}
            label="Habilidad"
            limit={5}
            isVisibleIcon={true}
            isVisibleTyping={false}
            index={2}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onSelect={handleSkillSelect}
            value={skillSearchText}
            onChange={handleChangeSkill}
            openOptionsFocus={true}
            isScrollable={true}
         />
      </Box>
   )
}
