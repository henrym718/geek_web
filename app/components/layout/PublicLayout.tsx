import React from "react"
import { Box } from "../ui"
import Header from "../common/header/Header"

export default function PublicLayout({ children }: Readonly<React.PropsWithChildren>) {
   return (
      <Box className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-1">{children}</main>
         <footer>footer</footer>
      </Box>
   )
}
