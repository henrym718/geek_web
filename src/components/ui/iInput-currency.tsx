"use client"
import { useState } from "react"
import { InputField, InputFieldProps } from "./input-field"
import { cn } from "@/lib/utils/cn"

interface InputCurrencyProps extends Omit<InputFieldProps, "onChange" | "inputMode" | "type" | "placeholder"> {
   onSelected?: (value: string) => void
}

export const InputCurrency = (props: InputCurrencyProps) => {
   const { onSelected, className, ...rest } = props
   const [value, setValue] = useState("")

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value.replace(/\D/g, "")
      const limit = raw.slice(0, 6)
      const numberValue = (parseInt(limit || "0", 10) / 100).toFixed(2)
      setValue(numberValue)
      onSelected?.(numberValue)
   }

   return (
      <div className="relative flex items-center">
         <span className="absolute left-3 top-11 -translate-y-1/2 text-gray-500">$</span>
         <InputField
            className={cn("pl-6", className)}
            value={props.value ?? value}
            onChange={handleChange}
            placeholder="0.00"
            type="text"
            inputMode="numeric"
            {...rest}
         />
      </div>
   )
}
