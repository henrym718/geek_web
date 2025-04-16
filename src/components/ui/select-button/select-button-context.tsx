"use client"

import { createContext, useContext } from "react"

interface SelectButtonContextProps {
   selected: { id: string; name: string }
   setSelected: (selected: { id: string; name: string }) => void
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
   triggerRef: React.RefObject<HTMLButtonElement | null>
}

export const SelectButtonContext = createContext<SelectButtonContextProps | null>(null)

export function useSelect() {
   const ctx = useContext(SelectButtonContext)
   if (!ctx) {
      throw new Error("useSelect must be used within a SelectProvider")
   }
   return ctx
}
