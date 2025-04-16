"use client"

import { cn } from "@/lib/utils/cn"
import { useSelect } from "./select-button-context"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode
   className?: string
}

export function SelectButtonTrigger({ children, className, ...props }: Readonly<SelectTriggerProps>) {
   const { isOpen, setIsOpen, triggerRef } = useSelect()

   return (
      <button
         type="button"
         ref={triggerRef}
         className={cn(
            "w-full border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border-black/15 rounded-md p-2 cursor-pointer hover:bg-black/3",
            className
         )}
         onClick={() => setIsOpen(!isOpen)}
         {...props}>
         <div className="flex items-center justify-center gap-2">
            {children}
            <IoIosArrowDown
               data-visible={isOpen}
               className="data-[visible=false]:block hidden"
            />
            <IoIosArrowUp
               data-visible={isOpen}
               className="data-[visible=true]:block hidden"
            />
         </div>
      </button>
   )
}
