// RequestPage.tsx
import { Box, Typography } from "@/components/ui"
import { ProfileTalentSelectorButton } from "@/feature/talent/components/ProfileTalentSelectorButton/ProfileTalentSelectorButton"
import { TALENT_TABS, TOKEN_NAME } from "@/config/constants"
import { TalentProjectFilterTabs } from "@/feature/projects/components/TalentProjectFilterTabs/TalentProjectFilterTabs"
import { cookies } from "next/headers"
import { fetchVendorProfilesByAccessToken } from "@/data/api/services/vendor-profile.service"
import { Suspense } from "react"
import { ProjectListTalent } from "@/feature/projects/components/ProjectList/ProjectListTalent"

interface Props {
   searchParams: {
      profile: string
   }
}

export default async function ProjectsPage({ searchParams }: Readonly<Props>) {
   const profile = (await searchParams).profile

   // Obtener el accessToken de las cookies
   const accessToken = (await cookies()).get(TOKEN_NAME)?.value

   // Obtener los perfiles del Talento
   const profileResponse = await fetchVendorProfilesByAccessToken(accessToken)
   const talentsProfiles = profileResponse.success ? profileResponse.data : []

   // Parseo las opciones de los perfiles para el selector
   const profileOptions = talentsProfiles.map((profile) => ({
      value: profile.id,
      name: profile.title,
   }))

   return (
      <Box className="flex flex-col gap-4 w-full px-4">
         <Box className="flex gap-4 justify-between items-center border-b border-black/10 pb-4">
            {/* Tabs de filtros para mostrar proyectos segun el perfil del talento */}
            <TalentProjectFilterTabs tabs={TALENT_TABS} />
            {/* Selector para mostrar proyectos segun el perfil del talento */}
            <ProfileTalentSelectorButton options={profileOptions} />
         </Box>
         {/* Mensaje de bienvenida */}
         <Typography
            className="px-4"
            variant="mensaje">
            Descubre oportunidades laborales que se ajustan a tu perfil y a las necesidades de los empleadores.
         </Typography>
         {/* Lista de solicitudes */}
         <Suspense fallback={<Box className="p-4 text-center">Cargando perfiles...</Box>}>
            <ProjectListTalent profileId={profile} />
         </Suspense>
      </Box>
   )
}
