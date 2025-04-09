// app/components/features/vendor-profile-selector/VendorProfileSelectorButton.tsx
"use client"
import { FC, useState } from "react"
import { use } from "react"
import { Box, Button } from "@/app/components/ui"
import { ApiResponse } from "@/app/data/dtos/api-response.types"
import { GetVendorProfileResponse } from "@/app/data/dtos/get-vendor-profile"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
   vendorProfiles: Promise<ApiResponse<GetVendorProfileResponse[]>>
}

const VendorProfileSelectorButton: FC<Props> = ({ vendorProfiles }) => {
   // `use` es la nueva forma de manejar promesas en React 18+
   const data = use(vendorProfiles)

   const pathname = usePathname()
   const router = useRouter()
   const searchParams = useSearchParams()

   const [selectedVendorProfile, setSelectedVendorProfile] = useState(data.success ? data.data[0]?.category.name : "")
   const [isOpen, setIsOpen] = useState(false)

   function handleProfileSelection(name: string, id: string) {
      setSelectedVendorProfile(name)
      setIsOpen(false)

      const params = new URLSearchParams(searchParams)
      params.set("profile", id)
      router.push(`${pathname}?${params.toString()}`)
   }

   // Verificamos si hay un error en los datos antes de intentar renderizarlos
   if (!data.success) {
      return <div>Error al cargar los perfiles de proveedores.</div>
   }

   return (
      <Box className="relative flex flex-col gap-4">
         <Button
            className="min-w-[250px] bg-primary text-white px-4 py-2 rounded-md"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}>
            {selectedVendorProfile || "Selecciona un perfil"}
         </Button>
         {isOpen && (
            <ul className="absolute text-sm flex justify-center items-center inset-0 top-10 w-full bg-white shadow-md border border-accent-foreground rounded-md p-4">
               {data.data.map((profile) => (
                  <li
                     key={profile.id}
                     onClick={() => handleProfileSelection(profile.category.name, profile.id)}>
                     {profile.category.name}
                  </li>
               ))}
            </ul>
         )}
      </Box>
   )
}

export default VendorProfileSelectorButton
