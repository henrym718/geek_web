"use client"
import { RegisterForm } from "@/app/components/features/auth/register/RegisterForm"
import { AUTH_FORM } from "@/app/lib/constants/auth.constants"
import HandleRolOptions from "@/app/components/features/auth/register/RoleSelectionForm"
import { useRegistrationFormStore } from "@/app/stores/auth/registrationFormStore"

export default function Regsitration() {
   const { currentForm } = useRegistrationFormStore((state) => state)

   const formComponents = {
      [AUTH_FORM.ROLE]: <HandleRolOptions />,
      [AUTH_FORM.REGISTER]: <RegisterForm />,
   }

   return <div className="flex justify-center items-center h-screen w-[35%] mx-auto">{formComponents[currentForm]}</div>
}
