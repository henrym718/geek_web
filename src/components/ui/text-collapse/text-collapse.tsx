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
      <Box>
         <Typography {...props}>
            {text}
            <Typography
               data-collapsed={shouldShowMore}
               className="cursor-pointer data-[collapsed=true]:block data-[collapsed=false]:hidden"
               variant="enlace"
               onClick={() => setShowFullDescription(!showFullDescription)}>
               {showFullDescription ? "Ver menos" : "Ver más"}
            </Typography>
         </Typography>
      </Box>
   )
}
