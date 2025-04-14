"use client"
import { Box, Button, ProgressBar } from "@/components/ui"
import { useCreateRequestStepHandlerStore } from "@/stores/use-create-request-step-handler.store"
import React from "react"

export function WizardFooter() {
   const { step, totalSteps, nextStep, previousStep } = useCreateRequestStepHandlerStore((state) => state)
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
               onClick={() => nextStep()}>
               Continuar
            </Button>
            <Button
               data-step={step === totalSteps}
               className="data-[step=false]:hidden data-[step=true]:block"
               variant="primary"
               onClick={() => nextStep()}>
               Crear solicitud
            </Button>
         </Box>
      </Box>
   )
}
