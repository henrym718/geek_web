import PublicLayout from "@/components/project/Layout/public-layout/public-layout"
import "@/styles/globals.css"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return <PublicLayout>{children}</PublicLayout>
}
