import { TokenPayload, verifyToken } from "./verifyToken"
import { getAccessTokenFromCookie } from "./get-access-token-from-cookie"

export async function getDataFomAccessToken(): Promise<TokenPayload | null> {
   const accessToken = await getAccessTokenFromCookie()
   if (!accessToken) return null
   const response = await verifyToken(accessToken)
   return response
}
