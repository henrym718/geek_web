export interface CreateRequestRequest {
   title: string
   description: string
   budget: number
   scope: string
   clientId: string
   categoryId: string
   skills: string[]
}

export interface CreateRequestResponse {
   detail: string
}
