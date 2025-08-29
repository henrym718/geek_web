import { Box, Typography } from "@/components/ui"
import { fetchOwnerProfiles } from "@/data/talent/services"
import { ProjectListTalent } from "@/feature/projects/components/ProjectList/ProjectListTalent"
import { ProfileTalentSelectorButton } from "@/feature/talent/components/ProfileTalentSelectorButton/ProfileTalentSelectorButton"
import { getAccessTokenFromCookie } from "@/lib/utils/getAccessTokenFromCookie"
import { Suspense } from "react"

export default async function AvailableProjectsPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
   const { id } = await searchParams

   const ownerProfilesResponse = await fetchOwnerProfiles(await getAccessTokenFromCookie())
   const ownerProfiles = ownerProfilesResponse.success ? ownerProfilesResponse.data : []

   // Parseo las opciones de los perfiles para el selector
   const profileOptions = ownerProfiles.map((profile) => ({
      value: profile.id,
      name: profile.title,
   }))

   return (
      <div className="flex flex-col gap-4 w-full px-4 min-h-screen">
         <header className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
               <Typography variant="titulo2">Matching Profesional</Typography>
               <Typography variant="mensaje">
                  Descubre oportunidades laborales que se ajustan a tu perfil y a las necesidades de los empleadores.
               </Typography>
            </div>
         </header>

         {/* 
            El motivo por el que no te funciona el prefijo "md:" es porque el elemento <main> no tiene la clase "flex" por defecto.
            El modificador "md:flex-row" solo aplica si el elemento ya es un flex container.
            Debes agregar "flex" para que "md:flex-row" tenga efecto.
         */}
         <main className="flex flex-col md:flex-row">
            <ProfileTalentSelectorButton options={profileOptions} />
            {/* Mensaje de bienvenida */}

            {/* Lista de solicitudes */}
            <Suspense fallback={<Box className="p-4 text-center">Cargando perfiles...</Box>}>
               <ProjectListTalent profileId={id} />
            </Suspense>
         </main>
      </div>
   )
}
