import { cn } from "@/app/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const dividerVariants = cva(["w-full text-white"], {
   variants: {
      variant: {
         solid: "solid",
         dashed: "dashed",
      },
      thickness: {
         thin: "h-[1px]",
         medium: "h-[2px]",
         thick: "h-[3px]",
      },
      color: {
         gray: "bg-black/10",
         white: "bg-white",
         black: "bg-black",
      },
      marginVertical: {
         sm: "my-2",
         md: "my-4",
         lg: "my-6",
      },
      marginHorizontal: {
         sm: "mx-2",
         md: "mx-4",
         lg: "mx-6",
      },
      orientation: {
         vertical: "h-full",
         horizontal: "w-full",
      },
      length: {
         full: "w-full",
         half: "w-1/2",
         quarter: "w-1/4",
         threeQuarters: "w-3/4",
      },
   },
   defaultVariants: {
      variant: "solid",
      thickness: "thin",
      color: "gray",
      marginVertical: "sm",
      orientation: "horizontal",
      length: "full",
   },
})

interface DividerProps {
   variant?: VariantProps<typeof dividerVariants>["variant"]
   thickness?: VariantProps<typeof dividerVariants>["thickness"]
   color?: VariantProps<typeof dividerVariants>["color"]
   marginVertical?: VariantProps<typeof dividerVariants>["marginVertical"]
   marginHorizontal?: VariantProps<typeof dividerVariants>["marginHorizontal"]
   orientation?: VariantProps<typeof dividerVariants>["orientation"]
   length?: VariantProps<typeof dividerVariants>["length"]
}

export const Divider = (props: DividerProps) => {
   const { variant, thickness, color, marginVertical, marginHorizontal, orientation, length } = props

   return <div className={cn(dividerVariants({ variant, thickness, color, marginVertical, marginHorizontal, orientation, length }))}>.</div>
}
