"use client"
import { useState } from "react"
import { SearchProjects } from "../SearchProjects/SearchProjects"
import { SearchTalents } from "../SearchTalents/SearchTalents"
import { Box, Button } from "../ui"
import { Suggestion } from "@/data/types/models/models"

interface Props {
   suggestions: Suggestion[]
}

export function SearchGroups({ suggestions }: Readonly<Props>) {
   const [activeIndex, setActiveIndex] = useState(0)

   return (
      <Box className="flex flex-col gap-5 -mt-15">
         <Box className="flex gap-5 justify-center">
            <Button
               data-active={activeIndex === 0}
               variant="ghost"
               size="md"
               className="hover:rounded-2xl font-light data-[active=true]:font-bold data-[active=true]:hover:bg-white transition-all duration-300"
               onClick={() => setActiveIndex(0)}>
               Buscar Talento
            </Button>
            <Button
               data-active={activeIndex === 1}
               variant="ghost"
               size="md"
               className="hover:rounded-2xl font-light data-[active=true]:font-bold data-[active=true]:hover:bg-white transition-all duration-300"
               onClick={() => setActiveIndex(1)}>
               Buscar proyectos
            </Button>
         </Box>
         {activeIndex === 0 ? <SearchTalents suggestions={suggestions} /> : <SearchProjects />}
      </Box>
   )
}
