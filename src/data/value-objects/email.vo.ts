import { z } from "zod"

export const emailVO = () => z.string().email("Formato de email inválido")
