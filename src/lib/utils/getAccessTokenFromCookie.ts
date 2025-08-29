"use server"
import { cookies } from "next/headers"

export async function getAccessTokenFromCookie(): Promise<string> {
   const cookieStore = await cookies()
   const response = cookieStore.get("accessToken")?.value ?? ""
   return response
}
