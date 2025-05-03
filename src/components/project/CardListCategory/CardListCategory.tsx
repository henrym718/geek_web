"use client"

import { useCategoriesStore } from "@/stores/useCategoriesStore"
import CardCategory from "../CardCategory/CardCategory"
import { Box, Typography } from "../../ui"

export function CardListCategory() {
   const { isLoading, categories } = useCategoriesStore((state) => state)

   return (
      <Box className="flex flex-wrap gap-2">
         {isLoading ? (
            <Typography variant="mensaje">Cargando...</Typography>
         ) : (
            categories.map((category) => (
               <CardCategory
                  key={category.id}
                  id={category.id}
                  title={category.name}
               />
            ))
         )}
      </Box>
   )
}
