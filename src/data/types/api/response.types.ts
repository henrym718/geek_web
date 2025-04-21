import { StatusResponseType } from "@/config/constants"
import { ProformaResponse, Skill, User, Vendor, VendorProfile } from "../models/models"

export interface GetResponsesByRequestIdRequest {
   requestid: string
}

export interface GetResponsesByRequestIdResponse {
   proformaResponse: Pick<ProformaResponse, "id" | "budget" | "message" | "status">
   user: Pick<User, "createdAt" | "username">
   vendor: Pick<Vendor, "photo" | "phone" | "city">
   vendorProfile: Pick<VendorProfile, "aboutme" | "title">
   skills: Skill[]
}

export interface UpdateStatusByClientRequest {
   proformaRequestId: string
   proformaResponseId: string
   newStatus: StatusResponseType
}

export interface UpdateStatusByClientResponse {
   details: string
}
