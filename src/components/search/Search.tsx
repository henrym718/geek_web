"use client"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { FaSearch } from "react-icons/fa"

type Option = {
   label: string
   value: string
}

interface Props {
   options: Option[]
   limit?: number
}

export function Search({ options = [], limit = 2 }: Readonly<Props>) {
   const router = useRouter()
   const inputRef = useRef<HTMLInputElement>(null)
   const [search, setSearch] = useState("")
   const [isTyping, setIsTyping] = useState(true)
   const [isOpenOptions, setIsOpenOptions] = useState(false)
   const [activeOption, setActiveOption] = useState(-1)

   const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
   const limitedOptions = filteredOptions.slice(0, limit)

   const highlight = (label: string, search: string) => {
      if (!search) return label
      const parts = label.split(new RegExp(`(${search})`, "gi"))

      return parts.map((part, i) =>
         part.toLowerCase() === search.toLowerCase() ? (
            part
         ) : (
            <span
               key={i}
               className="font-bold">
               {part}
            </span>
         )
      )
   }

   useEffect(() => {
      const handlePressEnter = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            setIsTyping(false)
            setActiveOption(-1)
            setIsOpenOptions(false)
         }
      }
      document.addEventListener("keydown", handlePressEnter)
      return () => document.removeEventListener("keydown", handlePressEnter)
   }, [])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearch(value)
      setActiveOption(-1)
      setIsTyping(false)

      if (!value.trim()) {
         setIsOpenOptions(false)
      } else {
         setIsOpenOptions(true)
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpenOptions) return

      if (e.key === "ArrowDown") {
         e.preventDefault()
         setActiveOption((prev) => Math.min(prev + 1, limitedOptions.length - 1))
      }

      if (e.key === "ArrowUp") {
         e.preventDefault()
         setActiveOption((prev) => Math.max(prev - 1, 0))
      }

      if (e.key === "Enter" && activeOption !== -1) {
         e.preventDefault()
         const params = new URLSearchParams()
         const opt = limitedOptions[activeOption]
         setIsTyping(false)
         setIsOpenOptions(false)
         setSearch(opt.label)
         params.set("search", opt.value.toString())
         router.push(`/vendors?${params}`)
      }
   }

   const handleClick = () => {
      setIsTyping(false)
      inputRef.current?.focus()
   }

   return (
      <div
         onClick={handleClick}
         className="relative w-full flex flex-col gap-1">
         <input
            ref={inputRef}
            className="h-12 px-4 focus-visible:outline-none focus-visible:border-border rounded-xl border-1 border-black/10 shadow "
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsTyping(true)}
         />
         <div className="absolute top-2 right-4 p-2 rounded-full bg-secondary">
            <FaSearch
               className="text-white"
               size={19}
            />
         </div>
         <div
            data-typing={isTyping}
            className="absolute top-3 left-3 data-[typing=true]:visible data-[typing=false]:invisible text-zinc-900">
            <Typewriter
               words={["Editar un video", "Organizar un evento", "Pintar tu habitaciòn", "Clases de Ingles"]}
               loop={5}
               typeSpeed={90}
               deleteSpeed={50}
               delaySpeed={1000}
            />
         </div>
         {isOpenOptions && (
            <ul className="absolute top-13 w-full flex flex-col shadow rounded-xl p-4 bg-white border border-border">
               {limitedOptions.length > 0 ? (
                  limitedOptions.map((opt, index) => (
                     <li
                        className={cn("cursor-pointer py-2 text-zinc-500 px-1", index === activeOption && "bg-selected rounded-lg")}
                        key={opt.value}
                        onMouseEnter={() => setActiveOption(index)}
                        onMouseLeave={() => setActiveOption(-1)}>
                        {highlight(opt.label, search)}
                     </li>
                  ))
               ) : (
                  <li>No existen coincidencias</li>
               )}
            </ul>
         )}
      </div>
   )
}
