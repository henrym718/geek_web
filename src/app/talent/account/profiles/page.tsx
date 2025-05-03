import { cookies } from "next/headers"
import { fetchVendorProfilesByAccessToken } from "@/data/api/services/vendor-profile.service"
import { CardListTalent } from "@/components/project/CardListTalent/CardListTalent"
import { Box, Typography } from "@/components/ui"
import { AddProfileButton } from "@/components/project/AddProfileButton/AddProfileButton"

export default async function ProfilesPage() {
   // Obtenemos el token de las cookies
   const accessToken = (await cookies()).get("accessToken")?.value as string

   // Obtener los perfiles del vendedor, pasando el token
   const response = await fetchVendorProfilesByAccessToken(accessToken)

   // Si la respuesta es exitosa, usamos los datos, si no, mostramos un array vacío
   const data = response.success ? response.data : []

   return (
      <Box className="flex flex-col gap-4">
         <Box className="flex justify-between items-center">
            <Typography
               variant="subtitulo2"
               className="pb-4">
               Perfiles
            </Typography>

            <AddProfileButton />
         </Box>
         <Box className="grid grid-cols-3 gap-4">
            <CardListTalent talents={data} />
         </Box>
      </Box>
   )
}
