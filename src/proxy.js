import { NextResponse } from "next/server";

export const proxy = (request) => {
  const token = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith("/game")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/game", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/game/:path*"],
};
