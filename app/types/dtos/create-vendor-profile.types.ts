export interface CreateVendorProfileRequest {
   title: string
   skills: string[]
   aboutme: string
   vendorId: string
   categoryId: string
}

export interface CreateVendorProfileResponse {
   detail: string
}
