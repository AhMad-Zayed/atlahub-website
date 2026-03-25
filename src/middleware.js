import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isDashboardRoute = path.startsWith('/admin/dashboard');
  const isLoginRoute = path === '/admin/login';
  
  const session = request.cookies.get('admin_session')?.value;

  if (isDashboardRoute && session !== 'authenticated') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && session === 'authenticated') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};