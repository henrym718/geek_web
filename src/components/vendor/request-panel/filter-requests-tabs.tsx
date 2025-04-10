// ProformaRequestTabs.tsx
"use client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Tab } from "@/components/ui"

interface Props {
   tabs: {
      label: string
      value: string
   }[]
}

export function FilterRequestsTabs({ tabs }: Props) {
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

   useEffect(() => {
      const search = searchParams.get("search")
      if (!search) {
         const params = new URLSearchParams(searchParams.toString())
         params.set("search", tabs[0].value)
         router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }
   }, [searchParams, pathname, router, tabs])

   return (
      <Tab
         tabs={tabs}
         onSelectTab={onSelectTab}
         activeTab={activeTab} // Usar el estado local para feedback inmediato
      />
   )
}
