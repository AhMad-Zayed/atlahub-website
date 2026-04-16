import crypto from 'crypto';
import { ProjectLifecycleStatus } from '@prisma/client';
import prisma from '../src/lib/prisma.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function patchStep(token, payload) {
  const response = await fetch(`${BASE_URL}/api/onboarding/${token}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json?.error || `PATCH failed (${response.status})`);
  }
  return json;
}

async function main() {
  console.log('Smoke test starting…');
  console.log(`Base URL: ${BASE_URL}`);

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const title = `Smoke Test Project ${stamp}`;
  const clientName = `Smoke Client ${stamp}`;

  console.log('Creating project + secure token…');
  const project = await prisma.project.create({
    data: {
      title,
      client_name: clientName,
      lifecycleStatus: ProjectLifecycleStatus.SENT,
      submission: {
        create: {
          step1_soul: '',
          step2_market: '',
          step3_visual: '',
          step4_media: [],
          step5_summary: '',
        },
      },
    },
  });

  const token = crypto.randomUUID();
  const tokenHash = crypto.createHash('sha256').update(String(token)).digest('hex');
  await prisma.secureToken.create({
    data: {
      id: token,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      project_id: project.id,
      is_active: true,
      is_used: false,
    },
  });
  assert(token, 'Expected onboarding token');

  console.log('Localized links:');
  console.log(`- EN: ${BASE_URL}/en/onboarding/${token}`);
  console.log(`- AR: ${BASE_URL}/ar/onboarding/${token}`);

  console.log('Simulating 5-step onboarding (PATCH)…');
  await patchStep(token, { step1_soul: 'We value clarity, trust, and premium craft.' });
  await patchStep(token, { step2_market: 'Target: premium clients. Position: elite delivery with measurable outcomes.' });
  await patchStep(token, { step3_visual: 'Cyan + slate, bold typography, modern glass surfaces.' });
  await patchStep(token, { step4_media: ['ref-1.png', 'ref-2.jpg'] });
  await patchStep(token, { step5_summary: 'Approved. Ready for review and production.' });

  console.log('Verifying DB state…');
  const stored = await prisma.project.findUnique({
    where: { id: project.id },
    include: { submission: true, tokens: true },
  });

  assert(stored, 'Expected project to exist');
  assert(stored.submission, 'Expected onboarding submission to exist');
  assert(String(stored.submission.step1_soul || '').includes('clarity'), 'Step 1 was not saved');
  assert(String(stored.submission.step5_summary || '').includes('Ready for review'), 'Step 5 was not saved');

  console.log('Verifying admin dashboard source (getPipelineProjects equivalent)…');
  const latest = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 10,
    include: { submission: true, tokens: true },
  });
  assert(latest.some((p) => p.id === project.id), 'Project not found in latest pipeline projects');

  console.log('Smoke test passed.');
  console.log(`Project ID: ${project.id}`);
  console.log(`Token: ${token}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error('Smoke test failed:', error?.stack || error?.message || error);
    await prisma.$disconnect();
    process.exit(1);
  });

