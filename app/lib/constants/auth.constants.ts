export const ROLE = {
   CLIENT: "CLIENT",
   VENDOR: "VENDOR",
} as const
export type RoleType = (typeof ROLE)[keyof typeof ROLE]

export const AUTH_FORM = {
   ROLE: "ROLE",
   REGISTER: "REGISTER",
   VENDOR_PROFILE: "VENDOR_PROFILE",
} as const

export type AuthFormType = (typeof AUTH_FORM)[keyof typeof AUTH_FORM]
