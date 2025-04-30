import { Pagination, Skill, Vendor, VendorProfile } from "../models/models"

export type GetTalentsRequest = {
   order?: "asc" | "desc"
   city?: string
   skills?: string
   page?: number
   query?: string
   categoryId?: string
   limit?: number
}

export interface GetTalentsResponse {
   pagination: Pagination
   results: {
      id: string
      firstName: string
      lastName: string
      photo: string
      city: string
      title: string
   }[]
}
