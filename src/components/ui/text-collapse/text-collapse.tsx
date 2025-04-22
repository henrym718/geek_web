import { useState } from "react"
import { Box } from "../box"
import { Typography, TypographyProps } from "../typography"

interface TextCollapseProps extends TypographyProps {
   maxLength: number
}

export default function TextCollapse({ maxLength, children, ...props }: Readonly<TextCollapseProps>) {
   const childrenString = JSON.stringify(children)
   const [showFullDescription, setShowFullDescription] = useState(false)
   const shouldShowMore = childrenString && childrenString.length > maxLength

   const text = showFullDescription || !shouldShowMore ? childrenString : childrenString.slice(0, maxLength) + "..."

   return (
      <Box className="flex flex-col gap-1">
         <Typography {...props}>{text}</Typography>
         {shouldShowMore && (
            <Typography
               className="inline-flex cursor-pointer w-fit"
               variant="enlace"
               onClick={() => setShowFullDescription(!showFullDescription)}>
               {showFullDescription ? "Ver menos" : "Ver más"}
            </Typography>
         )}
      </Box>
   )
}
