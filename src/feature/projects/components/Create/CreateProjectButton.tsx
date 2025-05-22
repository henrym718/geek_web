"use client"
import { Button } from "@/components/ui"
import { useCreateProjectRecoveryData } from "@/stores/useCreateProjectRecoveryData"
import { useCreateProjectSteps } from "@/stores/useCreateProjectSteps"
import { useCreateProjectData } from "@/stores/useCreateProjectData"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreateProjectButton() {
   const { resetFormData } = useCreateProjectRecoveryData((state) => state)
   const { resetProject } = useCreateProjectData((state) => state)
   const { resetStep } = useCreateProjectSteps((state) => state)
   const router = useRouter()

   const handleClick = () => {
      resetFormData()
      resetProject()
      resetStep()
      router.push("/client/account/create")
   }

   return (
      <Button
         variant="secundary"
         onClick={handleClick}>
         <Plus className="w-4 h-4" />
         Nuevo proyecto
      </Button>
   )
}
