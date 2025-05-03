"use client"
import Link from "next/link"
import { RoleOptionItem } from "./RoleOptionItem"
import { Box, Button, Typography } from "@/components/ui"
import { ROLE, RoleType } from "@/config/constants"
import { UserRoundCheck, UserRoundSearch } from "lucide-react"

interface Props {
   selectedRole: RoleType
   onSelect: (role: RoleType) => void
   onNext: () => void
}

export function RoleSelector({ selectedRole, onSelect, onNext }: Readonly<Props>) {
   const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSelect(event.target.value as RoleType)
   }

   const getButtonText = (role: string | null) => {
      if (!role) return "Crear una cuenta"
      return role === ROLE.CLIENT ? "Unete como Cliente" : "Aplica como Freelancer"
   }

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(e.target, selectedRole)
      onNext()
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

               <RoleOptionItem
                  Icon={<UserRoundSearch strokeWidth={1.4} />}
                  message="Soy cliente en busca de talento para mi proyecto."
                  name="role"
                  value={ROLE.CLIENT}
                  onChange={handleRoleChange}
               />

               <RoleOptionItem
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
