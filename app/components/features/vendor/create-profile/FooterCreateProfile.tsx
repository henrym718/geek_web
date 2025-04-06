"use client"
import { Button } from "@/app/components/ui"
import { ProgressBar } from "@/app/components/ui/ProgressBar"
import { Box } from "@/app/components/ui"
import { useWizardCreateProfileStepHandlerStore } from "@/app/stores/vendor/wizard-create-profile-step-handler.store"
import { useWizardUserDataStore } from "@/app/stores/vendor/wizard-create-profile-user-data.store"

export default function FooterCreateProfile() {
   const { step, totalSteps, previousStep, nextStep } = useWizardCreateProfileStepHandlerStore((state) => state)
   const { vendorProfile } = useWizardUserDataStore((state) => state)
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

            <Button
               data-step={step < totalSteps}
               className="data-[step=false]:invisible"
               variant="primary"
               size="lg"
               onClick={() => nextStep()}
               disabled={(step === 1 && !vendorProfile.categoryId) || (step === 2 && !vendorProfile.skills.length)}>
               Next
            </Button>
         </Box>
      </Box>
   )
}
