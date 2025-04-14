/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { useSideModal } from "./context-modal"

interface ContentSideModalProps {
   children: (close: () => void) => React.ReactNode
}

export function ContentSideModal({ children }: Readonly<ContentSideModalProps>) {
   const overlayRef = useRef<HTMLDivElement>(null)
   const { close, isOpen } = useSideModal()

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (event.target instanceof Node && overlayRef.current === event.target) {
            close()
         }
      }

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            close()
         }
      }

      document.body.style.overflow = "hidden"
      document.body.style.overscrollBehavior = "none"
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)

      return () => {
         document.body.style.overflow = ""
         document.removeEventListener("mousedown", handleClickOutside)
         document.removeEventListener("keydown", handleEscapeKey)
      }
   }, [isOpen])

   return (
      <>
         {isOpen && (
            <div
               className="fixed inset-0 flex justify-end bg-black/50 z-50"
               ref={overlayRef}>
               <div className="h-screen overflow-y-auto bg-white">{children(close)}</div>
            </div>
         )}
      </>
   )
}
