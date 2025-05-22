"use client"

import { Sidebar } from "@/components/project/Sidebar/Sidebar"
import { Box } from "@/components/ui"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { MessageCircle, NotebookPen, UsersRound } from "lucide-react"

const TALENT_NAVIGATION_LINKS = [
   {
      label: "Mensajes",
      href: "/talent/account/chat",
      icon: MessageCircle,
   },
   {
      label: "Perfiles",
      href: "/talent/account/profiles",
      icon: UsersRound,
   },
   {
      label: "Proyectos",
      href: "/talent/account/projects",
      icon: NotebookPen,
   },
]

export function TalentLayout({ children }: Readonly<React.PropsWithChildren>) {
   const data = useSessionDataStore((state) => state.user)
   const talent = data?.vendor

   return (
      <Box className="flex h-screen w-full gap-4 py-4">
         <aside>
            <Sidebar
               user={{
                  name: `${talent?.firstName} ${talent?.lastName}`,
                  email: data?.user.email || "",
                  avatarUrl: talent?.photo ?? "",
               }}
               dashboardLink={{ href: "/talent/dashboard" }}
               navigationLinks={TALENT_NAVIGATION_LINKS}
            />
         </aside>
         <main className="w-full h-[calc(100vh-10rem)] bg-zinc-100 rounded-2xl ml-9 mt-7 overflow-y-auto p-8">{children}</main>
      </Box>
   )
}
