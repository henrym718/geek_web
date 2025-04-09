"use client"
import { Box, Button, Typography } from "@/app/components/ui"
import { useWizardCreateProfileFormDataStore } from "@/app/stores/use-create-profile-form-data.store"
import { useWizardUserDataStore } from "@/app/stores/use-create-profile-user-data.store"
import React, { useEffect } from "react"

export default function GroupAndCategoryStep() {
   const { groups, categories, loadGroups, loadCategories, cleanSelectedTags } = useWizardCreateProfileFormDataStore((state) => state)
   const { vendorProfile, setVendorProfile } = useWizardUserDataStore((state) => state)

   const handleSelectedGroup = async (groupId: string) => {
      await loadCategories(groupId)
      setVendorProfile({ categoryId: undefined })
   }

   const handleSelectedCategory = (categoryId: string) => {
      setVendorProfile({ categoryId, skills: [] })
      cleanSelectedTags()
   }

   console.log(vendorProfile)

   useEffect(() => {
      const fetchData = async () => {
         if (groups.length === 0) {
            await loadGroups()
         }
      }

      fetchData()
   }, [groups.length, loadGroups])

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
               {categories.map((group) => (
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
               ))}
            </ul>
         </Box>
      </Box>
   )
}
