"use client"
import { startTransition, useActionState, useEffect } from "react"
import { Button, InputField, Typography } from "@/app/components/ui"
import { handleLogin } from "@/app/lib/actions/auth/login.action"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginType } from "@/app/lib/validation/login.schema"
import { useRouter } from "next/navigation"

export function LoginForm() {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginType>({
      mode: "onTouched",
      resolver: zodResolver(loginSchema),
   })

   const [state, action, pending] = useActionState(handleLogin, { success: false, error: "" })

   const submit = handleSubmit(async (formData) => {
      startTransition(() => {
         action(formData)
      })
   })

   useEffect(() => {
      if (state.success) {
         router.push("/")
      }
   }, [state.success, router])

   return (
      <form
         className="flex flex-col gap-8 w-1/2 mx-auto"
         onSubmit={submit}>
         <Typography variant="titulo3"> Login</Typography>

         <InputField
            label="Correo electrónico"
            register={register("email")}
            error={errors.email?.message}
         />
         <InputField
            type="password"
            label="Contraseña"
            register={register("password")}
            error={errors.password?.message}
         />
         {state?.error && <div className="text-red-500 mb-4">{state?.error}</div>}

         <Button
            type="submit"
            disabled={pending}
            size="lg">
            {pending ? "Iniciando sesión..." : "Iniciar sesión"}
         </Button>
      </form>
   )
}
