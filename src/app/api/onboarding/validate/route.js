import { NextResponse } from 'next/server';
import { getProjectByToken } from '@/lib/onboarding';

export async function GET(request) {
  const token = request.nextUrl.searchParams.get('token');
  const project = await getProjectByToken(token);

  if (!project) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true });
}
