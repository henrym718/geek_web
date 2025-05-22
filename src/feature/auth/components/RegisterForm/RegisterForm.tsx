"use client"
import { Box, Button, InputField, Typography, InputSearch } from "@/components/ui"
import { fetchAllCities } from "@/data/api/services/city.service"
import { RegisterType } from "@/data/schemas/register.schema"
import useValidateRegisterForm from "@/lib/hooks/auth/register/useValidateRegisterForm"
import useSWR from "swr"

interface Props {
   onComplete: (e: RegisterType) => void
   isLoading: boolean
}

export function RegisterForm({ onComplete, isLoading }: Readonly<Props>) {
   const { register, handleSubmit, errors, control } = useValidateRegisterForm()
   const { data: response } = useSWR("cities", fetchAllCities)

   const cities = response?.success ? response.data : []

   const parsedCities = cities.map((city) => ({
      id: city.id,
      label: city.name,
   }))

   return (
      <form
         className="flex flex-col w-full gap-4"
         onSubmit={handleSubmit(onComplete)}>
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
            options={parsedCities}
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

         <Button
            className="flex mx-auto mt-12 w-72"
            size="lg"
            disabled={isLoading}
            isLoading={isLoading}>
            {"Crear mi cuenta"}
         </Button>
      </form>
   )
}
