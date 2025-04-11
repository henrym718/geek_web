import { createRequestResponse } from "@/lib/actions/create-request-response.action"
import { useCreateRequestResponseStore } from "@/stores/use-create-request-response.store"
import { startTransition, useActionState, useEffect } from "react"
import { FieldValues } from "react-hook-form"

export default function useSubmitRequestResponse(requestId: string, closeModal: () => void) {
   const [state, action, pending] = useActionState(createRequestResponse, { error: "", success: false })

   const onSubmitHandler = (data: FieldValues) => {
      const formData = new FormData()
      formData.append("message", data.message)
      formData.append("proformaRequestId", requestId)
      formData.append("profileVendorId", useCreateRequestResponseStore.getState().profileActive)

      startTransition(() => {
         action(formData)
      })
   }

   useEffect(() => {
      if (state.success) {
         closeModal()
      }
   }, [state.success, closeModal])

   return { onSubmitHandler, state, pending }
}
