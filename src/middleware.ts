import { NextResponse, NextRequest } from "next/server"
import { verifyToken } from "./lib/utils/verifyToken"
import { RouteType } from "./config/constants"

function getRouteType(path: string): RouteType {
   if (path.startsWith("/talent")) return RouteType.TALENT
   if (path.startsWith("/client")) return RouteType.CLIENT
   if (path.startsWith("/auth")) return RouteType.NO_AUTH_ONLY
   return RouteType.PUBLIC
}

async function getUserRole(request: NextRequest) {
   const accessToken = request.cookies.get("accessToken")?.value
   if (!accessToken) return null
   try {
      const tokenPayload = await verifyToken(accessToken)
      return tokenPayload.role
   } catch (err) {
      // Eliminado console.error
      return null
   }
}

export async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname

   const routeType = getRouteType(pathname)

   const userRole = await getUserRole(request)

   /**
   // Redirigir usuarios autenticados que intentan acceder a rutas de auth
   if (routeType === RouteType.NO_AUTH_ONLY && userRole) {
      const redirectUrl = new URL(`/${userRole.toLowerCase()}/dashboard`, request.url)
      return NextResponse.redirect(redirectUrl)
   }

   // Proteger rutas de vendor
   if (routeType === RouteType.TALENT && userRole !== "VENDOR") {
      return NextResponse.redirect(new URL("/", request.url))
   }

   // Proteger rutas de client
   if (routeType === RouteType.CLIENT && userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/", request.url))
   }

    */
   return NextResponse.next()
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
