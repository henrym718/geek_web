"use client"
import { RegisterForm } from "@/components/register/register-form"
import { useRegistrationStore } from "@/stores/use-registration.store"
import { AUTH_FORM } from "@/config/constants"
import { RoleOptionSelector } from "@/components/register/role-pption-selector"

export default function RegsiterPage() {
   const { currentForm } = useRegistrationStore((state) => state)

   const formComponents = {
      [AUTH_FORM.ROLE]: <RoleOptionSelector />,
      [AUTH_FORM.REGISTER]: <RegisterForm />,
   }

   return <div className="flex justify-center items-center h-screen w-[35%] mx-auto">{formComponents[currentForm]}</div>
}
