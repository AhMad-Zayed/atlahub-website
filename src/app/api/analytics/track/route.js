import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Save to PostgreSQL via Prisma
    const analyticsEntry = await prisma.analytics.create({
      data: {
        event: body.type || body.event || 'unknown',
        path: body.page_path || body.path || null,
        metadata: body, // store entire payload in metadata
      },
    });

    return NextResponse.json({ ok: true, id: analyticsEntry.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to track analytics event:', error);
    return NextResponse.json({ message: 'Tracking failed', error: String(error) }, { status: 500 });
  }
}
