import z from "zod"

export const usernameVO = () => z.string().min(3, "Usename requerido")
