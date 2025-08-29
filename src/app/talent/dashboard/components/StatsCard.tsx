import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils/cn"
import * as LucideIcons from "lucide-react"

type LucideIconName = keyof typeof LucideIcons

interface StatsCardProps {
   title: string
   value: number | string
   icon: LucideIconName
   trend: string
   color: "blue" | "green" | "purple" | "orange"
}

export function StatsCard({ color = "blue", icon = "BarChart", title, trend, value }: StatsCardProps) {
   const colorClasses: Record<string, string> = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
   }

   const trendColor = trend?.startsWith("+") ? "text-green-600" : "text-gray-600"

   return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
         <div className="flex items-center justify-between mb-4">
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colorClasses?.[color] || colorClasses?.blue)}>
               <Icon
                  name={icon}
                  size={24}
               />
            </div>
         </div>
         <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className="flex items-baseline justify-between">
               <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {trend && <p className={`text-xs ${trendColor}`}>{trend}</p>}
         </div>
      </div>
   )
}
