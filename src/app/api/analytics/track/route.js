import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

function sha256Hex(value) {
  // Use JWT_SECRET as salt for GDPR-compliant hashing
  const salt = process.env.JWT_SECRET || 'fallback-salt';
  return crypto.createHash('sha256').update(String(value || '') + salt).digest('hex');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const reqHeaders = await headers();
    const cookieStore = await cookies();
    
    // 1. Session ID Resolution
    let sessionId = cookieStore.get('atla_session_id')?.value || body.sessionId || body.session_id;
    let isNewSession = false;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      isNewSession = true;
    }

    // 2. Parse User Agent
    const rawUa = reqHeaders.get('user-agent') || '';
    const parser = new UAParser(rawUa);
    const result = parser.getResult();
    
    // 3. Extract Headers for IP & Geo
    const country = reqHeaders.get('x-vercel-ip-country') || body.metadata?.country || 'unknown';
    const city = reqHeaders.get('x-vercel-ip-city') || body.metadata?.city || 'unknown';
    const rawIp = reqHeaders.get('x-forwarded-for') || reqHeaders.get('x-real-ip') || '127.0.0.1';
    const ipHash = sha256Hex(rawIp);

    const now = new Date();
    
    // Calculate precise duration if dwell_ms is sent, otherwise default 0
    let incrementalDuration = body.dwell_ms ? Math.round(body.dwell_ms / 1000) : 0;
    if (body.type === 'page_view' && !isNewSession) {
      // Small bump for page navigation
      incrementalDuration = 1;
    }

    // 4. Upsert Session non-blocking
    const session = await prisma.session.upsert({
      where: { id: sessionId },
      update: {
        endTime: now,
        duration: {
          increment: incrementalDuration
        }
      },
      create: {
        id: sessionId,
        startTime: now,
        endTime: now,
        duration: 0,
        ipHash,
        userAgent: rawUa,
        deviceType: result.device.type || 'desktop',
        os: result.os.name || 'unknown',
        browser: result.browser.name || 'unknown',
        country,
        city,
        referrer: reqHeaders.get('referer') || 'direct',
      }
    });

    // 5. Create Event (if it's an actionable event)
    if (body.type && body.type !== 'heartbeat') {
      await prisma.event.create({
        data: {
          sessionId: sessionId,
          type: body.type || 'unknown',
          target: body.target || body.path || body.click_target || null,
          payload: body,
          timestamp: now
        }
      });
    }

    // 6. Return response with cookie if newly minted
    const response = NextResponse.json({ ok: true, sessionId, duration: session.duration }, { status: 201 });
    if (isNewSession) {
      response.cookies.set('atla_session_id', sessionId, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 4 // 4 hour session limit
      });
    }
    
    return response;

  } catch (error) {
    console.error('Failed to track session/analytics event:', error);
    return NextResponse.json({ message: 'Tracking failed', error: String(error) }, { status: 500 });
  }
}
