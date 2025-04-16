/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { cn } from "@/lib/utils/cn"
import { useSelect } from "./select-button-context"
import { useEffect, useRef } from "react"

interface SelectContentProps {
   children: React.ReactNode
   className?: string
}

export function SelectButtonContent({ children, className, ...props }: Readonly<SelectContentProps>) {
   const { isOpen, setIsOpen, triggerRef } = useSelect()
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         const target = event.target as Node

         if (containerRef.current && triggerRef.current && !containerRef.current.contains(target) && !triggerRef.current.contains(target)) {
            setIsOpen(false)
         }
      }
      document.addEventListener("mousedown", handleClickOutside)

      return () => {
         document.removeEventListener("mousedown", handleClickOutside)
      }
   }, [])

   if (!isOpen) return null

   return (
      <div
         ref={containerRef}
         className={cn("absolute top-11 shadow-md z-10 border border-black/15 w-full rounded-md bg-white p-2", className)}
         {...props}>
         {children}
      </div>
   )
}
