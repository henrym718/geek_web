"use client"

import { Avatar, Button, Typography } from "@/components/ui"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaRegMessage } from "react-icons/fa6"
import { FiGitPullRequest } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"

export default function RequestPanelLayout({ children }: Readonly<React.PropsWithChildren>) {
   const pathname = usePathname()

   return (
      <div className="flex h-screen w-full gap-4 py-4">
         <aside className="flex flex-col gap-4 w-1/6 min-w-[250px] pl-3">
            {/* Logo */}
            <Typography
               variant="subtitulo1"
               className="text-center">
               AppGeek S.A.
            </Typography>

            {/* Avatar */}
            <div className="flex items-center gap-2 py-10">
               <Avatar size="2xl" />
               <div className="flex flex-col gap-1">
                  <Typography
                     variant="parrafoChico"
                     className="font-bold text-base">
                     John Doe
                  </Typography>
                  <Typography variant="label">john.doe@example.com</Typography>
               </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2 pb-5">
               <Link href="/client/account">
                  <Button
                     variant="ghost"
                     className="w-full justify-start mb-5"
                     size="md"
                     rounded="md">
                     <HomeIcon className="w-4 h-4" />
                     <span>Dashboard</span>
                  </Button>
               </Link>
               <Link href="/client/account/request-panel">
                  <Button
                     data-active={pathname === "/client/account/request-panel"}
                     variant="ghost"
                     className="w-full justify-start data-[active=true]:bg-neutral-700 data-[active=true]:rounded-xl data-[active=true]:text-white data-[active=true]:font-normal"
                     size="md"
                     rounded="md">
                     <FiGitPullRequest className="w-4 h-4" />
                     <span>Solicitudes</span>
                  </Button>
               </Link>
               <Link href="/client/account/messages">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     size="md"
                     rounded="md">
                     <FaRegMessage className="w-4 h-4" />
                     <span>Messages</span>
                  </Button>
               </Link>
               <Link href="/client/account/settings">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     size="md"
                     rounded="md">
                     <IoSettingsOutline className="w-4 h-4" />
                     <span>Configuración</span>
                  </Button>
               </Link>
            </div>

            {/* Logout at the bottom */}
            <div className="mt-auto">
               <Button
                  variant="outline"
                  size="md"
                  rounded="md"
                  className="w-full">
                  Cerrar Sesión
               </Button>
            </div>
         </aside>
         <main className="flex-1 px-10">{children}</main>
      </div>
   )
}
