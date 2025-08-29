import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { HelpCircle } from "lucide-react"

type LucideIconName = keyof typeof LucideIcons

interface IconProps {
   name: LucideIconName
   size?: number
   color?: string
   className?: string
   strokeWidth?: number
   [key: string]: any
}

export function Icon(props: IconProps) {
   const { name, size = 24, color = "currentColor", className, strokeWidth = 2, ...rest } = props

   const IconComponent = LucideIcons?.[name] as LucideIcon

   if (!IconComponent) {
      return (
         <HelpCircle
            size={size}
            color="gray"
            strokeWidth={strokeWidth}
            className={className}
            {...props}
         />
      )
   }

   return (
      <IconComponent
         size={size}
         color={color}
         strokeWidth={strokeWidth}
         className={className}
         {...props}
      />
   )
}
