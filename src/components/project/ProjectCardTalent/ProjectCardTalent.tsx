"use client"

import { Box } from "@/components/ui"
import { ProjectHeader } from "../ProjectCard/ProjectHeader"
import { ProjectBudgetInfo } from "../ProjectCard/ProjectBudgetInfo"
import { ProjectDescription } from "../ProjectCard/ProjectDescription"
import { ProjectSkillsList } from "../ProjectCard/ProjectSkillsList"
import { ProjectMetadata } from "../ProjectCard/ProjectMetadata"
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
         <ProjectHeader
            createdAt={project.createdAt ?? new Date()}
            title={project.title}
         />
         <ProjectBudgetInfo
            quotation={project.quotation}
            budget={project.budget}
            budgetUnit={project.budgetUnit}
         />
         <ProjectDescription description={project.description} />
         <ProjectSkillsList skills={skills} />
         <ProjectMetadata
            projectType={project.projectType}
            projectLength={project.projectLength}
            projectWorkload={project.projectWorkload}
            city={city.name}
            countResponses={project.countResponses}
         />
      </Box>
   )
}
