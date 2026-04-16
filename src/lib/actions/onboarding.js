'use server';

import crypto from 'crypto';
import { z } from 'zod';
import { ProjectLifecycleStatus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { hashBearerToken, findSecureTokenByBearer } from '@/lib/plm/tokens';

const createProjectSchema = z.object({
  clientName: z.string().min(1).max(255),
  projectTitle: z.string().min(1).max(255),
});

const tokenValidationSchema = z.union([
  z.string().uuid(),
  z.string().regex(/^[a-fA-F0-9]{64}$/),
]);

const onboardingStepSchema = z.object({
  step1_soul: z.string().max(5000).optional(),
  step2_market: z.string().max(5000).optional(),
  step3_visual: z.string().max(5000).optional(),
  step4_media: z.union([
    z.array(z.string().max(1000)),
    z.string().max(10000),
  ]).optional(),
  step5_summary: z.string().max(5000).optional(),
});

function normalizeMediaPayload(rawMedia) {
  if (Array.isArray(rawMedia)) {
    return rawMedia.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof rawMedia === 'string') {
    try {
      const parsed = JSON.parse(rawMedia);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return rawMedia
        .split(/\r?\n/)
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
  }

  return [];
}

export async function createProjectAction(clientName, projectTitle) {
  try {
    const valid = createProjectSchema.parse({ clientName, projectTitle });
    const project = await prisma.project.create({
      data: {
        title: valid.projectTitle,
        client_name: valid.clientName,
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

    const bearer = crypto.randomBytes(32).toString('hex');
    const tokenId = crypto.randomUUID();
    await prisma.secureToken.create({
      data: {
        id: tokenId,
        token_hash: hashBearerToken(bearer),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        project_id: project.id,
        is_active: true,
        is_used: false,
      },
    });

    return {
      success: true,
      tokenId: bearer,
      project,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to generate onboarding token.',
    };
  }
}

export async function validateToken(tokenId) {
  try {
    const token = tokenValidationSchema.parse(tokenId);
    const secureToken = await findSecureTokenByBearer(token);
    if (!secureToken) {
      return { success: false, error: 'Token is invalid or inactive.' };
    }

    if (!secureToken.is_active) {
      return { success: false, error: 'Token is invalid or inactive.' };
    }

    if (secureToken.is_used) {
      return { success: false, error: 'Token has already been used.' };
    }

    if (secureToken.expires_at <= new Date()) {
      return { success: false, error: 'Token has expired.' };
    }

    if (secureToken.token_hash !== hashBearerToken(token)) {
      return { success: false, error: 'Token validation failed.' };
    }

    const project = await prisma.project.findUnique({
      where: { id: secureToken.project_id },
      include: { submission: true },
    });

    return {
      success: true,
      project,
      expiresAt: secureToken.expires_at.toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Token validation failed.',
    };
  }
}
export const validateTokenAction = validateToken;

export async function saveOnboardingStepAction(projectId, stepData) {
  try {
    const normalizedProjectId = Number(projectId);
    if (!normalizedProjectId || Number.isNaN(normalizedProjectId)) {
      throw new Error('Invalid project identifier.');
    }

    const parsedStepData = onboardingStepSchema.parse(stepData);
    const payload = {};

    if (parsedStepData.step1_soul !== undefined) payload.step1_soul = parsedStepData.step1_soul;
    if (parsedStepData.step2_market !== undefined) payload.step2_market = parsedStepData.step2_market;
    if (parsedStepData.step3_visual !== undefined) payload.step3_visual = parsedStepData.step3_visual;
    if (parsedStepData.step4_media !== undefined) {
      payload.step4_media = normalizeMediaPayload(parsedStepData.step4_media);
    }
    if (parsedStepData.step5_summary !== undefined) payload.step5_summary = parsedStepData.step5_summary;

    if (Object.keys(payload).length === 0) {
      throw new Error('No valid onboarding step data provided.');
    }

    const submission = await prisma.onboardingSubmission.upsert({
      where: { projectId: normalizedProjectId },
      create: {
        projectId: normalizedProjectId,
        step1_soul: payload.step1_soul ?? '',
        step2_market: payload.step2_market ?? '',
        step3_visual: payload.step3_visual ?? '',
        step4_media: payload.step4_media ?? [],
        step5_summary: payload.step5_summary ?? '',
      },
      update: {
        ...payload,
      },
    });

    return {
      success: true,
      submission,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to save onboarding step data.',
    };
  }
}

function normalizeStepPayload(value) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function validateStepNumber(stepNumber) {
  const index = Number(stepNumber);
  if (!Number.isInteger(index) || index < 1 || index > 5) {
    throw new Error('Step number must be an integer between 1 and 5.');
  }
  return `step${index}`;
}

export async function saveStepAction(projectId, stepNumber, data) {
  try {
    const normalizedProjectId = Number(projectId);
    if (!normalizedProjectId || Number.isNaN(normalizedProjectId)) {
      throw new Error('Invalid project identifier.');
    }

    const stepKey = validateStepNumber(stepNumber);
    const normalizedData = normalizeStepPayload(data);
    const existingSubmission = await prisma.onboardingSubmission.findUnique({
      where: { projectId: normalizedProjectId },
    });

    const existingData = existingSubmission?.data ?? {};
    const mergedData = {
      ...existingData,
      [stepKey]: normalizedData,
    };

    const submission = await prisma.onboardingSubmission.upsert({
      where: { projectId: normalizedProjectId },
      create: {
        projectId: normalizedProjectId,
        step1_soul: existingSubmission?.step1_soul ?? '',
        step2_market: existingSubmission?.step2_market ?? '',
        step3_visual: existingSubmission?.step3_visual ?? '',
        step4_media: existingSubmission?.step4_media ?? [],
        step5_summary: existingSubmission?.step5_summary ?? '',
        data: mergedData,
      },
      update: {
        data: {
          set: mergedData,
        },
      },
    });

    return {
      success: true,
      submission,
      data: mergedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to save onboarding step data.',
    };
  }
}
