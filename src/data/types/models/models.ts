import { BudgetType, ProjectLengthType, ProjectType, ProjectWorkloadType, RoleType, StatusType } from "@/config/constants"

export interface User {
   id: string
   username: string
   email: string
   role: RoleType
   profileCompleted: boolean
   isActive: boolean
   createdAt: string
   updatedAt: string
}

export interface Client {
   id: string
   firstName: string
   lastName: string
   photo?: string | null
   phone: string
   city: string
}

export interface Vendor {
   id: string
   firstName: string
   lastName: string
   photo?: string | null
   phone: string
   city: string
}

export interface VendorProfile {
   id: string
   title: string
   aboutme: string
   isActive: boolean
   createdAt?: Date
   updatedAt?: Date
}

export interface ProformaRequest {
   id: string
   title: string
   description: string
   budget: number
   budgetUnit: BudgetType
   projectType: ProjectType
   projectLength: ProjectLengthType
   projectWorkload: ProjectWorkloadType
   scope: string
   status: StatusType
   createdAt?: Date
}

export interface ProformaResponse {
   id: string
   budget?: number
   message: string
   status: StatusType
   createdAt?: Date
}

export interface Skill {
   id: string
   name: string
}

export interface Category {
   id: string
   name: string
}

export interface Group {
   id: string
   name: string
}

export interface Suggestion {
   id: string
   text: string
}
