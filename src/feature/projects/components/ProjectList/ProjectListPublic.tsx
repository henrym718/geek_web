import { ProjectCardDescription } from "../ProjectCard/ProjectCardDescription"
import { ProjectCardSkills } from "../ProjectCard/ProjectCardSkills"
import { Box } from "@/components/ui/box"
import { ProjectCardMetadata } from "../ProjectCard/ProjectCardMetadata"
import { ProjectCardBudgetInfo } from "../ProjectCard/ProjectCardBudgetInfo"
import { ProjectCardHeader } from "../ProjectCard/ProjectCardHeader"
import { GetProjectsBySkillIdResponse } from "@/data/types/api/request.types"

interface Props {
   projects: GetProjectsBySkillIdResponse[]
}
export default function ProjectListPublic({ projects }: Readonly<Props>) {
   return (
      <Box className="flex flex-col gap-8 mt-4">
         {projects.map((data, index) => (
            <Box
               key={index}
               className="group w-full border border-gray-300 flex flex-col bg-white rounded-2xl p-4 hover:shadow-lg hover:cursor-pointer hover:border-gray-400 transition-all duration-300">
               <ProjectCardHeader
                  createdAt={data.request?.createdAt || new Date()}
                  title={data.request.title}
                  nextButton={false}
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
