"use client"
import { RegisterForm } from "@/app/components/features/auth/register/RegisterForm"
import { AUTH_FORM } from "@/app/lib/constants/auth.constants"
import HandleRolOptions from "@/app/components/features/auth/register/RoleSelectionForm"
import { useRegistrationStore } from "@/app/stores/use-registration.store"
import VendorProfileForm from "@/app/components/features/auth/register/VendorProfileForm"

export default function Regsitration() {
   const { currentForm } = useRegistrationStore((state) => state)

   const formComponents = {
      [AUTH_FORM.ROLE]: <HandleRolOptions />,
      [AUTH_FORM.REGISTER]: <RegisterForm />,
      [AUTH_FORM.VENDOR_PROFILE]: <VendorProfileForm />,
   }

   return <div className="flex justify-center items-center h-screen w-[35%] mx-auto">{formComponents[currentForm]}</div>
}
