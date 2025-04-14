/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Box, Button } from "@/components/ui"
import { fetchVendorProfilesByAccessToken } from "@/lib/services/vendor-profile.service"
import { GetVendorProfileResponse } from "@/data/dtos/get-vendor-profile"
import { useCreateRequestResponseStore } from "@/stores/use-create-request-response.store"

export function ProfileSelector() {
   const pathname = usePathname()
   const router = useRouter()
   const searchParams = useSearchParams()

   const [profiles, setProfiles] = useState<GetVendorProfileResponse[]>([])
   const [isOpen, setIsOpen] = useState(false)
   const [selectedVendorProfile, setSelectedVendorProfile] = useState("")
   const { setProfileActive } = useCreateRequestResponseStore((state) => state)

   function handleProfileSelection(name: string, id: string) {
      setSelectedVendorProfile(name)
      setProfileActive(id)
      setIsOpen(false)
      const params = new URLSearchParams(searchParams)
      params.set("profile", id)
      router.push(`${pathname}?${params.toString()}`)
   }

   useEffect(() => {
      async function fetchAndSetProfiles() {
         const response = await fetchVendorProfilesByAccessToken()

         if (response.success) {
            setProfiles(response.data)
            setSelectedVendorProfile(response.data[0].category.name)
            setProfileActive(response.data[0].id)
            const params = new URLSearchParams(searchParams)
            const profile = params.get("profile")
            if (!profile) {
               params.set("profile", response.data[0].id)
               router.push(`${pathname}?${params.toString()}`)
            } else {
               setSelectedVendorProfile("")
               setProfiles([])
            }
         }
      }

      fetchAndSetProfiles()
   }, [])

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
               {profiles.map((profile) => (
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
