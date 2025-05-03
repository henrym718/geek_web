import { BudgetUnitType, ProjectLengthType, ProjectType, ProjectWorkloadType } from "@/config/constants"

export interface CreateRequestRequest {
   title: string
   description: string
   budget: number
   budgetUnit: BudgetUnitType | null
   projectType: ProjectType | null
   projectLength: ProjectLengthType | null
   projectWorkload: ProjectWorkloadType | null
   quotation: boolean
   city: string
   categoryId: string
   skills: string[]
}

export interface CreateRequestResponse {
   detail: string
}
