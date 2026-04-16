import crypto from 'crypto';
import { NextResponse } from 'next/server';



function applyIdentityCookie(response, atlaUid) {
  if (!atlaUid) {
    return response;
  }

  response.cookies.set('atla_uid', atlaUid, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const langMatch = path.match(/^\/(en|ar)(?:\/|$)/);
  const currentLang = langMatch?.[1] || 'en';
  const existingUid = request.cookies.get('atla_uid')?.value;
  const atlaUid = existingUid || crypto.randomUUID();
  const fingerprintCookie = request.cookies.get('atla_fp')?.value || '';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-lang', currentLang);
  requestHeaders.set('x-atla-uid', atlaUid);
  if (fingerprintCookie) {
    requestHeaders.set('x-atla-fingerprint', fingerprintCookie);
  }

  const nextResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });



  const match = path.match(/^\/(en|ar)\/admin(?:\/(.*))?$/);
  if (!match) {
    return applyIdentityCookie(nextResponse, atlaUid);
  }

  const [, lang, adminPath = ''] = match;
  const normalizedAdminPath = adminPath.replace(/\/$/, '');
  const isDashboardRoute = normalizedAdminPath === 'dashboard' || normalizedAdminPath.startsWith('dashboard/');
  const isLoginRoute = normalizedAdminPath === 'login';

  const session = request.cookies.get('admin_session')?.value;

  if (isDashboardRoute && session !== 'authenticated') {
    return applyIdentityCookie(NextResponse.redirect(new URL(`/${lang}/admin/login`, request.url)), atlaUid);
  }

  if (isLoginRoute && session === 'authenticated') {
    return applyIdentityCookie(NextResponse.redirect(new URL(`/${lang}/admin/dashboard`, request.url)), atlaUid);
  }

  return applyIdentityCookie(nextResponse, atlaUid);
}

export const config = {
  matcher: ['/', '/:lang(en|ar)', '/:lang(en|ar)/:path*', '/onboarding/:path*'],
};
