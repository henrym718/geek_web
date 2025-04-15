import { cn } from "@/lib/utils/cn"

interface InputRadioProps {
   children: React.ReactNode
   name: string
   value: string
   className?: string
}

export function InputRadio({ children, name, value, className }: Readonly<InputRadioProps>) {
   return (
      <label className="items-center gap-2 cursor-pointer inline-flex">
         <input
            type="radio"
            name={name}
            value={value}
            className={cn("accent-black", className)}
         />
         {children}
      </label>
   )
}
