import TextCollapse from "@/components/ui/text-collapse/text-collapse"

interface Props {
   description: string
}

export function RequestDescription({ description }: Readonly<Props>) {
   return <TextCollapse maxLength={120}>{description}</TextCollapse>
}
