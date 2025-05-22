import "@/styles/globals.css"
import { UserInitializer } from "@/providers/user.provider"
import { lato } from "@/styles/fonts"
import { cn } from "@/lib/utils/cn"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="es">
         <UserInitializer>
            <body className={cn("", lato.className, "antialiased")}>
               <div className="max-w-[1300px] min-h-screen mx-auto">{children}</div>{" "}
            </body>
         </UserInitializer>
      </html>
   )
}
