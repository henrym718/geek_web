import z from "zod"

export const phoneVO = () => z.string().min(10, "El teléfono debe tener al menos 10 caracteres")
