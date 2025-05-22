import { cn } from "@/lib/utils/cn"

export function Select(props: Readonly<React.SelectHTMLAttributes<HTMLSelectElement>>) {
   const { children, className, ...rest } = props

   return (
      <select
         className={cn(
            "bg-white text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
         )}
         {...rest}>
         {children}
      </select>
   )
}
