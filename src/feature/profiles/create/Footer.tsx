"use client"
import { Button, Box, ProgressBar } from "@/components/ui"
import {} from "@/data/types/models/models"

interface Props {
   totalSteps: number
   step: number
   isDisabledStepButton: boolean
   isDisabledCreateProfileButton: boolean
   isPendingCreateProfile: boolean
   handleCreateProfile: () => void
   previousStep: () => void
   nextStep: () => void
}

export function Footer(props: Readonly<Props>) {
   const {
      totalSteps,
      step,
      handleCreateProfile,
      previousStep,
      nextStep,
      isDisabledStepButton,
      isDisabledCreateProfileButton,
      isPendingCreateProfile,
   } = props
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
                  onClick={handleCreateProfile}
                  disabled={isDisabledCreateProfileButton}
                  isLoading={isPendingCreateProfile}>
                  Crear perfil
               </Button>
            ) : (
               <Button
                  variant="primary"
                  size="lg"
                  onClick={() => nextStep()}
                  disabled={isDisabledStepButton}>
                  Next
               </Button>
            )}
         </Box>
      </Box>
   )
}
