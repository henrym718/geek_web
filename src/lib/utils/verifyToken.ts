import { jwtVerify } from "jose"

export type TokenPayload = {
   userId: string
   email: string
   role: string
   username: string
}

export async function verifyToken(token: string): Promise<TokenPayload> {
   const secret = process.env.NEXT_KEY_SECRET_TOKEN as string

   // Verificamos el JWT usando 'jose'
   const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))

   return payload as TokenPayload
}
