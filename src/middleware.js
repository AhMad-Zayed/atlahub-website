import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const match = path.match(/^\/(en|ar)\/admin(?:\/(.*))?$/);
  if (!match) {
    return NextResponse.next();
  }

  const [, lang, adminPath = ''] = match;
  const normalizedAdminPath = adminPath.replace(/\/$/, '');
  const isDashboardRoute = normalizedAdminPath === 'dashboard' || normalizedAdminPath.startsWith('dashboard/');
  const isLoginRoute = normalizedAdminPath === 'login';
  
  const session = request.cookies.get('admin_session')?.value;

  if (isDashboardRoute && session !== 'authenticated') {
    return NextResponse.redirect(new URL(`/${lang}/admin/login`, request.url));
  }

  if (isLoginRoute && session === 'authenticated') {
    return NextResponse.redirect(new URL(`/${lang}/admin/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:lang(en|ar)/admin/:path*'],
};
