import { NextResponse } from 'next/server';

// Lead tracking endpoint — previously used an in-memory analytics store.
// Now returns 200 OK silently. Real lead capture happens via /api/contact.
export async function POST() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
