"use client"

import { useCreateProjectSteps } from "@/stores/useCreateProjectSteps"
import { GroupCategorySkillsSelector } from "./skill-request-builder/GroupCategorySkillsSelector"
import { Headline } from "./Headline"
import { Description } from "./Description"
import { Timing } from "./Timing"
import { Scope } from "./cope"
import { Budget } from "./Budget"
import { useCreateProjectData } from "@/stores/useCreateProjectData"
import { useCreateProjectRecoveryData } from "@/stores/useCreateProjectRecoveryData"
import { Box } from "@/components/ui"
import { Footer } from "./Footer"
import { createRequest } from "@/data/api/services/proforma-request.service"
import { sleep } from "@/lib/utils/sleep"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, Toaster } from "sonner"
export function Wizard() {
   const [isPendingCreateProject, setIsPendingCreateProject] = useState(false)

   const router = useRouter()
   const { step, nextStep, previousStep } = useCreateProjectSteps((state) => state)
   const { project, setProject } = useCreateProjectData((state) => state)
   const {
      categories,
      cleanSkillsSelected,
      groups,
      selectedCategory,
      selectedGroup,
      selectedProjectLength,
      selectedProjectWorkload,
      selectedScope,
      setCategories,
      setSelectedCategory,
      setSelectedGroup,
      setSelectedProjectLength,
      setSelectedProjectWorkload,
      setSelectedScope,
      setGroups,
   } = useCreateProjectRecoveryData((state) => state)

   const isDisabledStepButton = () => {
      if (step === 1) return !project.title.trim()
      if (step === 2) return !project.description.trim()
      if (step === 3) return !project.quotation && project.budget === 0
      if (step === 4) return !project.projectType || !project.projectLength || !project.projectWorkload
      if (step === 5) return !project.categoryId || !project.skills.length
      return true
   }

   const handleCreateProjecto = async () => {
      try {
         setIsPendingCreateProject(true)
         await sleep(1000)
         const response = await createRequest(project)
         if (response.success) {
            router.replace("/client/account/projects")
         } else {
            toast.error("Error al crear el projecto")
         }
      } finally {
         setIsPendingCreateProject(false)
      }
   }

   return (
      <Box className="flex flex-col h-screen w-4/6 mx-auto pt-28">
         <Box className="flex-grow">
            {step === 1 && (
               <Headline
                  setProject={setProject}
                  title={project.title}
               />
            )}
            {step === 2 && (
               <Description
                  setProject={setProject}
                  description={project.description}
               />
            )}
            {step === 3 && (
               <Budget
                  budget={project.budget}
                  budgetUnit={project.budgetUnit}
                  quotation={project.quotation}
                  setProject={setProject}
               />
            )}
            {step === 4 && (
               <Timing
                  projectType={project.projectType}
                  selectedProjectLength={selectedProjectLength}
                  selectedProjectWorkload={selectedProjectWorkload}
                  setProject={setProject}
                  setSelectedProjectLength={setSelectedProjectLength}
                  setSelectedProjectWorkload={setSelectedProjectWorkload}
               />
            )}
            {step === 5 && (
               <GroupCategorySkillsSelector
                  categories={categories}
                  cleanSkillsSelected={cleanSkillsSelected}
                  groups={groups}
                  selectedCategory={selectedCategory}
                  selectedGroup={selectedGroup}
                  setCategories={setCategories}
                  setGroups={setGroups}
                  setProject={setProject}
                  setSelectedCategory={setSelectedCategory}
                  setSelectedGroup={setSelectedGroup}
               />
            )}
            {step === 6 && (
               <Scope
                  selectedScope={selectedScope}
                  setProject={setProject}
                  setSelectedScope={setSelectedScope}
               />
            )}{" "}
         </Box>

         <footer className="w-screen ml-[-50vw] left-1/2 relative">
            <Footer
               project={project}
               step={step}
               totalSteps={6}
               nextStep={nextStep}
               previousStep={previousStep}
               isDisabledStepButton={isDisabledStepButton()}
               handleCreateProjecto={handleCreateProjecto}
               isPendingCreateProject={isPendingCreateProject}
            />
         </footer>
         <Toaster />
      </Box>
   )
}
