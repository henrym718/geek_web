// ProformaRequestTabs.tsx
"use client"
import { Tab } from "@/app/components/ui/Tab"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

interface ProformaRequestTabsProps {
   tabs: {
      label: string
      value: string
   }[]
}

export default function ProformaRequestTabs({ tabs }: ProformaRequestTabsProps) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const currentSearch = searchParams.get("search") || tabs[0].value

   const [activeTab, setActiveTab] = useState(currentSearch)

   const onSelectTab = (tab: string) => {
      // Actualizar estado local inmediatamente para UI optimista
      setActiveTab(tab)

      // Construir nuevos parámetros
      const params = new URLSearchParams(searchParams.toString())
      params.set("search", tab)

      // Actualizar URL sin recargar la página completamente
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
   }

   return (
      <Tab
         tabs={tabs}
         onSelectTab={onSelectTab}
         activeTab={activeTab} // Usar el estado local para feedback inmediato
      />
   )
}
