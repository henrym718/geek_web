"use client"
import { Box, Button, InputField, Typography } from "@/app/components/ui"
import { InputSearch } from "@/app/components/ui/InputSearch"
import useValidateRegisterForm from "@/app/hooks/auth/register/useValidateRegisterForm"
import useActionRegisterForm from "@/app/hooks/auth/register/useActionRegisterForm"
export function RegisterForm() {
   const { register, control, handleSubmit, errors } = useValidateRegisterForm()
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
            name="city"
            control={control}
            sizing="default"
            label="Ciudad"
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
