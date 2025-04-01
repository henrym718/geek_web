"use client"
import { useEffect } from "react"
import { useAuthStore } from "../../stores/common/auth.store"

export function UserInitializer({ children }: Readonly<React.PropsWithChildren>) {
   const { user, loadUser } = useAuthStore() // Usamos el hook aquí también para escuchar cambios
   useEffect(() => {
      if (!user) {
         loadUser() // Solo cargamos el usuario si no está disponible
      }
   }, [user, loadUser])

   return <>{children}</> // Si el usuario ya está cargado, renderizamos los niños (el resto de la aplicación)
}
