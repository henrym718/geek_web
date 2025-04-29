"use client"
import { useState } from "react"
import { Search } from "../Search/Search"
import { Box } from "../ui"
import { cn } from "@/lib/utils/cn"
import { Suggestion } from "@/data/types/models/models"
import { useRouter } from "next/navigation"

interface Props {
   suggestions: Suggestion[]
}

export function SearchTalents({ suggestions }: Readonly<Props>) {
   const router = useRouter()
   const [activeIndex, setActiveIndex] = useState(-1)
   const [searchText, setSearchText] = useState("")

   const groupsOptions: { id: string; name: string }[] = suggestions.map(({ skill, suggestions }) => ({
      id: skill,
      name: suggestions,
   }))

   const handleOnChange = async (search: string) => {
      setSearchText(search)
   }

   const handleOnSelect = (optionId: string, optionName: string) => {
      setSearchText(optionName)
      router.push(`/talents?q=${optionId}`) // Cambiado de /search a /talents
   }

   return (
      <Box
         className={cn(
            "flex w-[700px] rounded-full border border-zinc-200 transition-colors duration-300",
            activeIndex !== -1 ? "bg-black/5" : "bg-white"
         )}>
         <Search
            options={groupsOptions}
            label="Escribe lo que buscas"
            limit={10}
            isVisibleTyping={true}
            index={0}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onChange={handleOnChange}
            value={searchText}
            onSelect={handleOnSelect}
         />
      </Box>
   )
}
