import { NextResponse } from 'next/server';
import { dispatchLeadEvent } from '@/lib/analytics-store';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await dispatchLeadEvent(body, request.headers);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to dispatch lead event:', error);
    return NextResponse.json({ message: 'Lead dispatch failed' }, { status: 500 });
  }
}
