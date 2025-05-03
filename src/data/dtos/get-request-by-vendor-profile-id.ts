import { Category, City, ProformaRequest, Skill } from "../types/models/models"

export interface GetRequestByProfileIdRequest {
   profileId: string
}

export interface GetRequestByProfileIdResponse {
   request: ProformaRequest
   skills: Skill[]
   category: Category
   city: City
}
