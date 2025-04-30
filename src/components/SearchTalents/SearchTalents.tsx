"use client"
import { useState } from "react"
import { Search } from "../Search/Search"
import { Box } from "../ui"
import { cn } from "@/lib/utils/cn"
import { Suggestion } from "@/data/types/models/models"
import { useRouter } from "next/navigation"
import { formatURLParam } from "@/lib/utils/formatURLParams"

interface Props {
   suggestions: Suggestion[]
}

export function SearchTalents({ suggestions }: Readonly<Props>) {
   const router = useRouter()
   const [activeIndex, setActiveIndex] = useState(-1)
   const [searchText, setSearchText] = useState("")

   console.log(suggestions)

   const suggestionsOptions: { id: string; name: string; value: string }[] = suggestions.map(({ skillId, skillName, suggestions }) => ({
      id: skillId,
      name: suggestions,
      value: skillName,
   }))

   const handleOnChange = async (search: string) => {
      setSearchText(search)
   }

   const handleOnSelect = (optionId: string, optionName: string, optionValue?: string) => {
      setSearchText(optionName)
      router.push(`/talents?skills=${formatURLParam(optionValue ?? "")}`)
   }

   const handleButtonFindOptions = () => {
      router.push(`/talents?query=${formatURLParam(searchText)}`)
   }

   return (
      <Box
         className={cn(
            "flex w-[700px] rounded-full border border-zinc-200 transition-colors duration-300",
            activeIndex !== -1 ? "bg-black/5" : "bg-white"
         )}>
         <Search
            options={suggestionsOptions}
            label="Escribe lo que buscas"
            limit={10}
            isVisibleTyping={true}
            index={0}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onChange={handleOnChange}
            value={searchText}
            onSelect={handleOnSelect}
            findOptions={handleButtonFindOptions}
         />
      </Box>
   )
}
