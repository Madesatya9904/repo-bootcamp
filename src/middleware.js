import { NextResponse } from "next/server";

export function middleware(request){
  if(request.nextUrl.pathname.startsWith("/api/")) {
    const respone = NextResponse.next()

    respone.headers.set("Access-Control-Allow-Origin", process.env.MY_DOMAIN || "*");
    respone.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    respone.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if(request.method === "OPTIONS") {
      return new NextResponse(null, { status : 204 })
    }

    return respone
  }

  const currentUser = request.cookies.get("currentUser")?.value;

  if(currentUser){
    return NextResponse.next()
  } else{
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }
}

export const config = {
  matcher: [
    "/",
    "/user",
    "/category/:path*",
    "/product/:path*",
    "/orders/:path*",
    "/api/:path*",
  ]
}