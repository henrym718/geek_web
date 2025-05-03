export const authEndpoints = {
   login: "/authenticate/login",
   register: "/authenticate/register",
   currentUser: "/authenticate/me",
   checkEmail: "/authenticate/check-email",
   checkUsername: "/authenticate/check-username",
   logout: "/authenticate/logout",
} as const
