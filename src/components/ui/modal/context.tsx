import { createContext, useContext } from "react"

interface ModalContextType {
   isOpen: boolean
   openModal: () => void
   closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
   const context = useContext(ModalContext)
   if (!context) {
      throw new Error("useModal must be used within a ModalProvider")
   }
   return context
}
