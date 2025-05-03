import { Typography } from "../../ui"

interface Props {
   description: string
}

export function ProjectDescription({ description }: Readonly<Props>) {
   return <Typography className="text-balance">{description}</Typography>
}
