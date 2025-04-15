"use client"
import { useEffect } from "react"
import { useSessionDataStore } from "../stores/user-session-data.store"

export function UserInitializer({ children }: Readonly<React.PropsWithChildren>) {
   const { user, loadUser } = useSessionDataStore() // Usamos el hook aquí también para escuchar cambios
   console.log("INIZIALITER ", user)
   useEffect(() => {
      if (!user) {
         loadUser() // Solo cargamos el usuario si no está disponible
      }
   }, [user, loadUser])

   return <>{children}</> // Si el usuario ya está cargado, renderizamos los niños (el resto de la aplicación)
}
