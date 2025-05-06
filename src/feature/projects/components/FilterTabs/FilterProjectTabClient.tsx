"use client"

import { Tab } from "@/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface PropsFilterRequestTab {
   tabs: {
      label: string
      value: string
   }[]
}

export function FilterProjectTabClient({ tabs }: Readonly<PropsFilterRequestTab>) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [activeTab, setActiveTab] = useState("")

   const handleSelectTab = (tab: string) => {
      setActiveTab(tab.toLowerCase())
   }

   useEffect(() => {
      const setSearchParams = () => {
         const currentSearchParam = searchParams.get("search")
         const updatedParams = new URLSearchParams(searchParams.toString())

         if (!currentSearchParam) {
            const defaultTabValue = tabs[0].value.toLowerCase()
            setActiveTab(defaultTabValue)
            updatedParams.set("search", defaultTabValue)
            updatedParams.delete("requestid")
            router.push(`${pathname}?${updatedParams}`)
         } else if (currentSearchParam && !activeTab) {
            setActiveTab(currentSearchParam)
         } else if (currentSearchParam !== activeTab) {
            updatedParams.set("search", activeTab)
            updatedParams.delete("requestid")
            router.push(`${pathname}?${updatedParams}`)
         }
      }
      setSearchParams()
   }, [searchParams, pathname, router, tabs, activeTab])

   return (
      <Tab
         tabs={tabs}
         onSelectTab={handleSelectTab}
         activeTab={activeTab}
      />
   )
}
