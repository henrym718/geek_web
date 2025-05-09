import { Box } from "@/components/ui/box"
import { Typography } from "@/components/ui"
import { fetchProjectsBySkillId } from "@/data/api/services/proforma-request.service"
import ProjectListPublic from "@/feature/projects/components/ProjectList/ProjectListPublic"
import { notFound } from "next/navigation"
interface Props {
   searchParams: Promise<{ skill: string }>
}

export default async function ProjectsPage(props: Readonly<Props>) {
   const { skill } = await props.searchParams

   if (!skill) {
      return <div>No skill provided</div>
   }

   const response = await fetchProjectsBySkillId(skill)

   const projects = response.success ? response.data : []

   if (projects.length === 0) {
      return notFound()
   }

   return (
      <Box className="flex flex-col gap-4 w-full h-full">
         <Typography variant="titulo2">Proyectos</Typography>
         <Typography variant="label">
            Encuentra proyectos que necesitan ayuda, puedes crear una cuenta de profesional para responder a ellos.
         </Typography>

         <ProjectListPublic projects={projects} />
      </Box>
   )
}
