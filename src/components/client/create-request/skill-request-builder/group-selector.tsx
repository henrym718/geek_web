"use client"

import { Select } from "@/components/ui/select/select"
import { SelectContent } from "@/components/ui/select/select-content"
import SelectItem from "@/components/ui/select/select-item"
import { SelectTrigger } from "@/components/ui/select/select-trigger"
import { SelectValue } from "@/components/ui/select/select-value"
import { ApiResponse } from "@/data/dtos/api-response.types"
import { GetAllGroupsResponse } from "@/data/dtos/get-all-groups"
import { fetchAllGroups } from "@/lib/services/group.service"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import { useEffect, useMemo } from "react"
import useSWR from "swr"

export function GroupSelector() {
   const { groups, selectedGroup, setGroups, setSelectedGroup, setSelectedCategory, cleanSkillsSelected } = useCreateRequestFormDataStore(
      (state) => state
   )

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
      <Select
         value={selectedGroup}
         onChange={handleGroupSelect}>
         <SelectTrigger>
            <SelectValue placeholder="Seleccione un grupo" />
         </SelectTrigger>
         <SelectContent>
            {isLoadingGroups && <SelectItem value="loading">Cargando grupos...</SelectItem>}
            {groupOptions.map((group) => (
               <SelectItem
                  key={group.id}
                  value={group.id}>
                  {group.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
