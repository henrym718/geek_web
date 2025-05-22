/**
 * Componente Modal reutilizable.
 *
 * Permite abrir y cerrar un modal de manera controlada con un trigger personalizado.
 * Implementa detección de clics fuera del modal y cierre con la tecla "Escape".
 * Bloquea el desplazamiento de la página cuando el modal está abierto.
 */

"use client"
import { cn } from "@/lib/utils/cn"
import { cloneElement, ReactElement, ReactNode, useEffect, useRef, useState } from "react"

/**
 * Props del componente Modal.
 * - `children`: Contenido del modal.
 * - `trigger`: Elemento que activa la apertura del modal al hacer clic.
 * - `className`: Clases adicionales para personalización del modal.
 */
interface Props {
   children?: ReactNode
   trigger: ReactElement<{ onClick: () => void; className?: string }>
   className?: string
}

/**
 * Componente Modal.
 * - Renderiza un botón o cualquier otro elemento `trigger` que abre el modal.
 * - Captura clics fuera del modal y la tecla "Escape" para cerrarlo.
 */
export function Modal({ children, trigger, className }: Readonly<Props>) {
   const [isOpen, setIsOpen] = useState(false) // Estado del modal (abierto/cerrado)
   const modalRef = useRef<HTMLDivElement | null>(null) // Referencia al modal para detectar clics externos

   // Función para abrir el modal
   const openModal = () => setIsOpen(true)

   // Función para cerrar el modal
   const closeModal = () => setIsOpen(false)

   /**
    * Clona el trigger y le agrega la funcionalidad de abrir el modal al hacer clic.
    * Esto permite reutilizar cualquier botón o elemento como activador del modal.
    */
   const triggerWithOpenAction =
      trigger &&
      cloneElement(trigger, {
         onClick: openModal,
         className: `${trigger.props.className} outline-none focus:outline-nose`,
      })

   /**
    * Efecto que gestiona eventos de cierre del modal:
    * - Cierra el modal si el usuario hace clic fuera del contenido del modal.
    * - Cierra el modal si el usuario presiona la tecla "Escape".
    * - Bloquea el desplazamiento de la página mientras el modal está abierto.
    */
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
   }, [isOpen])

   return (
      <>
         {triggerWithOpenAction}
         {isOpen && (
            <div
               className="fixed inset-0 bg-[rgba(0,0,0,.65)] flex items-center justify-center z-50"
               ref={modalRef}>
               <div
                  className={cn(
                     "bg-primary-foreground rounded-md overflow-hidden transform transition-transform duration-300 ease-in-out",
                     className
                  )}>
                  {children}
               </div>
            </div>
         )}
      </>
   )
}
