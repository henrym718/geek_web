import { Category, City, Pagination, Skill, User, Vendor, VendorProfile } from "../types/models/models"

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
      bannerImage: string
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
   city: City
}

export interface TalentProfile {
   id: string
   firstName: string
   lastName: string
   bannerImage: string
   photo: string
   city: string
   title: string
}

export interface CreateTalentProfileRequest {
   title: string
   skills: string[]
   aboutme: string
   categoryId: string
   bannerImage: string
}

export interface CreateTalentProfileResponse {
   detail: string
}
