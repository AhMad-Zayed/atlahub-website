import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

function sha256Hex(value) {
  const salt = process.env.JWT_SECRET || 'fallback-salt';
  return crypto.createHash('sha256').update(String(value || '') + salt).digest('hex');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const reqHeaders = await headers();
    
    // Parse User Agent
    const rawUa = reqHeaders.get('user-agent') || '';
    const parser = new UAParser(rawUa);
    const result = parser.getResult();
    
    // Extract Headers for IP & Geo (Vercel specific)
    const country = reqHeaders.get('x-vercel-ip-country') || body.metadata?.country || 'unknown';
    const city = reqHeaders.get('x-vercel-ip-city') || body.metadata?.city || 'unknown';
    const rawIp = reqHeaders.get('x-forwarded-for') || reqHeaders.get('x-real-ip') || '127.0.0.1';
    
    // Hash IP for GDPR compliance
    const ipHash = sha256Hex(rawIp);

    // Save Directly to `Analytics` table
    const analyticsEntry = await prisma.analytics.create({
      data: {
        ipHash,
        country,
        city,
        device: result.device.type || 'desktop',
        os: result.os.name || 'unknown',
        browser: result.browser.name || 'unknown',
        metadata: body
      }
    });

    return NextResponse.json({ ok: true, id: analyticsEntry.id }, { status: 201 });

  } catch (error) {
    console.error('Failed to track analytics event:', error);
    return NextResponse.json({ message: 'Tracking failed', error: String(error) }, { status: 500 });
  }
}
