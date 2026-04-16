import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getProjectByToken, saveOnboardingSubmission } from '@/lib/onboarding';

function extractBearer(req) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.split(' ')[1].trim();
}

export async function GET(request) {
  const token = extractBearer(request);
  if (!token) {
    return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
  }

  const project = await getProjectByToken(token);

  if (!project) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PATCH(request) {
  const token = extractBearer(request);
  if (!token) {
    return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
  }
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const headerStore = await headers();
    const forwarded = headerStore.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0]?.trim() : headerStore.get('x-real-ip');

    const result = await saveOnboardingSubmission(token, body, { ipAddress });
    return NextResponse.json({
      success: true,
      submission: result?.project?.submission,
      project: result?.project,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to save onboarding data' }, { status: 400 });
  }
}
