/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import { SelectButtonContext } from "./select-button-context"

interface SelectProps {
   children: React.ReactNode
   value: { id: string; name: string }
   onChange: (value: { id: string; name: string }) => void
}

export interface SelectRef {
   close: () => void
}

export const SelectButton = forwardRef<SelectRef, SelectProps>(({ children, value, onChange }, ref) => {
   const [isOpen, setIsOpen] = useState(false)
   const triggerRef = useRef<HTMLButtonElement | null>(null)

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
      <SelectButtonContext.Provider value={contextValue}>
         <div className="relative w-full">{children}</div>
      </SelectButtonContext.Provider>
   )
})

SelectButton.displayName = "SelectButton"
