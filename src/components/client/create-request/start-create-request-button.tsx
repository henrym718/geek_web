"use client"
import { Button } from "@/components/ui"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function StartCreateRequestButton() {
   const router = useRouter()
   return (
      <Button
         variant="secundary"
         onClick={() => router.push("/client/account/create-request")}>
         <Plus className="w-4 h-4" />
         Nueva solicitud
      </Button>
   )
}
