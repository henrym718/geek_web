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

export const SEARCH_TYPE = {
   TALENT: "TALENT",
   PROJECT: "PROJECT",
} as const

export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE]

export const STATUS_REQUEST = {
   ACTIVE: "ACTIVE",
   ANNULLED: "ANNULLED",
   FINISHED: "FINISHED",
   MATCHED: "MATCHED",
} as const

export type StatusRequestType = (typeof STATUS_REQUEST)[keyof typeof STATUS_REQUEST]

export const STATUS_RESPONSE = {
   PENDING: "PENDING",
   ACCEPTED: "ACCEPTED",
   REJECTED: "REJECTED",
} as const

export type StatusResponseType = (typeof STATUS_RESPONSE)[keyof typeof STATUS_RESPONSE]

export const BUDGET_UNIT_OPTIONS = [
   { value: "PROJECT", label: "Proyecto" },
   { value: "HOUR", label: "Hora" },
   { value: "DAY", label: "Día" },
   { value: "WEEK", label: "Semana" },
   { value: "MONTH", label: "Mes" },
] as const

export type BudgetUnitType = (typeof BUDGET_UNIT_OPTIONS)[number]["value"]
export const budgetUnitMap = BUDGET_UNIT_OPTIONS.reduce((acc, curr) => {
   acc[curr.value] = curr.label.toLowerCase()
   return acc
}, {} as Record<string, string>)

export const PROJECT_TYPE_OPTIONS = [
   { value: "ONE_TIME", label: "Proyecto único" },
   { value: "RECURRING", label: "Proyecto recurrente" },
] as const

export type ProjectType = (typeof PROJECT_TYPE_OPTIONS)[number]["value"]
export const projectTypeMap = PROJECT_TYPE_OPTIONS.reduce((acc, curr) => {
   acc[curr.value] = curr.label
   return acc
}, {} as Record<string, string>)

export const PROJECT_LENGTH_OPTIONS = [
   { value: "SINGLE_DAY", label: "Solo por un día" },
   { value: "FEW_DAYS", label: "Pocos días (2-3)" },
   { value: "ONE_WEEK", label: "Menos de 1 semana" },
   { value: "TWO_FOUR_WEEKS", label: "2-4 semanas" },
   { value: "ONE_THREE_MONTHS", label: "1 a 3 meses" },
   { value: "THREE_SIX_MONTHS", label: "3 a 6 meses" },
   { value: "GT_SIX_MONTHS", label: "Más de 6 meses" },
   { value: "INDEFINITE", label: "Sin duración definida" },
] as const

export type ProjectLengthType = (typeof PROJECT_LENGTH_OPTIONS)[number]["value"]
export const projectLengthMap = PROJECT_LENGTH_OPTIONS.reduce((acc, curr) => {
   acc[curr.value] = curr.label
   return acc
}, {} as Record<string, string>)

export const PROJECT_WORKLOAD_OPTIONS = [
   { value: "LT_TEN", label: "Menos de 10 horas/semana" },
   { value: "TEN_TWENTY", label: "Entre 10 y 20 horas/semana" },
   { value: "TWENTY_THIRTY", label: "Entre 20 y 30 horas/semana" },
   { value: "THIRTY_FORTY", label: "Entre 30 y 40 horas/semana" },
   { value: "GT_FORTY", label: "Más de 40 horas/semana" },
   { value: "VARIABLE", label: "Carga horaria variable semana a semana" },
   { value: "FLEXIBLE", label: "Horario flexible / depende del avance del proyecto" },
] as const

export type ProjectWorkloadType = (typeof PROJECT_WORKLOAD_OPTIONS)[number]["value"]
export const projectWorkloadMap = PROJECT_WORKLOAD_OPTIONS.reduce((acc, curr) => {
   acc[curr.value] = curr.label
   return acc
}, {} as Record<string, string>)
