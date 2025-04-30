"use client"

import { Box, Typography } from "../ui"
import { useCategoriesStore } from "@/stores/useCategoriesStore"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"

interface CardGroupProps {
   id: string
   title: string
   Icon: React.ElementType
}

export function CardGroup({ id, title, Icon }: Readonly<CardGroupProps>) {
   const { setCategories, setIsLoading } = useCategoriesStore((state) => state)

   const handleSelectGroup = async () => {
      setIsLoading(true)
      const response = await fetchCategoriesByGroupId(id)
      if (response.success) {
         setCategories(response.data)
         setIsLoading(false)
      } else {
         setIsLoading(false)
      }
   }

   return (
      <Box
         className="flex flex-col gap-4 px-4 w-[160px] h-[118px] cursor-pointer border border-border rounded-xl hover:shadow-md"
         onClick={handleSelectGroup}>
         <Box className="flex justify-start items-start pt-2">
            <Icon
               size={24}
               strokeWidth={1.2}
            />
         </Box>
         <Typography variant="mensaje">{title}</Typography>
      </Box>
   )
}
