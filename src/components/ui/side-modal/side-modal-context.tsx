"use client"

import { createContext, useContext } from "react"

interface SideModalContextProps {
   isOpen: boolean
   open: () => void
   close: () => void
}

export const SideModalContext = createContext<SideModalContextProps | null>(null)

export const useSideModal = () => {
   const ctx = useContext(SideModalContext)
   if (!ctx) {
      throw new Error("useSideModal must be used within a SideModalProvider")
   }
   return ctx
}
