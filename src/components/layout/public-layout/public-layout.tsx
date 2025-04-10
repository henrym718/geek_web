import { Box } from "@/components/ui"
import { Header } from "./header"

export default function PublicLayout({ children }: Readonly<React.PropsWithChildren>) {
   return (
      <Box className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-1">{children}</main>
         <footer>footer</footer>
      </Box>
   )
}
