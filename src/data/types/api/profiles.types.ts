import { Skill, Vendor, VendorProfile } from "../models/models"

export type SearchRequest = {
   order?: "asc" | "desc"
   city?: string
   skills?: string
   page?: number
   query?: string
   categoryName?: string
   limit?: number
}

export interface SearchResponse {
   results: number
   currentPage: number
   pages: number
   nextPage: number | null
   prevPage: number | null
   data: {
      vendor: Vendor
      vendorProfile: VendorProfile
      skills: Skill[]
   }[]
}
