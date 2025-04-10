/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import avatarPlaceholder from "../../../public/avatar-placeholder.svg"

const avatarVariants = cva(["rounded-full", "object-cover", "object-center", "border-2", "border-white"], {
   variants: {
      size: {
         sm: "w-6 h-6",
         md: "w-8 h-8",
         lg: "w-10 h-10",
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
}

export function Avatar(props: Readonly<AvatarProps>) {
   const { size, className, src, alt, ...rest } = props
   return (
      <img
         className={cn(avatarVariants({ size }), className)}
         src={src ?? avatarPlaceholder.src}
         alt={alt}
         {...rest}
      />
   )
}
