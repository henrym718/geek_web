"use client"
import { CategorySelector } from "./category-selector"
import { ProfileAboutMe } from "./profile-aboutme"
import { ProfileHeadline } from "./profile-headline"
import { SkillsSelector } from "./skills-selector"
import { useWizardCreateProfileStepHandlerStore } from "@/stores/use-create-profile-step-handler.store"

export function Wizard() {
   const { step } = useWizardCreateProfileStepHandlerStore((state) => state)

   const RenderStep: Record<number, React.ReactElement> = {
      1: <CategorySelector />,
      2: <SkillsSelector />,
      3: <ProfileHeadline />,
      4: <ProfileAboutMe />,
   }

   return RenderStep[step]
}
