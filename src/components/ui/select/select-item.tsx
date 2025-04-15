"use client"

import { cn } from "@/lib/utils/cn"
import { useSelect } from "./select-context"
import { useState } from "react"
import { IoCheckmarkOutline } from "react-icons/io5"

interface SelectItemProps {
   value: string
   className?: string
   children: React.ReactNode
}

export default function SelectItem({ value, className, children, ...props }: Readonly<SelectItemProps>) {
   const { setIsOpen, setSelected, selected } = useSelect()
   const [isHovered, setIsHovered] = useState("")

   const handleClick = () => {
      setSelected({ id: value, name: children as string })
      setIsOpen(false)
   }

   return (
      <li
         data-selected={isHovered === value}
         className={cn("cursor-pointer list-none p-2 data-[selected=true]:bg-gray-100", className)}
         onClick={handleClick}
         onMouseEnter={() => setIsHovered(value)}
         onMouseLeave={() => setIsHovered("")}
         {...props}>
         <div className="flex items-center gap-2">
            <IoCheckmarkOutline
               data-visible={selected.id === value}
               className="data-[visible=true]:visible invisible"
            />
            {children}
         </div>
      </li>
   )
}
