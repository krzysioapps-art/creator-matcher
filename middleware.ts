import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/@")) {
    const id = pathname.substring(2)

    return NextResponse.rewrite(
      new URL(`/profile/${id}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}