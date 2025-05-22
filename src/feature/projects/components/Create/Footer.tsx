"use client"
import { Box, Button, ProgressBar } from "@/components/ui"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   project: CreateRequestRequest
   step: number
   totalSteps: number
   nextStep: () => void
   previousStep: () => void
   isDisabledStepButton: boolean
   handleCreateProjecto: () => void
   isPendingCreateProject: boolean
}

export function Footer({
   project,
   step,
   totalSteps,
   nextStep,
   previousStep,
   isDisabledStepButton,
   handleCreateProjecto,
   isPendingCreateProject,
}: Readonly<Props>) {
   return (
      <Box className="flex flex-col justify-between gap-4 pb-4">
         <ProgressBar
            steps={totalSteps}
            currentStep={step}
         />
         <Box className="flex justify-between mx-4">
            <Button
               data-step={step > 1}
               className="data-[step=false]:invisible"
               variant="outline"
               onClick={() => previousStep()}>
               Rgersar
            </Button>
            {step === totalSteps ? (
               <Button
                  variant="primary"
                  type="submit"
                  disabled={!project.city || isPendingCreateProject}
                  isLoading={isPendingCreateProject}
                  onClick={() => handleCreateProjecto()}>
                  Crear solicitud
               </Button>
            ) : (
               <Button
                  variant="primary"
                  onClick={() => nextStep()}
                  disabled={isDisabledStepButton}>
                  Continuar
               </Button>
            )}
         </Box>
      </Box>
   )
}
