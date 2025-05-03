"use client"

import { SideModal, SideModalContent, SideModalTrigger } from "@/components/ui"
import { ProjectsResponseForm } from "../project/ProjectsResponseForm/ProjectsResponseForm"
import { Category, City, ProformaRequest, Skill } from "@/data/types/models/models"

interface Props {
   project: ProformaRequest
   skills: Skill[]
   category: Category
   city: City
   profileId: string
   exists: boolean
   children: React.ReactElement<{ onClick: () => void }>
}

export function PorjectTalentResponseModal({ project, skills, category, city, profileId, exists, children }: Readonly<Props>) {
   return (
      <SideModal>
         <SideModalTrigger>
            <div>{children}</div>
         </SideModalTrigger>
         <SideModalContent>
            {(closeModal) => (
               <ProjectsResponseForm
                  project={project}
                  skills={skills}
                  category={category}
                  city={city}
                  profileId={profileId}
                  exists={exists}
                  closeModal={closeModal}
               />
            )}
         </SideModalContent>
      </SideModal>
   )
}
