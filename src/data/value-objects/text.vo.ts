import z from "zod"

export const textVO = (label: string) => z.string().min(3, `${label} es requerido`)
