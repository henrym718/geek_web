import { Category, City, ProformaRequest, Skill } from "../models/models"

export interface CreateRequestRequest {
   title: string
   description: string
   budget: number
   budgetUnit: string
   quotation: boolean
   city: string
   projectType: string
   projectLength: string
   projectWorkload: string
   clientId: string
   categoryId: string
   skills: string[]
}

export interface CreateRequestResponse {
   detail: string
}

export interface GetRequestsByClientIdResponse {
   request: ProformaRequest
   skills: Skill[]
   category: Category
   city: City
}
