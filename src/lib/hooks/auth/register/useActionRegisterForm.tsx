"use client"
import { RegisterType } from "@/data/schemas/register.schema"
import { useRouter } from "next/navigation"
import { startTransition, useActionState, useEffect } from "react"
import { registerAction } from "@/app/(auth)/register/action"

export default function useActionRegisterForm() {
   const router = useRouter()
   const [state, action, pending] = useActionState(registerAction, { success: false, error: null })

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
