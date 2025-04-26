import { ClientLayout } from "@/components/layout/ClientLayout/ClientLayout"

export default function ChatLayout({ children }: Readonly<React.PropsWithChildren>) {
   return <ClientLayout>{children}</ClientLayout>
}
