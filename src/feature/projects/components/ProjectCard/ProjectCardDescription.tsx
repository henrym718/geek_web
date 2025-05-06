import { Typography } from "../../../../components/ui"

interface Props {
   description: string
}

export function ProjectCardDescription({ description }: Readonly<Props>) {
   return <Typography className="text-balance">{description}</Typography>
}
