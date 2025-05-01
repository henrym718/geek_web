/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { UserRound } from "lucide-react"

const avatarVariants = cva(["rounded-full", "object-cover", "object-center", "flex", "items-center", "justify-center"], {
   variants: {
      size: {
         sm: "w-7 h-7",
         md: "w-8 h-8",
         lg: "w-10 h-10",
         xl: "w-12 h-12",
         "2xl": "w-14 h-14",
         "3xl": "w-16 h-16",
         "4xl": "w-18 h-18",
         "5xl": "w-20 h-20",
         "6xl": "w-22 h-22",
         "7xl": "w-24 h-24",
         "8xl": "w-26 h-26",
         "9xl": "w-28 h-28",
         "10xl": "w-30 h-30",
         "11xl": "w-32 h-32",
         "12xl": "w-34 h-34",
         "13xl": "w-36 h-36",
         "14xl": "w-38 h-38",
         "15xl": "w-40 h-40",
      },
   },
   defaultVariants: {
      size: "md",
   },
})

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
   size?: VariantProps<typeof avatarVariants>["size"]
   src?: string
   alt?: string
   name?: string
}

export function Avatar(props: Readonly<AvatarProps>) {
   const { size, className, src, alt, name, ...rest } = props

   if (src) {
      return (
         <div className={cn(avatarVariants({ size }), "rounded-full bg-primary/60 p-1 text-white flex items-center justify-center", className)}>
            <img
               className={cn(avatarVariants({ size }), className)}
               src={src}
               alt={alt}
               {...rest}
            />
         </div>
      )
   }

   if (name) {
      return (
         <div className={cn(avatarVariants({ size }), "rounded-full bg-primary text-white flex items-center justify-center", className)}>
            <span>{name.split("")[0].toUpperCase()}</span>
         </div>
      )
   }

   return (
      <div className={cn(avatarVariants({ size }), "rounded-full bg-primary/60 p-1 text-white flex items-center justify-center", className)}>
         <UserRound
            size={24}
            strokeWidth={2}
         />
      </div>
   )
}
