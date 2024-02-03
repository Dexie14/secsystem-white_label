// middleware.js

import { NextResponse } from "next/server";

export default function middleware(req) {
  let loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // if (loggedin && (pathname === "/login" || pathname === "/")) {
  //   return NextResponse.redirect(new URL("/user", req.url));
  // }

  // if (!loggedin && pathname !== "/login" ) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  if (!loggedin && pathname === "/") {
    // If not logged in and trying to access the root ("/"), redirect to "/login"
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!loggedin && pathname === "/user") {
    // If not logged in and trying to access the "/user" page, redirect to "/"
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
