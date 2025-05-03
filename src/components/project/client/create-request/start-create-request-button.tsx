"use client"
import { Button } from "@/components/ui"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import { useCreateRequestStepHandlerStore } from "@/stores/use-create-request-step-handler.store"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function StartCreateRequestButton() {
   const { resetFormData } = useCreateRequestFormDataStore((state) => state)
   const { resetRequestData } = useCreateRequestUserDataStore((state) => state)
   const { resetStep } = useCreateRequestStepHandlerStore((state) => state)
   const router = useRouter()

   const handleClick = () => {
      resetFormData()
      resetRequestData()
      resetStep()
      router.push("/client/account/create-request")
   }

   return (
      <Button
         variant="secundary"
         onClick={handleClick}>
         <Plus className="w-4 h-4" />
         Nueva solicitud
      </Button>
   )
}
