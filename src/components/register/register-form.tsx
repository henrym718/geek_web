"use client"
import { Box, Button, InputField, Typography, InputSearch } from "@/components/ui"
import useValidateRegisterForm from "@/lib/hooks/auth/register/useValidateRegisterForm"
import useActionRegisterForm from "@/lib/hooks/auth/register/useActionRegisterForm"

export function RegisterForm() {
   const { register, handleSubmit, errors, control } = useValidateRegisterForm()
   const { state, pending, onSubmitHandler } = useActionRegisterForm()

   return (
      <form
         className="flex flex-col w-full gap-4"
         onSubmit={handleSubmit(onSubmitHandler)}>
         <Typography
            variant="titulo3"
            color="primario">
            Registro
         </Typography>

         <Box className="flex gap-6 ">
            <InputField
               label="Nombre"
               sizing="default"
               register={register("firstName")}
               error={errors.firstName?.message}
            />

            <InputField
               label="Apellido"
               sizing="default"
               register={register("lastName")}
               error={errors.lastName?.message}
            />
         </Box>

         <InputField
            label="Username"
            sizing="default"
            register={register("username")}
            error={errors.username?.message}
         />

         <InputField
            label="Email"
            sizing="default"
            register={register("email")}
            error={errors.email?.message}
         />

         <InputField
            label="Contraseña"
            sizing="default"
            type="password"
            register={register("password")}
            error={errors.password?.message}
         />

         <InputSearch
            options={[{ id: "2", label: "manuela" }]}
            limit={5}
            error={errors.city?.id?.message ?? errors.city?.label?.message}
            sizing="default"
            label="Ciudad"
            control={control}
            name="city"
         />

         <InputField
            label="Celular"
            sizing="default"
            register={register("phone")}
            error={errors.phone?.message}
         />

         {state?.error && !pending && (
            <Typography
               variant="parrafo"
               color="primario">
               {state?.error}
            </Typography>
         )}

         <Button
            className="flex mx-auto mt-12 w-72"
            size="lg"
            disabled={pending}>
            {pending ? "Cargando..." : "Crear mi cuenta"}
         </Button>
      </form>
   )
}
