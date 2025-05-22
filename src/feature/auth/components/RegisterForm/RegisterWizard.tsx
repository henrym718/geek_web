import { RoleType } from "@/config/constants"
import { useRegisterWizard } from "../../stores/useRegisterWizard"
import { RoleSelector } from "./RoleSelector"
import { RegisterForm } from "./RegisterForm"
import { RegisterType } from "@/data/schemas/register.schema"
import { registerUser } from "../../services/service"
import { useSessionDataStore } from "@/stores/user-session-data.store"
import { sleep } from "@/lib/utils/sleep"
import { useRouter } from "next/navigation"

export function RegisterWizard() {
   const router = useRouter()
   const { nextStep, setRole, role, step, isLoading, setIsLoading } = useRegisterWizard()
   const { loadUser } = useSessionDataStore()

   const completeRegistration = async (data: RegisterType) => {
      const { firstName, lastName, email, password, username, phone, city } = data
      try {
         setIsLoading(true)
         await sleep(1000)
         await registerUser({
            firstName,
            lastName,
            email,
            password,
            username,
            phone,
            city: city?.id,
            role: role as RoleType,
         })
         await loadUser()
         router.push("/")
      } catch (error) {
         console.error("Error al registrar el usuario:", error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div>
         {step === 1 && (
            <RoleSelector
               selectedRole={role as RoleType}
               onSelect={(role: RoleType) => setRole(role)}
               onNext={nextStep}
            />
         )}

         {step === 2 && (
            <RegisterForm
               onComplete={completeRegistration}
               isLoading={isLoading}
            />
         )}
      </div>
   )
}
