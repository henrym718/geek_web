import "@/styles/globals.css"
import { UserInitializer } from "@/providers/user.provider"
import { lato } from "@/styles/fonts"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="es">
         <UserInitializer>
            <body className={`${lato.className} antialiased`}>{children} </body>
         </UserInitializer>
      </html>
   )
}
