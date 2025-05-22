import { Box } from "@/components/ui"
import { Header } from "./header"

export default function PublicLayout({ children }: Readonly<React.PropsWithChildren>) {
   return (
      <Box className="flex min-h-screen flex-col">
         <Header />
         <main className="flex-grow">{children}</main>
         <footer>footer</footer>
      </Box>
   )
}
