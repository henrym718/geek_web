import z from "zod"

// Validación que asegura que se ha seleccionado una ciudad de la lista
export const cityVO = () =>
   z
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
