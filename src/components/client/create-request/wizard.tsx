"use client"

import { useCreateRequestStepHandlerStore } from "@/stores/use-create-request-step-handler.store"

interface WizardProps {
   steps: {
      requestHeadline: React.ReactNode
      requestDetails: React.ReactNode
      requestBudget: React.ReactNode
      requestTiming: React.ReactNode
      requestScope: React.ReactNode
      groupCategorySkillsSelector: React.ReactNode
   }
}

export function Wizard({ steps }: Readonly<WizardProps>) {
   const { step } = useCreateRequestStepHandlerStore((state) => state)

   const RenderStep: Record<number, React.ReactNode> = {
      1: steps.requestHeadline,
      2: steps.requestDetails,
      3: steps.requestBudget,
      4: steps.requestTiming,
      5: steps.requestScope,
      6: steps.groupCategorySkillsSelector,
   }

   return RenderStep[step]
}
