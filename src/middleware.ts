import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentUser } from "@/services/";
import { routes } from "./guards";
// import { redirect } from "next/dist/server/api-utils";

export async function middleware(request: NextRequest) {
  const token: any = request.cookies.get("auth")?.value;
  const { pathname } = request.nextUrl;

  // Allow access to certain static resources and the Next.js internal paths
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.match(/\.(js|css|png|jpg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  // If the user is not logged in and tries to access any page other than /signin, redirect to /signin
  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token) {
    try {
      const user = await currentUser(token);
      if (user.statusCode !== 200) {
        const response = NextResponse.redirect(new URL("/signin", request.url));
        console.log("1");
        response.cookies.getAll().forEach(i => response.cookies.delete(`${i.name}`));
        return response;
      }

      //ROLLED ACCESS ROUTES
      const userRoles = user.data.data.roles;
      const roles = ["SUPER_ADMIN", "ADMIN", "SUPPORT"];
      const isStaff = roles.some(r => r.includes(userRoles));
      //ROLLED ACCESS ROUTES

      // Match current route with `routes` array
      const matchedRoute = routes.find(route => route.route === pathname);

      if (matchedRoute) {
        const hasAccess = matchedRoute.access.some(role => userRoles.includes(role));
        if (!hasAccess) {
          return NextResponse.redirect(new URL("/403", request.url));
        }
        return NextResponse.next();
      }

      // Redirect signed-in users from /signin to the homepage
      if (pathname === "/signin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      //GUEST USER PROTECT
      if (!isStaff) {
        const response = NextResponse.redirect(new URL("/signin", request.url));
        response.cookies.delete("auth");
        return response;
      }
      //GUEST USER PROTECT

      return NextResponse.next();
    } catch (error) {
      console.log(error);
      const response = NextResponse.redirect(new URL("/signin", request.url));
      response.cookies.delete("auth");
      return response;
    }
  }

  return NextResponse.next();
}

// Matching all paths
export const config = {
  matcher: ["/:path*", "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
