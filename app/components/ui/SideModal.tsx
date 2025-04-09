"use client"

import React, { useEffect, useRef, useState } from "react"

interface SideModalProps {
   children: React.ReactNode
   trigger: React.ReactElement<{ onClick: () => void }>
}

export const SideModal = ({ children, trigger }: SideModalProps) => {
   const [isOpen, setIsOpen] = useState(false)
   const divRef = useRef<HTMLDivElement>(null)

   const openModal = () => setIsOpen(true)
   const closeModal = () => setIsOpen(false)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (event.target instanceof Node && divRef.current === event.target) {
            closeModal()
         }
      }

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            closeModal()
         }
      }

      document.body.style.overflow = "hidden"
      document.body.style.overscrollBehavior = "none"
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)

      return () => {
         document.body.style.overflow = ""
         document.body.style.overscrollBehavior = ""
         document.removeEventListener("mousedown", handleClickOutside)
         document.removeEventListener("keydown", handleEscapeKey)
      }
   }, [isOpen])

   return (
      <>
         {React.cloneElement(trigger, { onClick: openModal })}
         {isOpen && (
            <div
               className="fixed inset-0 flex justify-end bg-black/50 z-50"
               ref={divRef}>
               <div className="h-screen overflow-y-auto bg-white">{children}</div>
            </div>
         )}
      </>
   )
}
