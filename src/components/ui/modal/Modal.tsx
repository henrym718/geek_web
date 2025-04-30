"use client"

import { PropsWithChildren, useMemo, useState } from "react"
import { ModalContext } from "./context"

export function Modal({ children }: Readonly<PropsWithChildren>) {
   const [isOpen, setIsOpen] = useState(false)

   const openModal = () => setIsOpen(true)
   const closeModal = () => setIsOpen(false)

   const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen])

   return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
