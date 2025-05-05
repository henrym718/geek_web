"use client"

import Link from "next/link"
import { Button } from "../../ui"
import { useCreateProfileData } from "@/feature/profiles/stores/useCreateProfileData"
import { useCreateProfileRecoveryData } from "@/feature/profiles/stores/useCreateProfileRecoveryData"
import { useCreateProfileSteps } from "@/feature/profiles/stores/useCreateProfileSteps"

export function AddProfileButton() {
   const { resetProfileData } = useCreateProfileData((state) => state)
   const { resetProfileRecoveryData } = useCreateProfileRecoveryData((state) => state)
   const { resetStep } = useCreateProfileSteps((state) => state)

   const handleClick = () => {
      resetProfileData()
      resetProfileRecoveryData()
      resetStep()
   }

   return (
      <Link href="/talent/account/create">
         <Button
            onClick={handleClick}
            variant="secundary"
            className="hover:opacity-90 transition-opacity">
            Agregar perfil
         </Button>
      </Link>
   )
}
