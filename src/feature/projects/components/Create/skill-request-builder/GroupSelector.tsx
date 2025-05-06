"use client"

import { SelectButton, SelectButtonContent, SelectButtonItem, SelectButtonTrigger, SelectButtonValue } from "@/components/ui"
import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetAllGroupsResponse } from "@/data/dtos/get-all-groups"
import { fetchAllGroups } from "@/data/api/services/group.service"
import { useEffect, useMemo } from "react"
import useSWR from "swr"

interface Props {
   setSelectedGroup: (group: { id: string; name: string }) => void
   setSelectedCategory: (category: { id: string; name: string }) => void
   cleanSkillsSelected: () => void
   groups: GetAllGroupsResponse[]
   selectedGroup: GetAllGroupsResponse
   setGroups: (groups: GetAllGroupsResponse[]) => void
}

export function GroupSelector(props: Readonly<Props>) {
   const { setSelectedGroup, setSelectedCategory, cleanSkillsSelected, groups, selectedGroup, setGroups } = props

   const { data: groupsApiResponse, isLoading: isLoadingGroups } = useSWR<ApiResponse<GetAllGroupsResponse[]>>("groups", fetchAllGroups)

   useEffect(() => {
      if (groupsApiResponse?.success && groupsApiResponse.data) {
         setGroups(groupsApiResponse.data)
      }
   }, [groupsApiResponse, setGroups, cleanSkillsSelected])

   const groupOptions = useMemo(() => groups || [], [groups])

   async function handleGroupSelect(value: { id: string; name: string }) {
      if (!value) return
      setSelectedGroup(value)
      setSelectedCategory({ id: "", name: "" })
      cleanSkillsSelected()
   }

   return (
      <SelectButton
         selected={selectedGroup}
         onChange={handleGroupSelect}>
         <SelectButtonTrigger>
            <SelectButtonValue placeholder="Seleccione un grupo" />
         </SelectButtonTrigger>
         <SelectButtonContent>
            {isLoadingGroups && <SelectButtonItem value="loading">Cargando grupos...</SelectButtonItem>}
            {groupOptions.map((group) => (
               <SelectButtonItem
                  key={group.id}
                  value={group.id}>
                  {group.name}
               </SelectButtonItem>
            ))}
         </SelectButtonContent>
      </SelectButton>
   )
}
