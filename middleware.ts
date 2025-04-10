import { NextResponse, NextRequest } from "next/server"
import { verifyToken } from "./src/lib/utils/verifyToken"

const RouteType = {
   VENDOR: "VENDOR",
   CLIENT: "CLIENT",
   PUBLIC: "PUBLIC",
   CLIENT_AND_PUBLIC: "CLIENT_AND_PUBLIC",
   NO_AUTH_ONLY: "NO_AUTH_ONLY",
} as const

type RouteType = (typeof RouteType)[keyof typeof RouteType]

function getRouteType(path: string): RouteType {
   if (path.startsWith("/vendor")) return RouteType.VENDOR
   if (path.startsWith("/client")) return RouteType.CLIENT
   if (path.startsWith("/auth")) return RouteType.NO_AUTH_ONLY
   if (["/products", "/catalog"].includes(path)) return RouteType.CLIENT_AND_PUBLIC
   return RouteType.PUBLIC
}

async function getUserRole(request: NextRequest) {
   const accessToken = request.cookies.get("accessToken")?.value
   if (!accessToken) return null
   const tokenPayload = await verifyToken(accessToken)
   return tokenPayload.role
}

export async function middleware(request: NextRequest) {
   const routeType = getRouteType(request.nextUrl.pathname)
   const userRole = await getUserRole(request)

   if (routeType === RouteType.VENDOR && userRole !== "VENDOR") {
      return NextResponse.redirect(new URL("/", request.url))
   }

   if (routeType === RouteType.CLIENT && userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/", request.url))
   }

   if (routeType === RouteType.NO_AUTH_ONLY && userRole) {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: "/((?!_next/static).*)",
}
