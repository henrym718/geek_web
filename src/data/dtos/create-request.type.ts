import { BudgetType } from "@/config/constants"

export interface CreateRequestRequest {
   title: string
   description: string
   budget: number
   budgetUnit: BudgetType | undefined
   quotation: boolean
   scope: string
   clientId: string
   categoryId: string
   skills: string[]
}

export interface CreateRequestResponse {
   detail: string
}
