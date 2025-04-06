import { verifyToken } from "@/app/lib/utils/verifyToken"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import ProfilesTable from "@/app/components/features/vendor/profiles/ProfilesTable"
import { getVendorProfiles } from "@/app/services/vendor/vendor.services"

interface ProfilesProps {
   params: {
      username: string
   }
}

export default async function Profiles(props: ProfilesProps) {
   const { username } = await props.params

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
   const vendorProfiles = await getVendorProfiles(accessToken)
   console.log(vendorProfiles, "vendorProfiles")

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
