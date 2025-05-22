import { cn } from "@/lib/utils/cn"

interface InputRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
   children: React.ReactNode
   className?: string
}

export function InputRadio({ children, className, ...props }: Readonly<InputRadioProps>) {
   return (
      <label className="items-center gap-2 cursor-pointer inline-flex">
         <input
            type="radio"
            className={cn("accent-black", className)}
            {...props}
         />
         {children}
      </label>
   )
}
