import z from "zod"
import { cityVO, emailVO, firstNameVO, lastNameVO, passwordVO, phoneVO, usernameVO } from "./values-objects"
import { checkEmailExists, checkUsernameExists } from "@/app/services/auth/auth.services"

export const registerSchema = z.object({
   firstName: firstNameVO,
   lastName: lastNameVO,
   city: cityVO,
   password: passwordVO,
   username: usernameVO.superRefine(async (username, ctx) => {
      const usernameExist = await checkUsernameExists({ username })
      if (usernameExist.success && usernameExist.data.exists) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username ya existe, intenta con otro",
         })
      }
   }),
   email: emailVO.superRefine(async (email, ctx) => {
      const emailExists = await checkEmailExists({ email })
      if (emailExists.success && emailExists.data.exists) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Parece que ya tiene una cuenta",
         })
      }
   }),
   phone: phoneVO,
})

export type RegisterType = z.infer<typeof registerSchema>
