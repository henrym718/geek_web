"use client"
import GroupAndCategorySelector from "./GroupAndCategorySelector"
import ProfileHeadline from "./ProfileHeadline"
import SkillsSelector from "./SkillsSelector"
import { useWizardCreateProfileStepHandlerStore } from "@/app/stores/vendor/wizard-create-profile-step-handler.store"

export default function WizardCreateProfile() {
   const { step } = useWizardCreateProfileStepHandlerStore((state) => state)

   const RenderStep: Record<number, React.ReactElement> = {
      1: <GroupAndCategorySelector />,
      2: <SkillsSelector />,
      3: <ProfileHeadline />,
   }

   return RenderStep[step]
}
