"use client"
import { Box, Button, Typography } from "@/components/ui"
import { CreateVendorProfileRequest } from "@/data/dtos/create-vendor-profile.types"
import { Category, Group } from "@/data/types/models/models"
import React from "react"

interface Props {
   groups: Group[]
   categories: Category[]
   isLoadingGroups: boolean
   isLoadingCategories: boolean
   cleanSelectedTags: () => void
   setVendorProfile: (data: Partial<CreateVendorProfileRequest>) => void
   vendorProfile: CreateVendorProfileRequest
   setSelectedGroupId: (groupId: string) => void
}

export function CategorySelector(props: Readonly<Props>) {
   const { groups, categories, isLoadingGroups, isLoadingCategories, cleanSelectedTags, vendorProfile, setVendorProfile, setSelectedGroupId } = props

   const handleSelectedGroup = async (groupId: string) => {
      setSelectedGroupId(groupId)
      setVendorProfile({ categoryId: undefined })
   }

   const handleSelectedCategory = (categoryId: string) => {
      setVendorProfile({ categoryId, skills: [] })
      cleanSelectedTags()
   }

   if (isLoadingGroups) {
      return (
         <Box className="flex flex-col gap-4 ">
            <Box className="flex flex-col gap-2">
               <Typography variant="titulo3">Cargando...</Typography>
            </Box>
         </Box>
      )
   }

   return (
      <Box className="flex flex-col gap-4 ">
         <Box className="flex flex-col gap-2">
            <Typography
               className="w-4/6"
               variant="titulo3">
               Genial, entonces que tipo de trabajo vas a ofrecer a tus clientes?
            </Typography>
            <Typography variant="parrafo">
               No te preocupes, puedes crear diferente perfiles para otras habilidades, este será el principal.
            </Typography>
         </Box>
         <Box className="flex gap-4 border-t">
            <ul className="flex flex-col border-r">
               {groups.map((group) => (
                  <li key={group.id}>
                     <Button
                        className="w-full justify-start"
                        onClick={() => handleSelectedGroup(group.id)}
                        variant="link"
                        size="lg">
                        {group.name}
                     </Button>
                  </li>
               ))}
            </ul>
            <ul className="flex flex-col">
               {isLoadingCategories ? (
                  <li>
                     <Typography variant="parrafo">Cargando...</Typography>
                  </li>
               ) : (
                  categories.map((group) => (
                     <label
                        className="flex items-center gap-2"
                        key={group.id}>
                        <input
                           type="checkbox"
                           onChange={() => handleSelectedCategory(group.id)}
                           checked={vendorProfile.categoryId === group.id}
                        />
                        {group.name}
                     </label>
                  ))
               )}
            </ul>
         </Box>
      </Box>
   )
}
