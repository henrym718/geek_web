"use server"
import { cookies } from "next/headers"

export async function getAccessTokenFromCookie(): Promise<string | null> {
   const cookieStore = await cookies()
   const response = cookieStore.get("accessToken")?.value ?? null
   return response
}
