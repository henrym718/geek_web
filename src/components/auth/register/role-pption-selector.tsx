"use client"
import { startTransition, useActionState, useState } from "react"
import Link from "next/link"
import { RoleOption } from "./role-option"
import { Box, Button, Typography } from "@/components/ui"
import { ROLE, RoleType } from "@/lib/constants/auth.constants"
import { handleRoles } from "@/lib/actions/roles.action"
import { UserRoundCheck, UserRoundSearch } from "lucide-react"

export function RoleOptionSelector() {
   const [, action] = useActionState(handleRoles, null)
   const [selectedRole, setSelectedRole] = useState<string>("")

   const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRole(event.target.value)
   }

   const getButtonText = (role: string | null) => {
      if (!role) return "Crear una cuenta"
      return role === ROLE.CLIENT ? "Unete como Cliente" : "Aplica como Freelancer"
   }

   const onSubmit = async () => {
      startTransition(() => action(selectedRole as RoleType))
   }

   return (
      <Box className="flex flex-col gap-8">
         <form
            className="flex flex-col gap-8"
            onSubmit={onSubmit}>
            <Box className="flex flex-col gap-4">
               <Typography
                  className="pb-4"
                  variant="titulo3"
                  align="centro">
                  Selecciona un rol
               </Typography>
               <RoleOption
                  Icon={<UserRoundSearch strokeWidth={1.4} />}
                  message="Soy cliente en busca de talento para mi proyecto."
                  name="role"
                  value={ROLE.CLIENT}
                  onChange={handleRoleChange}
               />
               <RoleOption
                  Icon={<UserRoundCheck strokeWidth={1.4} />}
                  message="Soy un profesional y ofrezco mis servicios."
                  name="role"
                  value={ROLE.VENDOR}
                  onChange={handleRoleChange}
               />
            </Box>
            <Button
               type="submit"
               size="lg"
               disabled={!selectedRole}>
               {getButtonText(selectedRole)}
            </Button>
         </form>
         <Box className="flex justify-center gap-1.5">
            <Typography>¿Ya tienes una cuenta?</Typography>
            <Link
               className="cursor-pointer hover:underline"
               href="/login">
               Inicia sesión
            </Link>
         </Box>
      </Box>
   )
}
