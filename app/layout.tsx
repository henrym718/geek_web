import "@/app/styles/globals.css"
import { UserInitializer } from "@/app/lib/initializers/user.initializer"
import { lato } from "@/app/styles/Fonts"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="es">
         <UserInitializer>
            <body className={`${lato.className} antialiased`}>{children} </body>
         </UserInitializer>
      </html>
   )
}
