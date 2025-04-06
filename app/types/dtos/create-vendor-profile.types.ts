export interface CreateVendorProfileRequest {
   title: string
   skills: string[]
   aboutme: string
   categoryId: string
}

export interface CreateVendorProfileResponse {
   detail: string
}
