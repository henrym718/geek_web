// RequestPage.tsx
import { Box, Typography } from "@/components/ui"
import { RequestList } from "@/components/vendor/request-panel/request-list"
import { FilterRequestsTabs } from "@/components/vendor/request-panel/filter-requests-tabs"
import { ProfileSelector } from "@/components/vendor/request-panel/profile-selector"

const tabs = [
   { label: "Recomendados", value: "recommended" },
   { label: "Recientes", value: "recent" },
   { label: "Guardados", value: "saved" },
]

export default async function RequestPage() {
   return (
      <Box className="flex flex-col gap-4 w-3/4 mx-auto">
         <Box className="flex gap-4 justify-between items-center border-b border-black/10 pb-4">
            <FilterRequestsTabs tabs={tabs} />
            <ProfileSelector />
         </Box>
         <Typography
            className="px-4"
            variant="mensaje">
            Descubre oportunidades laborales que se ajustan a tu perfil y a las necesidades de los empleadores.
         </Typography>
         <RequestList />
      </Box>
   )
}
