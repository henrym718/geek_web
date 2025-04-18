import { BudgetType, ProjectLengthType, ProjectType, ProjectWorkloadType } from "@/config/constants"

export interface CreateRequestRequest {
   title: string
   description: string
   budget: number
   budgetUnit: BudgetType | null
   projectType: ProjectType | null
   projectLength: ProjectLengthType | null
   projectWorkload: ProjectWorkloadType | null
   quotation: boolean
   scope: string
   categoryId: string
   skills: string[]
}

export interface CreateRequestResponse {
   detail: string
}
