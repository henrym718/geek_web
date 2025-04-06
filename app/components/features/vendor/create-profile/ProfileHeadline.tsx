import { Box, InputField, Typography } from "@/app/components/ui"
import { useWizardUserDataStore } from "@/app/stores/vendor/wizard-create-profile-user-data.store"

export default function ProfileHeadline() {
   const { setVendorProfile, vendorProfile } = useWizardUserDataStore((state) => state)

   console.log(vendorProfile)

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Lo tengo, Ahora, agrega un titulo para decirle a todos lo que haces</Typography>
         <Typography variant="parrafo">
            Es lo primero que ven los clientes, asi que haz que cuente. Destaca describiendo tu experiencia en tus propias palabras.
         </Typography>
         <Typography
            className="pt-6 mb-[-15px]"
            variant="label">
            Tu rol profesional
         </Typography>
         <InputField
            placeholder="Ingeniero en desarrollo web con enfasis en frontend y backend"
            className="mt-4"
            type="search"
            onChange={(e) => setVendorProfile({ title: e.target.value })}
            value={vendorProfile.title}
         />
      </Box>
   )
}
