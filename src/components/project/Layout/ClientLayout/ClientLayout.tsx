"use client"

import { Sidebar } from "@/components/project/Sidebar/Sidebar"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { MessageCircle } from "lucide-react"
import { FiGitPullRequest } from "react-icons/fi"

export function ClientLayout({ children }: Readonly<React.PropsWithChildren>) {
   const data = useSessionDataStore((state) => state.user)

   const user = data?.client || data?.vendor

   const navigationLinks = [
      {
         label: "Proyectos",
         href: "/client/account/projects",
         icon: FiGitPullRequest,
      },
      {
         label: "Mensajes",
         href: "/client/account/chat",
         icon: MessageCircle,
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
         <main className="w-full h-[calc(100vh-10rem)] bg-zinc-100 rounded-2xl ml-9 mt-7 overflow-hidden p-8">{children}</main>
      </div>
   )
}
