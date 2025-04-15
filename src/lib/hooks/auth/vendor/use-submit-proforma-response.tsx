"use client"
import { createRequestResponseAction } from "@/app/vendor/account/request-panel/action"
import { useActionState, useEffect, startTransition } from "react"
import { FieldValues } from "react-hook-form"
import { mutate } from "swr"

export default function useSubmitRequestResponse(requestId: string, profileId: string, closeModal: () => void) {
   const [state, action, pending] = useActionState(createRequestResponseAction, { error: "", success: false })

   const onSubmitHandler = (data: FieldValues) => {
      const formData = new FormData()
      formData.append("message", data.message)
      formData.append("proformaRequestId", requestId)
      formData.append("profileVendorId", profileId)

      startTransition(() => {
         action(formData)
      })
   }

   useEffect(() => {
      const onSuccess = () => {
         if (state.success) {
            mutate(["request-list", profileId], { revalidate: true })
            closeModal()
         }
      }
      onSuccess()
   }, [state.success, closeModal, profileId])

   return { onSubmitHandler, state, pending }
}
