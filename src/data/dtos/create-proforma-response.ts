export interface CreateProformaResponseRequest {
   budget?: number
   message: string
   profileVendorId: string
   proformaRequestId: string
}

export interface CreateProformaResponse {
   details: string
}
