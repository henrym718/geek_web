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
