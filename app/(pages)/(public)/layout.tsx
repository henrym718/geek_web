import PublicLayout from "@/app/components/layout/PublicLayout"
import React from "react"

export default function Layout(props: Readonly<React.PropsWithChildren>) {
   return <PublicLayout>{props.children}</PublicLayout>
}
