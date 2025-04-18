"use client"
import { Box, Button, ProgressBar } from "@/components/ui"
import { useCreateRequestStepHandlerStore } from "@/stores/use-create-request-step-handler.store"
import { SubmitButton } from "./submit-button"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

export function WizardFooter() {
   const { step, totalSteps, nextStep, previousStep } = useCreateRequestStepHandlerStore((state) => state)
   const { requestData } = useCreateRequestUserDataStore((state) => state)

   const isDisabled = () => {
      if (step === 1) return !requestData.title.trim()
      if (step === 2) return !requestData.description.trim()
      if (step === 3) return !requestData.quotation && requestData.budget === 0
      if (step === 4) return !requestData.projectType || !requestData.projectLength || !requestData.projectWorkload
      if (step === 5) return !requestData.categoryId || !requestData.skills.length
   }

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
            <Button
               data-step={step < totalSteps}
               className="data-[step=false]:hidden"
               variant="primary"
               onClick={() => nextStep()}
               disabled={isDisabled()}>
               Continuar
            </Button>
            <SubmitButton
               step={step}
               totalSteps={totalSteps}
               isDisabled={!requestData.scope}
            />
         </Box>
      </Box>
   )
}
