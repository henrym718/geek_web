"use client"
import { Box } from "@/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RequestHeader } from "./request-header"
import { Skill } from "@/data/types/models/models"
import { RequestBudgetInfo } from "./request-budget-info"
import { RequestDescription } from "./request-description"
import { RequestSkills } from "./request-skills"
import { RequestMetadata } from "./request-metadata"
import { RequestStatusSelector } from "./request-status-selector"

interface Props {
   id: string
   title: string
   createdAt: Date
   description: string
   quotation: boolean
   budget: number
   budgetUnit: string
   skills: Skill[]
   scope: string
   projectType: string
   projectLength: string
   projectWorkload: string
   countResponses: number
}

export function RequestCard(props: Readonly<Props>) {
   const {
      id,
      title,
      createdAt,
      description,
      quotation,
      budget,
      budgetUnit,
      skills,
      scope,
      projectType,
      projectLength,
      projectWorkload,
      countResponses,
   } = props
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const handleSeeProposals = () => {
      const params = new URLSearchParams(searchParams)
      params.set("requestid", id)
      router.push(`${pathname}?${params.toString()}`)
   }

   return (
      <Box
         className="group flex flex-col bg-white relative border-2 rounded-xl border-black/10 gap-4 px-6 py-4 hover:cursor-pointer hover:border-black/20 hover:shadow-md transition-all duration-300"
         onClick={handleSeeProposals}>
         <Box>
            <RequestHeader
               createdAt={createdAt}
               title={title}
            />
            <RequestBudgetInfo
               quotation={quotation}
               budget={budget}
               budgetUnit={budgetUnit}
            />
            <RequestDescription description={description} />
            <RequestSkills skills={skills} />
            <RequestMetadata
               projectType={projectType}
               projectLength={projectLength}
               projectWorkload={projectWorkload}
               scope={scope}
               countResponses={countResponses}
            />
            <RequestStatusSelector />
         </Box>
      </Box>
   )
}
