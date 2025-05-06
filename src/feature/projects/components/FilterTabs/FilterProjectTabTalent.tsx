// TalentRequestFilterTabs.tsx
"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tab } from "@/components/ui"
import { TalentTabType } from "@/config/constants"

interface Props {
   tabs: readonly TalentTabType[]
}

export function FilterProjectTabTalent({ tabs }: Readonly<Props>) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const initialTabValue = searchParams.get("search") || tabs[0].value
   const [selectedTabValue, setSelectedTabValue] = useState(initialTabValue)

   const handleTabChange = (tabValue: string) => {
      setSelectedTabValue(tabValue)
   }

   useEffect(() => {
      const updateUrlSearchParams = () => {
         const currentTabParam = searchParams.get("search")
         const newSearchParams = new URLSearchParams(searchParams.toString())

         if (!currentTabParam) {
            const defaultTabValue = tabs[0].value
            newSearchParams.set("search", defaultTabValue)
            router.push(`?${newSearchParams}`)
         } else if (currentTabParam !== selectedTabValue) {
            newSearchParams.set("search", selectedTabValue)
            router.push(`?${newSearchParams}`)
         }
      }

      updateUrlSearchParams()
   }, [searchParams, router, tabs, selectedTabValue])

   return (
      <Tab
         tabs={tabs}
         onSelectTab={handleTabChange}
         activeTab={selectedTabValue}
      />
   )
}
