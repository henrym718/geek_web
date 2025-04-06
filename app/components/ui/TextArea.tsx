import { cn } from "@/app/lib/utils/cn"
import { cva, VariantProps } from "class-variance-authority"

const textAreaVariants = cva(
   [
      "w-full",
      "transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "resize-none",
      "p-3",
   ],
   {
      variants: {
         variant: {
            default: "border border-primary",
            outline: "border border-gray-300",
            ghost: "border-none",
         },
         rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
         },
         background: {
            transparent: "bg-transparent",
            white: "bg-white",
            gray: "bg-gray-100",
         },
         fullWidth: {
            true: "w-full",
            false: "w-auto",
         },
      },
      defaultVariants: {
         variant: "default",
         rounded: "md",
         background: "transparent",
         fullWidth: true,
      },
   }
)

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   className?: string
   variant?: VariantProps<typeof textAreaVariants>["variant"]
   rounded?: VariantProps<typeof textAreaVariants>["rounded"]
   background?: VariantProps<typeof textAreaVariants>["background"]
   fullWidth?: VariantProps<typeof textAreaVariants>["fullWidth"]
}

export const TextArea = (props: TextAreaProps) => {
   const { variant, rounded, background, fullWidth, className, ...rest } = props

   return (
      <textarea
         className={cn(textAreaVariants({ variant, rounded, background, fullWidth }), className)}
         {...rest}
      />
   )
}
