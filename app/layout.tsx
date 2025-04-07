import "@/app/styles/globals.css"
import { UserInitializer } from "@/app/lib/initializers/user.initializer"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="es">
         <UserInitializer>
            <body>{children} </body>
         </UserInitializer>
      </html>
   )
}
