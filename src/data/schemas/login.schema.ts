import { z } from "zod"
import { emailVO } from "../value-objects/email.vo"
import { passwordVO } from "../value-objects/password.vo"

export const loginSchema = z.object({
   email: emailVO(),
   password: passwordVO(),
})

export type LoginType = z.infer<typeof loginSchema>
