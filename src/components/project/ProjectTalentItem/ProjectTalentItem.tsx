"use client"

import { useEffect, useState } from "react"
import { Box } from "@/components/ui"
import { checkResponseExists } from "@/data/api/services/proforma-response.service"
import { PorjectTalentResponseModal } from "../ProjectTalentResponseModal/ProjectTalentResponseModal"
import { ProjectCardTalent } from "../ProjectCardTalent/ProjectCardTalent"
import { Category, City, ProformaRequest, Skill } from "@/data/types/models/models"

interface Props {
   project: ProformaRequest
   skills: Skill[]
   category: Category
   city: City
   profileId: string
}
export function ProjectTalentItem({ project, skills, category, city, profileId }: Readonly<Props>) {
   const [exists, setExists] = useState(false)

   useEffect(() => {
      const fetch = async () => {
         const response = await checkResponseExists({
            proformaRequestId: project.id,
            profileVendorId: profileId,
         })
         if (response.success && response.data?.exists) {
            setExists(true)
         }
      }

      fetch()
   }, [profileId, project.id])

   return (
      <Box className="w-full">
         <PorjectTalentResponseModal
            project={project}
            skills={skills}
            category={category}
            city={city}
            profileId={profileId}
            exists={exists}>
            <ProjectCardTalent
               project={project}
               skills={skills}
               city={city}
               exists={exists}
            />
         </PorjectTalentResponseModal>
      </Box>
   )
}
