import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { ProfilesTable } from "@/components/vendor/profiles-panel/profiles-table"
import { fetchVendorProfilesByAccessToken } from "@/services/vendor-profile.service"
import { verifyToken } from "@/lib/utils/verifyToken"

interface ProfilesProps {
   params: {
      username: string
   }
}

export default async function ProfilesPage(props: ProfilesProps) {
   const { username } = props.params

   // Obtenemos el token de las cookies
   const accessToken = (await cookies()).get("accessToken")?.value as string
   if (!accessToken) {
      redirect("/") // Si no hay token, redirige al login
   }

   // Verificamos el token
   const fromToken = await verifyToken(accessToken)

   // Comprobamos si el username en la URL coincide con el del token
   if (username !== fromToken.username) {
      redirect("/") // Redirige si no coincide
   }

   // Obtener los perfiles del vendedor, pasando el token
   const vendorProfiles = await fetchVendorProfilesByAccessToken(accessToken)

   // Si la respuesta es exitosa, usamos los datos, si no, mostramos un array vacío
   const data = vendorProfiles.success ? vendorProfiles.data : []

   return (
      <div>
         <ProfilesTable
            data={data}
            username={username}
         />
      </div>
   )
}
