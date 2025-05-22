import { Typography } from "../../../../components/ui"

interface Props {
   description: string
}

export function ProjectCardDescription({ description }: Readonly<Props>) {
   return <Typography>{description}</Typography>
}
