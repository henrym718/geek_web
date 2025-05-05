import Link from "next/link"
import { Divider } from "@/components/ui"
import { useSessionDataStore } from "@/stores/user-session-data.store"

interface Props {
   closeMenu: () => void
}

export function TalentMenu({ closeMenu }: Readonly<Props>) {
   const { logout } = useSessionDataStore()

   const handleLogout = async () => {
      await logout()
      closeMenu()
   }

   return (
      <ul className="flex flex-col text-sm select-none rounded-lg border border-border py-4 bg-white shadow-md">
         <Link href="/talent/account/profiles">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Mis perfiles</li>
         </Link>

         <Link href="/talent/account/projects">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Ofrecer mis servicios</li>
         </Link>

         <Link href="/chat">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Mensajes</li>
         </Link>

         <Divider />

         <Link href="/talent/account/create">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Crear un perfil</li>
         </Link>

         <Divider />

         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Centro de ayuda</li>
         </Link>

         <Link href="/">
            <li
               className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5"
               onClick={handleLogout}>
               Cerrar sesión
            </li>
         </Link>
      </ul>
   )
}
