"use client"
import { Button } from "@/app/components/ui"
import { ProgressBar } from "@/app/components/ui/ProgressBar"
import { Box } from "@/app/components/ui"
import { useWizardCreateProfileStepHandlerStore } from "@/app/stores/use-create-profile-step-handler.store"
import { useWizardUserDataStore } from "@/app/stores/use-create-profile-user-data.store"
import { useSessionDataStore } from "@/app/stores/user-session-data.store"
import { useRouter } from "next/navigation"
import { createVendorProfile } from "@/app/services/vendor-profile.service"

export default function FooterCreateProfile() {
   const router = useRouter()
   const { step, totalSteps, previousStep, nextStep, resetStep } = useWizardCreateProfileStepHandlerStore((state) => state)
   const { vendorProfile, resetVendorProfile } = useWizardUserDataStore((state) => state)
   const { user } = useSessionDataStore((state) => state)

   const handleCreateProfile = async () => {
      if (!user?.vendor) return
      console.log(vendorProfile, "vendorProfile")
      const response = await createVendorProfile(vendorProfile)
      if (response.success) {
         resetVendorProfile()
         resetStep()
         router.push(`/vendor/${user.user.username}/profiles`)
      }
   }

   return (
      <Box className="flex flex-col gap-4 pb-4">
         <ProgressBar
            steps={totalSteps}
            currentStep={step}
         />
         <Box className="flex justify-between mx-4">
            <Button
               data-step={step > 1}
               className="data-[step=false]:invisible"
               variant="outline"
               size="lg"
               onClick={() => previousStep()}>
               Previous
            </Button>

            {step === totalSteps ? (
               <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCreateProfile}>
                  Crear perfil
               </Button>
            ) : (
               <Button
                  variant="primary"
                  size="lg"
                  onClick={() => nextStep()}
                  disabled={(step === 1 && !vendorProfile.categoryId) || (step === 2 && !vendorProfile.skills.length)}>
                  Next
               </Button>
            )}
         </Box>
      </Box>
   )
}
