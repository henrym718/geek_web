import PublicLayout from "@/app/components/layout/PublicLayout"

export default function Layout(props: Readonly<React.PropsWithChildren>) {
   return <PublicLayout>{props.children}</PublicLayout>
}
