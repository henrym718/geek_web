"use client"
import { useActionState, useEffect } from "react"
import { Button, InputField, Typography } from "@/app/components/ui"
import { handleLogin } from "../../../lib/actions/auth/login.action"
import { useRouter } from "next/navigation"

export function LoginForm() {
   const router = useRouter()
   const [state, formAction, pending] = useActionState(handleLogin, { email: "", password: "", error: "" })

   useEffect(() => {
      if (state.error === false) {
         router.push("/dashboard")
      }
   }, [state])

   return (
      <form
         action={formAction}
         className="flex flex-col gap-8 w-1/2 mx-auto"
      >
         <Typography variant="titulo3"> Login</Typography>
         <InputField
            name="email"
            placeholder="email"
            defaultValue={state?.email}
            floatLabel={true}
            size="lg"
         />
         <InputField
            name="password"
            type="password"
            placeholder="password"
            defaultValue={state?.password}
            floatLabel={true}
            size="lg"
         />
         {state?.error && <div className="text-red-500 mb-4">{state?.error}</div>}

         <Button
            type="submit"
            disabled={pending}
         >
            {pending ? "Iniciando sesión..." : "Iniciar sesión"}
         </Button>
      </form>
   )
}
