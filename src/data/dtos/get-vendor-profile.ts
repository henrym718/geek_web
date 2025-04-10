export interface GetVendorProfileResponse {
   id: string
   title: string
   aboutme: string
   isActive: boolean
   createdAt: string
   updatedAt: string
   category: {
      id: string
      name: string
   }
   skills: {
      id: string
      name: string
   }[]
}
