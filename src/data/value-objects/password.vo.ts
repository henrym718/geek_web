import z from "zod"

export const passwordVO = () => z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
