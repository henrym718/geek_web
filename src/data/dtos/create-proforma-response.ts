export interface CreateResponseRequest {
   budget?: number
   message: string
   profileVendorId: string
   proformaRequestId: string
}

export interface CreateResponse {
   details: string
}
