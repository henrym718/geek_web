"use client"

import { Box, Button } from "@/app/components/ui"
import { useRouter } from "next/navigation"
import { GetVendorProfileResponse } from "@/app/types/dtos/get-vendor-profile"
interface ProfilesTableProps {
   data: GetVendorProfileResponse[]
   username: string
}

const ProfilesTable: React.FC<ProfilesTableProps> = ({ data, username }) => {
   const router = useRouter()
   return (
      <Box className="flex flex-col gap-4 w-1/2 mx-auto">
         <Box className="flex justify-end pr-6">
            <Button
               variant="outline"
               rounded="sm"
               onClick={() => router.push(`/vendor/${username}/create/`)}>
               Crear perfil
            </Button>
         </Box>
         <table className="w-full text-left">
            <thead>
               <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Actualización</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {data.map((profile) => (
                  <tr key={profile.id}>
                     <td>{profile.title}</td>
                     <td>{profile.category.name}</td>
                     <td> {new Date(profile.createdAt).toLocaleDateString("es-ES")}</td>
                     <td> {new Date(profile.updatedAt).toLocaleDateString("es-ES")}</td>
                     <td>
                        <Button
                           variant="outline"
                           rounded="sm">
                           Ver
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Box>
   )
}

export default ProfilesTable
