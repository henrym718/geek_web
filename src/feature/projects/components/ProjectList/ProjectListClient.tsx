"use client"

import { Box } from "@/components/ui"
import { fetchRequestByClientId } from "@/data/api/services/proforma-request.service"
import useSWR from "swr"
import { ProjectCardHeader } from "../ProjectCard/ProjectCardHeader"
import { ProjectCardDescription } from "../ProjectCard/ProjectCardDescription"
import { ProjectCardSkills } from "../ProjectCard/ProjectCardSkills"
import { ProjectCardBudgetInfo } from "../ProjectCard/ProjectCardBudgetInfo"
import { ProjectCardMetadata } from "../ProjectCard/ProjectCardMetadata"
import { useRouter } from "next/navigation"

interface Props {
   search: string
}

export function ActiveProjectListClient({ search }: Readonly<Props>) {
   const router = useRouter()
   const { data: request, isLoading } = useSWR(search ? ["projects", search] : null, () => fetchRequestByClientId({ search }))

   if (isLoading) return <div>Loading...</div>
   if (!request?.success) return <div>Error: {request?.message}</div>

   return (
      <Box className="flex flex-col gap-8 mt-4 h-[calc(100vh-333px)] overflow-y-auto">
         {request.data.map((data) => (
            <Box
               key={data.request.id}
               className="group w-full flex flex-col bg-white rounded-2xl p-4 hover:shadow-lg hover:cursor-pointer hover:border-black/5 transition-all duration-300"
               onClick={() => {
                  router.push(`/client/account/projects?requestid=${data.request.id}`)
               }}>
               <ProjectCardHeader
                  createdAt={data.request.createdAt ?? new Date()}
                  title={data.request.title}
               />
               <ProjectCardBudgetInfo
                  quotation={data.request.quotation}
                  budget={data.request.budget}
                  budgetUnit={data.request.budgetUnit}
               />
               <ProjectCardDescription description={data.request.description} />
               <ProjectCardSkills skills={data.skills} />
               <ProjectCardMetadata
                  projectType={data.request.projectType}
                  projectLength={data.request.projectLength}
                  projectWorkload={data.request.projectWorkload}
                  city={data.city.name}
                  countResponses={data.request.countResponses}
               />
            </Box>
         ))}
      </Box>
   )
}
