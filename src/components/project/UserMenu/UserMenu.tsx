"use client"

import { useSessionDataStore } from "@/stores/user-session-data.store"
import { ClientMenu } from "./ClientMenu"
import { PublicMenu } from "./PublicMenu"
import { TalentMenu } from "./TalentMenu"
import { Menu } from "lucide-react"
import { Avatar, Box } from "@/components/ui"
import { useEffect, useRef, useState } from "react"

export function UserMenu() {
   const containerRef = useRef<HTMLDivElement>(null)
   const user = useSessionDataStore((state) => state.user)
   const [isOpen, setIsOpen] = useState(false)
   const userType = user?.user.role || "PUBLIC"

   const closeMenu = () => setIsOpen(false)

   const RenderMenu: Record<string, React.ReactElement> = {
      PUBLIC: <PublicMenu />,
      CLIENT: <ClientMenu closeMenu={closeMenu} />,
      VENDOR: <TalentMenu closeMenu={closeMenu} />,
   }

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (!containerRef.current?.contains(e.target as Node)) {
            closeMenu()
         }
      }

      const handleEscapeKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            closeMenu()
         }
      }

      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)

      return () => {
         document.removeEventListener("click", handleClickOutside)
         document.removeEventListener("keydown", handleEscapeKey)
      }
   }, [isOpen])

   const name = user?.client?.firstName || user?.vendor?.firstName

   return (
      <Box className="relative z-50">
         <Box
            className="flex justify-between items-center gap-3 px-3 border border-border rounded-full p-2 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
            <Menu size={17} />
            <Avatar
               size="lg"
               name={user ? name : ""}
            />
         </Box>
         {isOpen && (
            <div
               ref={containerRef}
               className="absolute top-14 right-0 w-60 bg-background rounded-xl shadow-md transition-all duration-300">
               {RenderMenu[userType]}
            </div>
         )}
      </Box>
   )
}
