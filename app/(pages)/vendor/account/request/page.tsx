// RequestPage.tsx
import ProformaRequestList from "./components/ProformaRequestList"
import ProformaRequestTabs from "./components/ProformaRequestTabs"
import VendorProfileSelector from "./components/VendorProfileSelector"
import { Box, Typography } from "@/app/components/ui"

const tabs = [
   { label: "Recomendados", value: "recommended" },
   { label: "Recientes", value: "recent" },
   { label: "Guardados", value: "saved" },
]

export default function RequestPage() {
   return (
      <Box className="flex flex-col gap-4 w-3/4 mx-auto">
         <Box className="flex gap-4 justify-between items-center border-b border-black/10 pb-4">
            <ProformaRequestTabs tabs={tabs} />
            <VendorProfileSelector />
         </Box>
         <Typography
            className="px-4"
            variant="mensaje">
            Descubre oportunidades laborales que se ajustan a tu perfil y a las necesidades de los empleadores.
         </Typography>
         <ProformaRequestList />
      </Box>
   )
}
