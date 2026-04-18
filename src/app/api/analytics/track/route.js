import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Lightweight session tracking — session cookie only, no DB writes.
// The Session/Event models have been removed from the schema.
export async function POST(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    let sessionId = cookieStore.get('atla_session_id')?.value;
    const isNewSession = !sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    const response = NextResponse.json({ ok: true, sessionId }, { status: 200 });

    if (isNewSession) {
      response.cookies.set('atla_session_id', sessionId, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 4,
      });
    }

    return response;
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
