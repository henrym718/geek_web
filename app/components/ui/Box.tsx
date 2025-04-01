import { HTMLAttributes } from "react"

export const Box: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}
