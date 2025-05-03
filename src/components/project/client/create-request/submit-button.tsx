"use client"
import { createRequestAction } from "@/app/client/account/create-request/actions"
import { Button, InputField } from "@/components/ui"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"
import { useActionState } from "react"

export type SubmitButtonProps = {
   step: number
   totalSteps: number
   isDisabled: boolean
}
const initialState = { success: false, error: "" }

export function SubmitButton({ step, totalSteps, isDisabled }: Readonly<SubmitButtonProps>) {
   const { requestData } = useCreateRequestUserDataStore((state) => state)
   const [state, formAction, isPending] = useActionState(createRequestAction, initialState)

   if (!state.success) {
      //TODO: Manejar un toast para mostrar el error
   }
   if (step !== totalSteps) return null

   return (
      <form action={formAction}>
         <InputField
            type="hidden"
            name="payload"
            value={JSON.stringify(requestData)}
         />
         <Button
            variant="primary"
            disabled={isPending || isDisabled}
            isLoading={isPending}
            type="submit">
            Crear solicitud
         </Button>
      </form>
   )
}
