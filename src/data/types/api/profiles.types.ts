import { Category, Pagination, Skill, User, Vendor, VendorProfile } from "../models/models"

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

export interface GetVendorProfileByIdResponse {
   user: Pick<User, "id" | "username">
   vendor: Pick<Vendor, "firstName" | "lastName" | "photo" | "phone" | "city">
   vendorProfile: Pick<VendorProfile, "title" | "aboutme" | "createdAt">
   category: Category
   skills: Skill[]
}
