import { NextResponse } from 'next/server';
import { trackBehaviorEvent } from '@/lib/analytics-store';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await trackBehaviorEvent(body, request.headers);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to track behavior event:', error);
    return NextResponse.json({ message: 'Tracking failed' }, { status: 500 });
  }
}
