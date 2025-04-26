"use client"

import { Sidebar } from "@/components/sidebar/Sidebar"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { FaRegMessage } from "react-icons/fa6"
import { FiGitPullRequest } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"

export function ClientLayout({ children }: Readonly<React.PropsWithChildren>) {
   const data = useSessionDataStore((state) => state.user)

   const user = data?.client || data?.vendor

   const navigationLinks = [
      {
         label: "Solicitudes",
         href: "/client/account/request-panel",
         icon: FiGitPullRequest,
      },
      {
         label: "Chat",
         href: "/chat",
         icon: FaRegMessage,
      },
      {
         label: "Configuración",
         href: "/client/account/settings",
         icon: IoSettingsOutline,
      },
   ]

   return (
      <div className="flex h-screen w-full gap-4 py-4">
         <Sidebar
            user={{
               name: `${user?.firstName} ${user?.lastName}`,
               email: data?.user.email || "",
               avatarUrl: user?.photo ?? "",
            }}
            dashboardLink={{ href: "/client/dashboard" }}
            navigationLinks={navigationLinks}
         />
         <main className="flex-1 px-10">{children}</main>
      </div>
   )
}
