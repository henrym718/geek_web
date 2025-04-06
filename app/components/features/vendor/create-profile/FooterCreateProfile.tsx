"use client"
import { Button } from "@/app/components/ui"
import { ProgressBar } from "@/app/components/ui/ProgressBar"
import { Box } from "@/app/components/ui"
import { useWizardCreateProfileStepHandlerStore } from "@/app/stores/vendor/wizard-create-profile-step-handler.store"
import { useWizardUserDataStore } from "@/app/stores/vendor/wizard-create-profile-user-data.store"
import { createVendorProfile } from "@/app/services/vendor/vendor.services"
import { useAuthStore } from "@/app/stores/global/auth.store"
import { useRouter } from "next/navigation"

export default function FooterCreateProfile() {
   const router = useRouter()
   const { step, totalSteps, previousStep, nextStep, resetStep } = useWizardCreateProfileStepHandlerStore((state) => state)
   const { vendorProfile, resetVendorProfile } = useWizardUserDataStore((state) => state)
   const { user } = useAuthStore((state) => state)

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
