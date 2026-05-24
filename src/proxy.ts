import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') { return NextResponse.next(); }
  const { pathname } = request.nextUrl
  
  // Allow requests to /maintenance to pass through
  if (pathname.startsWith('/maintenance')) {
    return NextResponse.next()
  }

  // Rewrite everything else to the maintenance page
  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - studio (Sanity Studio routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|studio).*)',
  ],
}
