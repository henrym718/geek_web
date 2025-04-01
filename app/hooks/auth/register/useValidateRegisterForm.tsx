import { registerSchema, RegisterType } from "@/app/lib/validation/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function useValidateRegisterForm() {
   const { register, control, handleSubmit, formState } = useForm<RegisterType>({
      mode: "onTouched",
      resolver: zodResolver(registerSchema),
      defaultValues: { city: { id: "", label: "" } },
   })
   const { errors } = formState

   return { register, control, handleSubmit, errors }
}
