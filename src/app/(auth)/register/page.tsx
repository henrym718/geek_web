"use client"
import { RegisterWizard } from "@/feature/auth/components/RegisterForm/RegisterWizard"

export default function RegsiterPage() {
   return (
      <div className="flex justify-center items-center h-screen w-[35%] mx-auto">
         <RegisterWizard />
      </div>
   )
}
