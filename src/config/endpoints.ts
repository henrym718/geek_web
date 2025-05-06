export const AUTH_ENDPOINTS = {
   LOGIN: "/authenticate/login",
   REGISTER: "/authenticate/register",
   CURRENT_USER: "/authenticate/me",
   CHECK_EMAIL: "/authenticate/check-email",
   CHECK_USERNAME: "/authenticate/check-username",
   LOGOUT: "/authenticate/logout",
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

export const SUGGESTION_ENDPOINTS = {
   SUGGESTIONS: "/suggestion",
} as const

export const PROFORMA_REQUEST_ENDPOINTS = {
   CREATE_REQUEST: "/proforma-request",
   PROFORMA_REQUEST_BY_VENDOR_PROFILE_ID: (vendorProfileId: string) => `/proforma-request/vendor/${vendorProfileId}`,
   PROFORMA_REQUEST_BY_CLIENT_ID: () => `/proforma-request/client`,
} as const

export const PROFORMA_RESPONSE_ENDPOINTS = {
   CREATE_PROFORMA_RESPONSE: "/proforma-response",
   CHECK_RESPONSE_EXISTS: (proformaRequestId: string, profileVendorId: string) => `/proforma-response/exists/${proformaRequestId}/${profileVendorId}`,
   GET_ALL_RESPONSES_BY_REQUESTID: (requestId: string) => `/proforma-response/${requestId}`,
   UPDATE_STATUS_BY_CLIENT: "/proforma-response",
} as const

export const VENDOR_PROFILE_ENDPOINTS = {
   VENDOR_PROFILE_BY_ACCESS_TOKEN: "/vendor-profile/access-token",
   CREATE_VENDOR_PROFILE: "/vendor-profile",
   GET_TALENTS: "/vendor-profile/talents",
   GET_TALENT_BY_ID: (id: string) => `/vendor-profile/talent/${id}`,
} as const

export const CHAT_ENDPOINTS = {
   GET_CHATS_BY_ACCESS_TOKEN: "/chat",
   CREATE_CHAT: "/chat",
} as const

export const CITY_ENDPOINTS = {
   ALL_CITIES: "/city",
} as const
