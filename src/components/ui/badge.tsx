import { cn } from "@/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const BadgeVariants = cva(["rounded-3xl", "px-4", "py-2", "inline-flex", "font-bold"], {
   variants: {
      variant: {
         surface: "bg-black/8 text-gray-900",
      },
      size: {
         small: "text-xs",
         medium: "text-sm",
         large: "text-base",
      },
   },
   defaultVariants: {
      variant: "surface",
      size: "small",
   },
})
interface BadgeProps {
   variant?: VariantProps<typeof BadgeVariants>["variant"]
   size?: VariantProps<typeof BadgeVariants>["size"]
   children: React.ReactNode
}

export const Badge = (props: BadgeProps) => {
   const { variant, size, children } = props
   return <span className={cn(BadgeVariants({ variant, size }))}>{children}</span>
}
