"use client"
import { Box, SelectButton, SelectButtonContent, SelectButtonItem, SelectButtonTrigger, SelectButtonValue } from "@/components/ui"
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
      <Box className="w-1/2 gap-4">
         <SelectButton
            selected={selectedValue}
            onChange={handleOptionSelected}>
            <SelectButtonTrigger className="rounded-full bg-white px-4">
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
      </Box>
   )
}
