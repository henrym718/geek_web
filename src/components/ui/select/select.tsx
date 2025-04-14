/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import { SelectContext } from "./select-context"

interface SelectProps {
   children: React.ReactNode
   value: { id: string; name: string }
   onChange: (value: { id: string; name: string }) => void
}

export interface SelectRef {
   close: () => void
}

export const Select = forwardRef<SelectRef, SelectProps>(({ children, value, onChange }, ref) => {
   const [isOpen, setIsOpen] = useState(false)
   const triggerRef = useRef<HTMLButtonElement>(null)

   useImperativeHandle(ref, () => ({
      close: () => setIsOpen(false),
   }))

   const contextValue = useMemo(
      () => ({
         selected: value,
         setSelected: onChange,
         isOpen,
         setIsOpen,
         triggerRef,
      }),
      [value, isOpen]
   )

   return (
      <SelectContext.Provider value={contextValue}>
         <div className="relative w-full">{children}</div>
      </SelectContext.Provider>
   )
})

Select.displayName = "Select"
