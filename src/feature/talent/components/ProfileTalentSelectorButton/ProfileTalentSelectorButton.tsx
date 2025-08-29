"use client"
import { BadgetSkill } from "@/components/badgetSkill"
import { Icon } from "@/components/icon"
import { Box, SelectButton, SelectButtonContent, SelectButtonItem, SelectButtonTrigger, SelectButtonValue, Typography } from "@/components/ui"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

interface Option {
   value: string
   name: string
}

interface Props {
   options: Option[]
}

export function ProfileTalentSelectorButton({ options }: Readonly<Props>) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const currentProfileId = searchParams.get("profile")

   const [selectedValue, setSelectedValue] = useState<{ id: string; name: string }>(() => {
      const initialOption = options.find((opt) => opt.value === currentProfileId)
      return initialOption ? { id: initialOption.value, name: initialOption.name } : { id: "1", name: "Selecciona un perfil" }
   })

   const handleOptionSelected = (value: { id: string; name: string }) => {
      setSelectedValue(value)
      const params = new URLSearchParams(searchParams.toString())
      params.set("profile", value.id)
      // Envuelve la navegación en startTransition
      router.push(`?${params.toString()}`, { scroll: false }) // scroll: false evita saltar al inicio
   }

   return (
      <Box className="border border-border py-6 px-5 space-y-6  rounded-md">
         <section className="flex flex-col">
            <Typography variant="label">Perfil Activo</Typography>
            <SelectButton
               selected={selectedValue}
               onChange={handleOptionSelected}>
               <SelectButtonTrigger className="rounded-md bg-white px-4">
                  <SelectButtonValue placeholder="Selecciona un perfil" />
               </SelectButtonTrigger>
               <SelectButtonContent>
                  {options.map((option) => (
                     <SelectButtonItem
                        key={option.value}
                        value={option.value}>
                        {option.name}
                     </SelectButtonItem>
                  ))}
               </SelectButtonContent>
            </SelectButton>
         </section>

         <section className="border border-border round-md px-5 py-6 gap-3">
            <Typography variant="label">Desarrollador Full Stack</Typography>
            <div className="flex gap-2 items-center">
               <Icon
                  name="Clock"
                  size={14}
               />
               <Typography variant="destacado">Categoria</Typography>
            </div>

            <div className="flex gap-2 items-center">
               <Icon
                  name="Clock"
                  size={14}
               />
               <Typography variant="destacado">Senior</Typography>
            </div>
            <Typography variant="label">Skill principales</Typography>
            <BadgetSkill
               skills={[
                  {
                     id: "1",
                     name: "React",
                  },
                  {
                     id: "2",
                     name: "Next",
                  },
                  {
                     id: "3",
                     name: "Aws",
                  },
                  {
                     id: "4",
                     name: "Prestashop",
                  },
               ]}
            />
         </section>
      </Box>
   )
}
