"use client"

import { useEffect, useRef } from "react"
import { useModal } from "./context"
import { cn } from "@/lib/utils/cn"

interface ModalContentProps {
   children: (close: () => void) => React.ReactElement
   className?: string
   classNameContent?: string
}

export function ModalContent({ children, className, classNameContent }: Readonly<ModalContentProps>) {
   const { isOpen, closeModal } = useModal()
   const modalRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (event.target instanceof Node && modalRef.current === event.target) {
            closeModal()
         }
      }

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            closeModal()
         }
      }

      if (isOpen) {
         document.body.style.overflow = "hidden" // Evita el scroll de la página
         document.body.style.overscrollBehavior = "none"
         document.addEventListener("mousedown", handleClickOutside)
         document.addEventListener("keydown", handleEscapeKey)
      }

      return () => {
         document.body.style.overflow = "" // Restaura el scroll de la página
         document.body.style.overscrollBehavior = ""
         document.removeEventListener("mousedown", handleClickOutside)
         document.removeEventListener("keydown", handleEscapeKey)
      }
   }, [isOpen, closeModal])

   return (
      <>
         {isOpen && (
            <div
               className={cn("fixed inset-0 bg-[rgba(0,0,0,.65)] flex items-center justify-center z-50 transition-colors duration-300", className)}
               ref={modalRef}>
               <div
                  className={cn(
                     "bg-primary-foreground overflow-hidden transform transition-transform duration-300 ease-in-out translate-y-0 animate-in slide-in-from-bottom-10",
                     classNameContent
                  )}>
                  {children(closeModal)}
               </div>
            </div>
         )}
      </>
   )
}
