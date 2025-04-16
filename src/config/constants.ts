export const ROLE = {
   CLIENT: "CLIENT",
   VENDOR: "VENDOR",
} as const

export type RoleType = (typeof ROLE)[keyof typeof ROLE]

export const AUTH_FORM = {
   ROLE: "ROLE",
   REGISTER: "REGISTER",
} as const

export type AuthFormType = (typeof AUTH_FORM)[keyof typeof AUTH_FORM]

export const BUDGET_UNIT_OPTIONS = [
   { value: "project", label: "Proyecto" },
   { value: "hour", label: "Hora" },
   { value: "day", label: "Día" },
   { value: "week", label: "Semana" },
   { value: "month", label: "Mes" },
] as const

export type BudgetType = (typeof BUDGET_UNIT_OPTIONS)[number]["value"]

export const PROJECT_TYPE_OPTIONS = [
   { value: "unique", label: "Único" },
   { value: "recurring", label: "Recurrente" },
] as const

export type ProjectType = (typeof PROJECT_TYPE_OPTIONS)[number]["value"]

export const PROJECT_LENGTH_OPTIONS = [
   { value: "single_day", label: "Solo por un día" },
   { value: "few_days", label: "Pocos días (2-3)" },
   { value: "1_week", label: "Menos de 1 semana" },
   { value: "2_4_weeks", label: "2-4 semanas" },
   { value: "1_3_months", label: "1 a 3 meses" },
   { value: "3_6_months", label: "3 a 6 meses" },
   { value: "gt6_months", label: "Más de 6 meses" },
   { value: "indefinite", label: "Sin duración definida" },
] as const

export type ProjectLengthType = (typeof PROJECT_LENGTH_OPTIONS)[number]["value"]

export const PROJECT_WORKLOAD_OPTIONS = [
   { value: "lt10", label: "Menos de 10 horas/semana" },
   { value: "10_20", label: "Entre 10 y 20 horas/semana" },
   { value: "20_30", label: "Entre 20 y 30 horas/semana" },
   { value: "30_40", label: "Entre 30 y 40 horas/semana" },
   { value: "gt40", label: "Más de 40 horas/semana" },
   { value: "variable", label: "Carga horaria variable semana a semana" },
   { value: "flexible", label: "Horario flexible / depende del avance del proyecto" },
] as const

export type ProjectWorkloadType = (typeof PROJECT_WORKLOAD_OPTIONS)[number]["value"]

export const AUTH_ENDPOINTS = {
   LOGIN: "/authenticate/login",
   REGISTER: "/authenticate/register",
   CURRENT_USER: "/authenticate/me",
   CHECK_EMAIL: "/authenticate/check-email",
   CHECK_USERNAME: "/authenticate/check-username",
} as const

export const SKILL_ENDPOINTS = {
   SKILLS_BY_CATEGORY_ID: (categoryId: string) => `/skill/${categoryId}`,
} as const

export const CATEGORY_ENDPOINTS = {
   CATEGORIES_BY_GROUP_ID: (groupId: string) => `/category/${groupId}`,
} as const

export const GROUP_ENDPOINTS = {
   ALL_GROUPS: "/group",
} as const

export const PROFORMA_REQUEST_ENDPOINTS = {
   PROFORMA_REQUEST_BY_VENDOR_PROFILE_ID: (vendorProfileId: string) => `/proforma-request/vendor/${vendorProfileId}`,
} as const

export const PROFORMA_RESPONSE_ENDPOINTS = {
   CREATE_PROFORMA_RESPONSE: "/proforma-response",
   CHECK_RESPONSE_EXISTS: (proformaRequestId: string, profileVendorId: string) => `/proforma-response/exists/${proformaRequestId}/${profileVendorId}`,
} as const

export const VENDOR_PROFILE_ENDPOINTS = {
   VENDOR_PROFILE_BY_ACCESS_TOKEN: "/vendor-profile/me",
   CREATE_VENDOR_PROFILE: "/vendor-profile",
} as const
