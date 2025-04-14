"use client"

import { createContext, useContext } from "react"

interface SelectContextProps {
   selected: { id: string; name: string }
   setSelected: (selected: { id: string; name: string }) => void
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
   triggerRef: React.RefObject<HTMLButtonElement | null>
}

export const SelectContext = createContext<SelectContextProps | null>(null)

export function useSelect() {
   const ctx = useContext(SelectContext)
   if (!ctx) {
      throw new Error("useSelect must be used within a SelectProvider")
   }
   return ctx
}
