import { cn } from "../../lib/utils/cn"
import { HTMLAttributes } from "react"

export function Skeleton({ className, ...props }: Readonly<HTMLAttributes<HTMLDivElement>>) {
   return (
      <div
         className={cn("animate-pulse rounded-md bg-gray-200", className)}
         {...props}
      />
   )
}
