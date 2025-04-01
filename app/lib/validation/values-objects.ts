import z from "zod"
import { checkEmailExists } from "@/app/services/auth/auth.services"

export const emailVO = z
   .string()
   .email("Formato de email inválido")
   .superRefine(async (email, ctx) => {
      const emailExists = await checkEmailExists({ email })
      if (emailExists.success && emailExists.data.exists) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Parece que ya tiene una cuenta",
         })
      }
   })
export const passwordVO = z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
export const firstNameVO = z.string().min(3, "El nombre es requerido")
export const lastNameVO = z.string().min(3, "El apellido es requerido")
export const phoneVO = z.string().min(10, "El teléfono debe tener al menos 10 caracteres")

// Validación que asegura que se ha seleccionado una ciudad de la lista
export const cityVO = z
   .object({
      id: z.string().min(1, "Debes seleccionar una ciudad de la lista"),
      label: z.string().min(1, "El nombre de la ciudad es requerido"),
   })
   .superRefine((city, ctx) => {
      // Si solo hay texto pero no hay ID válido, es porque el usuario escribió pero no seleccionó
      if (!city.id && city.label) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debes seleccionar una ciudad de la lista",
            path: ["label"],
         })
      }
   })
