"use client"

import { Box } from "@/components/ui"
import { ProjectCardHeader } from "../../../feature/projects/components/ProjectCard/ProjectCardHeader"
import { ProjectCardBudgetInfo } from "../../../feature/projects/components/ProjectCard/ProjectCardBudgetInfo"
import { ProjectCardDescription } from "../../../feature/projects/components/ProjectCard/ProjectCardDescription"
import { ProjectCardSkills } from "../../../feature/projects/components/ProjectCard/ProjectCardSkills"
import { ProjectCardMetadata } from "../../../feature/projects/components/ProjectCard/ProjectCardMetadata"
import { City, ProformaRequest, Skill } from "@/data/types/models/models"
import { cn } from "@/lib/utils/cn"

interface Props {
   project: ProformaRequest
   skills: Skill[]
   city: City
   exists: boolean
}

export function ProjectCardTalent({ project, skills, city, exists }: Readonly<Props>) {
   return (
      <Box
         className={cn(
            "group w-full flex flex-col bg-white rounded-2xl p-4 hover:shadow-lg hover:cursor-pointer hover:border-black/5 transition-all duration-300",
            exists && "bg-black/5"
         )}>
         <ProjectCardHeader
            createdAt={project.createdAt ?? new Date()}
            title={project.title}
         />
         <ProjectCardBudgetInfo
            quotation={project.quotation}
            budget={project.budget}
            budgetUnit={project.budgetUnit}
         />
         <ProjectCardDescription description={project.description} />
         <ProjectCardSkills skills={skills} />
         <ProjectCardMetadata
            projectType={project.projectType}
            projectLength={project.projectLength}
            projectWorkload={project.projectWorkload}
            city={city.name}
            countResponses={project.countResponses}
         />
      </Box>
   )
}
