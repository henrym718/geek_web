"use client"

import { cn } from "@/lib/utils/cn"
import { useEffect, useRef, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { FaSearch } from "react-icons/fa"
import { Typography } from "../ui"

type Option = {
   id: string
   name: string
   value?: string
}

interface Props {
   options: Option[]
   limit?: number
   isVisibleIcon?: boolean
   isVisibleTyping?: boolean
   label?: string
   activeIndex?: number
   index: number
   placeholder?: string
   value?: string
   openOptionsFocus?: boolean
   isScrollable?: boolean
   setActiveIndex?: (index: number) => void
   onSelect?: (optionId: string, optionName: string, optionValue?: string) => void
   onChange?: (search: string) => void
   findOptions?: () => void
}

export function Search({
   options = [],
   limit = 10,
   isVisibleIcon = true,
   isVisibleTyping = true,
   label = "",
   activeIndex,
   index,
   placeholder = "",
   openOptionsFocus = false,
   isScrollable = false,
   setActiveIndex,
   onSelect,
   onChange,
   findOptions,
   value,
}: Readonly<Props>) {
   const inputRef = useRef<HTMLInputElement>(null)
   const [isTyping, setIsTyping] = useState(true)
   const [isOpenOptions, setIsOpenOptions] = useState(false)
   const [activeOption, setActiveOption] = useState(-1)

   const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(value?.toLowerCase() ?? ""))
   const limitedOptions = filteredOptions.slice(0, limit)

   useEffect(() => {
      setActiveOption(-1)
      if (value == null) {
         setIsOpenOptions(false)
      }
   }, [options, value])

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
         if (e.key === "Escape" && isOpenOptions) {
            setIsTyping(false)
            setActiveOption(-1)
            setIsOpenOptions(false)
         }
      }
      document.addEventListener("keydown", handlePressEnter)
      return () => document.removeEventListener("keydown", handlePressEnter)
   }, [isOpenOptions])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange?.(newValue)
      setActiveOption(-1)
      setIsTyping(false)
      if (openOptionsFocus && !newValue.trim()) {
         setIsOpenOptions(true)
      } else {
         setIsOpenOptions(!!newValue.trim())
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

      if (e.key === "Enter") {
         if (activeOption !== -1) {
            e.preventDefault()
            const opt = limitedOptions[activeOption]
            setIsTyping(false)
            setIsOpenOptions(false)
            onSelect?.(opt.id, opt.name, opt?.value)
         } else {
            findOptions?.()
         }
      }
   }

   const handleOnBlur = () => {
      setIsTyping(!value?.trim())
      setIsOpenOptions(false)
      if (!value?.trim()) {
         setActiveIndex?.(-1)
      }
   }

   return (
      <div
         onClick={() => {
            setActiveIndex?.(index)
            setIsTyping(false)
            inputRef.current?.focus()
            if (openOptionsFocus) {
               setIsOpenOptions(true)
            }
         }}
         className={cn(
            "relative w-full flex flex-col gap-1 transition-all duration-300 rounded-full hover:bg-black/10",
            activeIndex === index && "bg-white hover:bg-white"
         )}>
         <div className="h-16 relative flex flex-col justify-end px-5">
            <Typography
               variant="label"
               className="text-zinc-900 absolute top-2 left-9">
               {label}
            </Typography>
            <input
               ref={inputRef}
               className="h-12 px-4 focus-visible:outline-none cursor-pointer"
               value={value}
               onChange={handleChange}
               onKeyDown={handleKeyDown}
               onBlur={handleOnBlur}
               onFocus={() => {
                  setActiveIndex?.(index)
               }}
               placeholder={placeholder}
            />
         </div>

         <div
            data-visible={isVisibleIcon}
            className="absolute top-3 right-4 p-2 rounded-full bg-secondary data-[visible=true]:block data-[visible=false]:hidden">
            <FaSearch
               onClick={() => findOptions?.()}
               className="text-white"
               size={22}
            />
         </div>

         <div
            data-typing={isTyping}
            className="absolute top-8 left-9 data-[typing=true]:visible data-[typing=false]:invisible text-zinc-900">
            {isVisibleTyping && (
               <Typewriter
                  words={["Editar un video", "Organizar un evento", "Pintar tu habitación", "Clases de Inglés"]}
                  loop={5}
                  typeSpeed={90}
                  deleteSpeed={50}
                  delaySpeed={1000}
               />
            )}
         </div>

         <ul
            className={cn(
               "absolute top-17 w-full flex flex-col shadow-lg rounded-4xl p-4 bg-white border border-border transition-all duration-200 ease-in-out",
               isOpenOptions && limitedOptions.length > 0 ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none",
               isScrollable && "max-h-[300px] overflow-y-auto"
            )}>
            {limitedOptions.length > 0 &&
               limitedOptions.map((opt, index) => (
                  <li
                     className={cn("cursor-pointer py-2 text-zinc-500 px-1", index === activeOption && "bg-selected rounded-lg")}
                     key={`${opt.id}-${opt.name}`}
                     onMouseEnter={() => setActiveOption(index)}
                     onMouseLeave={() => setActiveOption(-1)}
                     onMouseDown={() => {
                        onSelect?.(opt.id, opt.name, opt?.value)
                        setIsOpenOptions(false)
                     }}>
                     {highlight(opt.name, value ?? "")}
                  </li>
               ))}
         </ul>
      </div>
   )
}
