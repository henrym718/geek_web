export interface GetRequestByProfileIdRequest {
   profileId: string
}

export interface GetRequestByProfileIdResponse {
   id: string
   title: string
   description: string
   budget: number
   scope: string
   status: string
   createdAt: Date | undefined
   skills: {
      id: string
      name: string
   }[]
   category: {
      id: string
      name: string
   }
}
