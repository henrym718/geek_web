import { cn } from "@/lib/utils/cn"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
   children: React.ReactNode
}

export function Checkbox(props: Readonly<CheckboxProps>) {
   const { children, className, ...rest } = props
   return (
      <label className={cn("flex items-center gap-2", className)}>
         <input
            type="checkbox"
            className="w-5 h-5 accent-primary"
            {...rest}
         />
         <span>{children}</span>
      </label>
   )
}
