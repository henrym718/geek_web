"use client"
import GroupAndCategorySelector from "./GroupAndCategorySelector"
import SkillsSelector from "./SkillsSelector"
import { useWizardCreateProfileStepHandlerStore } from "@/app/stores/vendor/wizard-create-profile-step-handler.store"

export default function WizardCreateProfile() {
   const { step } = useWizardCreateProfileStepHandlerStore((state) => state)

   const RenderStep: Record<number, React.ReactElement> = {
      1: <GroupAndCategorySelector />,
      2: <SkillsSelector />,
   }

   return RenderStep[step]
}
