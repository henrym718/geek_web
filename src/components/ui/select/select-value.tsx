"use client"

import { cn } from "@/lib/utils/cn"
import { useSelect } from "./select-context"

interface SelectValueProps {
   className?: string
   placeholder: string
}

export function SelectValue({ className, placeholder }: Readonly<SelectValueProps>) {
   const { selected } = useSelect()

   return <span className={cn("text-md font-bold", className)}> {selected.name || placeholder}</span>
}
