"use client"
import { useState } from "react"
import { GetSkillsByCategoryIdResponse } from "@/data/dtos/get-skills-by-categoryId"
import { cn } from "@/lib/utils/cn"

interface InputTagProps {
   maxSelectedTags: number
   maxVisibleOptions: number
   className?: string
   optionsTags: { id: string; name: string }[]
   selectedTags: { id: string; name: string }[]
   setSelectedTags: (tags: { id: string; name: string }) => void
   setUnselectedTags: (tags: { id: string; name: string }) => void
}

export function InputTag(props: Readonly<InputTagProps>) {
   const { maxSelectedTags, maxVisibleOptions, className, optionsTags, selectedTags, setSelectedTags, setUnselectedTags } = props

   const [selectedTagIndex, setSelectedTagIndex] = useState(-1)
   const [isOpen, setIsOpen] = useState(false)
   const [search, setSearch] = useState("")

   const filterTags = optionsTags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()))
   const limitTags = filterTags.slice(0, maxVisibleOptions)

   const handleSelectedTags = (tag: GetSkillsByCategoryIdResponse) => {
      setSelectedTags(tag)
      setSearch("")
   }

   const handleUnselectedTags = (tag: GetSkillsByCategoryIdResponse) => {
      setUnselectedTags(tag)
   }

   // 🔄 Actualiza el estado de búsqueda y abre el dropdown
   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setSelectedTagIndex(-1)
      setIsOpen(true)
   }

   // 🔒 Cierra el dropdown si se pierde el foco
   const handleInputBlur = () => setIsOpen(false)

   /**
    * 🎯 Navegación con teclado:
    * - Flecha abajo/arriba: moverse entre opciones
    * - Enter: seleccionar el tag actualmente enfocado
    */
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") setSelectedTagIndex((prev) => Math.min(prev + 1, limitTags.length - 1))

      if (e.key === "ArrowUp") setSelectedTagIndex((prev) => Math.max(prev - 1, 0))

      if (e.key === "Enter" && limitTags[selectedTagIndex]) handleSelectedTags(limitTags[selectedTagIndex])
   }

   // 🧱 Render
   return (
      <div className={cn("flex border-2 flex-wrap gap-2 rounded-md px-2 py-2", className)}>
         {selectedTags.map((tag) => (
            <div
               key={tag.id}
               className="flex gap-2 border px-2 py-0.5 rounded-xl">
               <p>{tag.name}</p>
               <p
                  className="cursor-pointer"
                  onMouseDown={() => handleUnselectedTags(tag)}>
                  x
               </p>
            </div>
         ))}

         <div className="relative flex flex-col flex-grow gap-2">
            <input
               className="flex-grow border-none focus:outline-none placeholder:text-sm px-2"
               type="text"
               placeholder={selectedTags.length >= maxSelectedTags ? `Seleccionaste ${maxSelectedTags} tags` : "Buscar un tag"}
               onChange={handleSearch}
               value={search}
               onBlur={handleInputBlur}
               onKeyDown={handleKeyDown}
               disabled={selectedTags.length >= maxSelectedTags}
            />

            {isOpen && search.length > 0 && (
               <ul className="absolute top-[150%] min-w-[150px] shadow rounded-md border border-gray-200 bg-white px-2">
                  {limitTags.map((tag, index) => (
                     <li
                        key={tag.id}
                        data-selected={selectedTagIndex === index}
                        className="cursor-pointer data-[selected=true]:bg-gray-100"
                        onMouseDown={(e) => {
                           e.preventDefault()
                           handleSelectedTags(tag)
                        }}>
                        {tag.name}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   )
}
