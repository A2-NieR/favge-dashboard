import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async function middleware(req) {
  const session = await auth();
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !session) {
    // redirect to the homepage if trying to access dashboard without session
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  // run middleware on dashboard route
  matcher: ["/dashboard/:path*"],
};
