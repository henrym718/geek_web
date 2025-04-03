import { z } from "zod"
import { emailVO, passwordVO } from "./values-objects"

export const loginSchema = z.object({
   email: emailVO,
   password: passwordVO,
})

export type LoginType = z.infer<typeof loginSchema>
