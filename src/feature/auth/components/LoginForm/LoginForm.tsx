"use client"
import { startTransition, useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Box, Button, InputField, Typography } from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginType } from "@/data/schemas/login.schema"
import { loginAction } from "@/app/(auth)/login/actions"
import Link from "next/link"

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

   const [state, action, pending] = useActionState(loginAction, { success: false, error: "" })

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
         className="flex flex-col gap-8 max-w-md mx-auto mt-20"
         onSubmit={submit}>
         <Box className="flex flex-col gap-2">
            <Typography variant="titulo3"> Bienvenido de nuevo!</Typography>
            <Typography variant="destacado"> Inicia sesión para acceder a todas las funcionalidades.</Typography>
         </Box>

         <InputField
            label="Correo electrónico *"
            register={register("email")}
            error={errors.email?.message}
         />
         <InputField
            type="password"
            label="Contraseña *"
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
         <Typography
            variant="destacado"
            className="text-center">
            No tienes una cuenta? {""}
            <Link
               href="/register"
               replace>
               <span className="underline hover:text-tertiary">Regístrate</span>
            </Link>
         </Typography>
      </form>
   )
}
