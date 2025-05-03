/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import { SelectButtonContext } from "./context"

interface SelectProps {
   children: React.ReactNode
   selected: { id: string; name: string }
   onChange: (value: { id: string; name: string }) => void
}

export interface SelectRef {
   close: () => void
}

export const SelectButton = forwardRef<SelectRef, SelectProps>(({ children, selected, onChange }, ref) => {
   const [isOpen, setIsOpen] = useState(false)
   const triggerRef = useRef<HTMLButtonElement | null>(null)

   useImperativeHandle(ref, () => ({
      close: () => setIsOpen(false),
   }))

   const contextValue = useMemo(
      () => ({
         selected,
         onChange,
         isOpen,
         setIsOpen,
         triggerRef,
      }),
      [selected, isOpen]
   )
   return (
      <SelectButtonContext.Provider value={contextValue}>
         <div className="relative w-full">{children}</div>
      </SelectButtonContext.Provider>
   )
})

SelectButton.displayName = "SelectButton"
