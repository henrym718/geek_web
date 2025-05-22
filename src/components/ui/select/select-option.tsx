import { cn } from "@/lib/utils/cn"

export function SelectOption(props: Readonly<React.OptionHTMLAttributes<HTMLOptionElement>>) {
   const { children, value, className, ...rest } = props
   return (
      <option
         value={value}
         className={cn("w-full", className)}
         {...rest}>
         {children}
      </option>
   )
}
