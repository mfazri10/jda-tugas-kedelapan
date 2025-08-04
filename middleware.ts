import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
  
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return null;
  }

  if (!token && request.nextUrl.pathname.startsWith('/crud')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return null;
}

export const config = {
  matcher: ['/crud/:path*', '/login', '/register']
};
