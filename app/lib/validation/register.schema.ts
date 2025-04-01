import z from "zod"
import { cityVO, emailVO, firstNameVO, lastNameVO, passwordVO, phoneVO } from "./values-objects"

export const registerSchema = z.object({
   firstName: firstNameVO,
   lastName: lastNameVO,
   city: cityVO,
   password: passwordVO,
   email: emailVO,
   phone: phoneVO,
})

export type RegisterType = z.infer<typeof registerSchema>
