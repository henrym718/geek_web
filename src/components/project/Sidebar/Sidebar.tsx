"use client"

import { HomeIcon } from "lucide-react"
import { Avatar, Button, Typography } from "../../ui"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSessionDataStore } from "@/stores/user-session-data.store"

interface Props {
   user: {
      name: string
      email: string
      avatarUrl: string
   }
   dashboardLink: {
      href: string
   }
   navigationLinks: {
      label: string
      href: string
      icon: React.ElementType
   }[]
}

export function Sidebar({ user, dashboardLink, navigationLinks }: Readonly<Props>) {
   const pathname = usePathname()
   const { logout } = useSessionDataStore()
   return (
      <aside className="flex flex-col gap-4 w-1/6 min-w-[250px] h-full pl-3">
         {/* Logo */}
         <Link href="/">
            <Typography
               variant="subtitulo1"
               className="text-center">
               AppGeek S.A.
            </Typography>
         </Link>

         {/* User Info */}
         <div className="flex items-center gap-2 py-10">
            <Avatar
               size="2xl"
               src={user.avatarUrl}
               name={user.name}
            />
            <div className="flex flex-col gap-1">
               <Typography
                  variant="parrafoChico"
                  className="font-bold text-base">
                  {user.name}
               </Typography>
               <Typography variant="label">{user.email}</Typography>
            </div>
         </div>

         {/* Navigation */}
         <div className="flex flex-col gap-2 pb-5">
            <Link href={dashboardLink.href}>
               <Button
                  variant="ghost"
                  className="w-full justify-start mb-5"
                  size="md"
                  rounded="md">
                  <HomeIcon className="w-4 h-4" />
                  <span>Dashboard</span>
               </Button>
            </Link>
            {navigationLinks.map((link) => {
               const Icon = link.icon
               return (
                  <Link
                     href={link.href}
                     key={link.label}>
                     <Button
                        data-active={pathname === link.href}
                        variant="ghost"
                        className="w-full justify-start data-[active=true]:bg-neutral-700 data-[active=true]:rounded-xl data-[active=true]:text-white data-[active=true]:font-normal"
                        size="md"
                        rounded="md">
                        <Icon className="w-4 h-4" />
                        <span>{link.label}</span>
                     </Button>
                  </Link>
               )
            })}
         </div>

         {/* Logout at the bottom */}
         <div className="mt-auto pb-10">
            <Button
               variant="outline"
               size="md"
               rounded="md"
               className="w-full"
               onClick={() => logout()}>
               Cerrar Sesión
            </Button>
         </div>
      </aside>
   )
}
