export interface CreateProformaResponseRequest {
   budget: number | undefined
   message: string
   profileVendorId: string
   proformaRequestId: string
}

export interface CreateProformaResponse {
   details: string
}
