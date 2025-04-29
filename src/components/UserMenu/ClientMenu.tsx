import Link from "next/link"
import { Divider } from "../ui"

export function ClientMenu() {
   return (
      <ul className="flex flex-col text-sm select-none rounded-lg border border-border py-4 bg-white shadow-md">
         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Profile</li>
         </Link>

         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Ver mis proyectos</li>
         </Link>

         <Link href="/register">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Mensajes</li>
         </Link>

         <Divider />

         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Publicar un Proyecto:</li>
         </Link>

         <Divider />

         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Centro de ayuda</li>
         </Link>

         <Link href="/login">
            <li className="hover:bg-gray-100 transition-all duration-300 rounded-md px-3 py-2.5">Cerrar sesión</li>
         </Link>
      </ul>
   )
}
