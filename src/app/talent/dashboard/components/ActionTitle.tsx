import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils/cn"
import * as LucideIcons from "lucide-react"
import Link from "next/link"
type LucideIconName = keyof typeof LucideIcons

interface ActionTitleProps {
   title: String
   description: string
   icon: LucideIconName
   link: string
   badge: string
   color: "primary" | "blue" | "green" | "orange" | "purple"
}

export function ActionTitle({ badge, color, description, icon, link, title }: ActionTitleProps) {
   const colorClasses = {
      primary: "bg-primary/10 text-primary border-primary/20",
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
   }

   const badgeClasses = {
      primary: "bg-primary text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      orange: "bg-orange-500 text-white",
      purple: "bg-purple-500 text-white",
   }

   return (
      <Link
         href={link}
         className="group bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200">
         <div className="flex items-start justify-between mb-4">
            <div
               className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200",
                  colorClasses?.[color] || colorClasses.primary
               )}>
               <Icon
                  name={icon}
                  size={24}
               />
            </div>
            {badge && (
               <span className={cn("px-2 py-1 text-xs font-medium rounded-full", badgeClasses?.[color] || badgeClasses?.primary)}>{badge}</span>
            )}
         </div>

         <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
         </div>

         <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm font-medium mr-2">Ver más</span>
            <Icon
               name="ArrowRight"
               size={16}
            />
         </div>
      </Link>
   )
}
