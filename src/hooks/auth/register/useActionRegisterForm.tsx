"use client"
import { handleRegister } from "@/lib/actions/register.action"
import { RegisterType } from "@/data/schemas/register.schema"
import { useRouter } from "next/navigation"
import { startTransition, useActionState, useEffect } from "react"

export default function useActionRegisterForm() {
   const router = useRouter()
   const [state, action, pending] = useActionState(handleRegister, { success: false, error: null })

   const onSubmitHandler = (formData: RegisterType) => {
      startTransition(() => {
         action(formData)
      })
   }

   useEffect(() => {
      if (state?.success) {
         router.push("/")
      }
   }, [state?.success, router])

   return {
      state,
      pending,
      onSubmitHandler,
   }
}
