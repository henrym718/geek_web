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

export const BUDGET_TYPE_OPTIONS = [
   { value: "project", label: "Proyecto" },
   { value: "hour", label: "Hora" },
   { value: "day", label: "Día" },
   { value: "week", label: "Semana" },
   { value: "month", label: "Mes" },
] as const

export type BudgetType = (typeof BUDGET_TYPE_OPTIONS)[number]["value"]

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
