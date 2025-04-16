"use client"

import { useMemo, useState } from "react"
import { SideModalContext } from "./side-modal-context"

export function SideModal({ children }: Readonly<React.PropsWithChildren>) {
   const [isOpen, setIsOpen] = useState(false)

   const open = () => setIsOpen(true)
   const close = () => setIsOpen(false)

   return <SideModalContext.Provider value={useMemo(() => ({ isOpen, open, close }), [isOpen])}>{children}</SideModalContext.Provider>
}
