"use client"
import { useState } from "react"
import { SearchProjects } from "../SearchProjects/SearchProjects"
import { SearchTalents } from "../SearchTalents/SearchTalents"
import { Box } from "../../ui"
import { Suggestion } from "@/data/types/models/models"
import { SEARCH_TYPE, SearchType } from "@/config/constants"
import { TabButton } from "./TabButton"

interface Props {
   suggestions: Suggestion[]
}

export function SearchGroups({ suggestions }: Readonly<Props>) {
   const [activeTab, setActiveTab] = useState<SearchType>(SEARCH_TYPE.TALENT)

   return (
      <Box className="flex flex-col gap-5 -mt-12">
         <Box className="flex gap-5 justify-center">
            <TabButton
               isActive={activeTab === SEARCH_TYPE.TALENT}
               label="Buscar talento"
               onClick={() => setActiveTab(SEARCH_TYPE.TALENT)}
            />
            <TabButton
               isActive={activeTab === SEARCH_TYPE.PROJECT}
               label="Buscar proyectos ahora"
               onClick={() => setActiveTab(SEARCH_TYPE.PROJECT)}
            />
         </Box>
         {activeTab === SEARCH_TYPE.TALENT ? <SearchTalents suggestions={suggestions} /> : <SearchProjects />}
      </Box>
   )
}
