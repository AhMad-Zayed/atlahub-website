import crypto from 'crypto';
import { z } from 'zod';
import { ActivityActorRole, DeliverableStatus, PortfolioBridgeStatus, ProjectLifecycleStatus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { buildPortfolioPayload, createPortfolioItem } from './portfolio-admin';
import { appendActivityLog } from '@/lib/plm/activity-log';
import { hashBearerToken, findSecureTokenByBearer } from '@/lib/plm/tokens';
import { defaultLegacyWizardSchemaJson, createProjectSnapshotFromTemplate, visualIdentitySchema, workshopProposalSchema } from '@/lib/plm/snapshot';
import { lifecycleStatusToLegacyLabel } from '@/lib/plm/status';

const onboardingPayloadSchema = z.object({
  step1_soul: z.string().max(5000).optional(),
  step2_market: z.string().max(5000).optional(),
  step3_visual: z.string().max(5000).optional(),
  step4_media: z.array(z.string().max(1000)).optional(),
  step5_summary: z.string().max(5000).optional(),
});

function projectInclude() {
  return {
    submission: true,
    snapshot: true,
    service: true,
    deliverables: { include: { comments: true }, orderBy: { version: 'desc' }, take: 50 },
    activityLogs: { orderBy: { createdAt: 'asc' } },
    collaboratorNotes: { orderBy: { createdAt: 'asc' } },
  };
}

async function loadSecureTokenRowWithProject(bearer) {
  if (!bearer) return null;
  const digest = hashBearerToken(String(bearer).trim());

  const byHash = await prisma.secureToken.findFirst({
    where: { token_hash: digest },
    include: { project: { include: projectInclude() } },
  });
  if (byHash) return byHash;

  const raw = String(bearer).trim();
  const byId = await prisma.secureToken.findUnique({
    where: { id: raw },
    include: { project: { include: projectInclude() } },
  });
  if (!byId) return null;
  return byId;
}

/** @deprecated Use hashBearerToken from plm/tokens */
export function hashToken(token) {
  return hashBearerToken(token);
}

/**
 * Creates project + secure bearer (only SHA-256 digest persisted).
 * Returns raw bearer string for the onboarding URL (never store this server-side again).
 */
export async function createProjectWithSecureToken({ title, clientName, projectType = 'CLIENT_SERVICES', expiresInDays = 30, serviceId = null }) {
  const bearer = crypto.randomBytes(32).toString('hex');
  const tokenId = crypto.randomUUID();
  const digest = hashBearerToken(bearer);

  const project = await prisma.project.create({
    data: {
      title: String(title || 'New Client Project').trim(),
      client_name: String(clientName || 'Unknown Client').trim(),
      type: projectType,
      lifecycleStatus: ProjectLifecycleStatus.SENT,
      serviceId: serviceId ? Number(serviceId) : null,
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

  await prisma.secureToken.create({
    data: {
      id: tokenId,
      token_hash: digest,
      expires_at: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      project_id: project.id,
      is_active: true,
      is_used: false,
    },
  });

  await appendActivityLog({
    projectId: project.id,
    actorRole: ActivityActorRole.SYSTEM,
    action: 'project.created',
    metadata: { title: project.title, lifecycleStatus: ProjectLifecycleStatus.SENT },
  });

  if (serviceId) {
    const tpl = await prisma.formTemplate.findFirst({
      where: { serviceId: Number(serviceId) },
      orderBy: { version: 'desc' },
    });
    if (tpl) {
      await createProjectSnapshotFromTemplate({ projectId: project.id, formTemplateId: tpl.id });
    } else {
      await prisma.projectSnapshot.upsert({
        where: { projectId: project.id },
        create: {
          projectId: project.id,
          schemaSnapshotJson: defaultLegacyWizardSchemaJson(),
          templateVersion: 1,
        },
        update: {
          schemaSnapshotJson: defaultLegacyWizardSchemaJson(),
          templateVersion: 1,
        },
      });
    }
  } else {
    // Dynamic Schema injection based on new project types
    let schemaToUse;
    switch (projectType) {
      case 'VISUAL_ID':
        schemaToUse = visualIdentitySchema();
        break;
      case 'PROPOSAL':
        schemaToUse = workshopProposalSchema();
        break;
      case 'CLIENT_SERVICES':
      default:
        schemaToUse = defaultLegacyWizardSchemaJson();
        break;
    }

    await prisma.projectSnapshot.create({
      data: {
        projectId: project.id,
        schemaSnapshotJson: schemaToUse,
        templateVersion: 1,
      },
    });
  }

  return {
    project,
    token: bearer,
  };
}

export async function getProjectByToken(bearer) {
  const secureToken = await loadSecureTokenRowWithProject(bearer);

  if (!secureToken || !secureToken.is_active || secureToken.is_used) {
    return null;
  }

  if (secureToken.expires_at <= new Date()) {
    return null;
  }

  return {
    token: bearer,
    expiresAt: secureToken.expires_at.toISOString(),
    project: secureToken.project,
  };
}

function enrichProjectForLegacyUi(project) {
  if (!project) return project;
  return {
    ...project,
    status: lifecycleStatusToLegacyLabel(project.lifecycleStatus),
  };
}

export async function getPipelineProjects() {
  const rows = await prisma.project.findMany({
    where: {},
    orderBy: { updatedAt: 'desc' },
    include: {
      submission: true,
      tokens: {
        orderBy: { expires_at: 'desc' },
      },
      snapshot: true,
      service: true,
      activityLogs: { orderBy: { createdAt: 'asc' } },
      deliverables: { include: { comments: true } },
      collaboratorNotes: { orderBy: { createdAt: 'asc' } }
    },
  });
  return rows.map(enrichProjectForLegacyUi);
}

export async function saveOnboardingSubmission(token, payload, meta = {}) {
  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken || !secureToken.is_active || secureToken.is_used || secureToken.expires_at <= new Date()) {
    throw new Error('Invalid onboarding token');
  }

  const project = await prisma.project.findUnique({
    where: { id: secureToken.project_id },
  });
  if (!project) throw new Error('Project not found');

  if (
    project.lifecycleStatus === ProjectLifecycleStatus.SUBMITTED ||
    project.lifecycleStatus === ProjectLifecycleStatus.APPROVED ||
    project.lifecycleStatus === ProjectLifecycleStatus.COMPLETED
  ) {
    throw new Error('This onboarding is locked (read-only).');
  }

  const validated = onboardingPayloadSchema.parse(payload);
  const projectId = secureToken.project_id;
  const normalizedPayload = {};

  if (validated.step1_soul !== undefined) normalizedPayload.step1_soul = validated.step1_soul;
  if (validated.step2_market !== undefined) normalizedPayload.step2_market = validated.step2_market;
  if (validated.step3_visual !== undefined) normalizedPayload.step3_visual = validated.step3_visual;
  if (validated.step4_media !== undefined) normalizedPayload.step4_media = validated.step4_media;
  if (validated.step5_summary !== undefined) normalizedPayload.step5_summary = validated.step5_summary;

  if (Object.keys(normalizedPayload).length === 0) {
    throw new Error('Nothing to save');
  }

  await prisma.onboardingSubmission.upsert({
    where: { projectId },
    create: {
      projectId,
      step1_soul: normalizedPayload.step1_soul || '',
      step2_market: normalizedPayload.step2_market || '',
      step3_visual: normalizedPayload.step3_visual || '',
      step4_media: normalizedPayload.step4_media || [],
      step5_summary: normalizedPayload.step5_summary || '',
    },
    update: {
      ...normalizedPayload,
    },
  });

  const filled = await prisma.onboardingSubmission.findUnique({ where: { projectId } });
  const progressCount = [
    filled?.step1_soul,
    filled?.step2_market,
    filled?.step3_visual,
    (filled?.step4_media || []).length ? 'x' : '',
    filled?.step5_summary,
  ].filter(Boolean).length;

  const nextStatus =
    progressCount >= 5 ? ProjectLifecycleStatus.SUBMITTED : ProjectLifecycleStatus.UNDER_REVIEW;

  await prisma.project.update({
    where: { id: projectId },
    data: { lifecycleStatus: nextStatus },
  });

  await appendActivityLog({
    projectId,
    actorRole: ActivityActorRole.CLIENT,
    action: 'onboarding.autosave',
    metadata: {
      keys: Object.keys(normalizedPayload),
      lifecycleStatus: nextStatus,
    },
    ipAddress: meta.ipAddress || null,
  });

  return await getProjectByToken(token);
}

export async function revokeOnboardingToken(token) {
  if (!token) {
    throw new Error('Token is required');
  }

  const row = await findSecureTokenByBearer(token);
  if (!row) {
    throw new Error('Token not found');
  }

  await prisma.secureToken.updateMany({
    where: { id: row.id },
    data: { is_active: false },
  });

  await appendActivityLog({
    projectId: row.project_id,
    actorRole: ActivityActorRole.ADMIN,
    action: 'token.revoked',
    metadata: { tokenId: row.id },
  });
}

export async function extendOnboardingToken(token, additionalDays = 30) {
  if (!token) {
    throw new Error('Token is required');
  }

  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken) {
    throw new Error('Token not found');
  }

  const updated = await prisma.secureToken.update({
    where: { id: secureToken.id },
    data: {
      expires_at: new Date(secureToken.expires_at.getTime() + additionalDays * 24 * 60 * 60 * 1000),
      is_active: true,
    },
  });

  await appendActivityLog({
    projectId: secureToken.project_id,
    actorRole: ActivityActorRole.ADMIN,
    action: 'token.extended',
    metadata: { days: additionalDays },
  });

  return updated;
}

export async function regenerateOnboardingToken(token, expiresInDays = 30) {
  if (!token) {
    throw new Error('Token is required');
  }

  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken) {
    throw new Error('Token not found');
  }

  await prisma.secureToken.update({
    where: { id: secureToken.id },
    data: { is_active: false },
  });

  const bearer = crypto.randomBytes(32).toString('hex');
  const tokenId = crypto.randomUUID();
  const digest = hashBearerToken(bearer);

  await prisma.secureToken.create({
    data: {
      id: tokenId,
      token_hash: digest,
      expires_at: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      project_id: secureToken.project_id,
      is_active: true,
      is_used: false,
    },
  });

  await appendActivityLog({
    projectId: secureToken.project_id,
    actorRole: ActivityActorRole.ADMIN,
    action: 'token.regenerated',
    metadata: { previousTokenId: secureToken.id },
  });

  return bearer;
}

export async function markProjectNeedsRevision(projectId) {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const updated = await prisma.project.update({
    where: { id: Number(projectId) },
    data: { lifecycleStatus: ProjectLifecycleStatus.NEEDS_REVISION },
  });

  await appendActivityLog({
    projectId: Number(projectId),
    actorRole: ActivityActorRole.ADMIN,
    action: 'lifecycle.needs_revision',
  });

  return updated;
}

export async function promoteProjectToPortfolio(projectId) {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
    include: {
      submission: true,
      deliverables: { where: { status: 'APPROVED' }, orderBy: { version: 'desc' } },
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  const submission = project.submission;
  if (!submission) {
    throw new Error('Onboarding submission is incomplete');
  }

  const fromDeliverables = (project.deliverables || []).map((d) => d.fileUrl).filter(Boolean);
  const finalAssets =
    fromDeliverables.length > 0
      ? fromDeliverables
      : Array.isArray(submission.step4_media)
        ? submission.step4_media
        : [];

  const payload = buildPortfolioPayload({
    category: 'training',
    titleEn: project.title,
    titleAr: project.title,
    descriptionEn: submission.step2_market,
    descriptionAr: submission.step2_market,
    roleSummaryEn: submission.step1_soul,
    roleSummaryAr: submission.step1_soul,
    actionSummaryEn: submission.step3_visual,
    actionSummaryAr: submission.step3_visual,
    resultEn: submission.step5_summary,
    resultAr: submission.step5_summary,
    techFocusEn: Array.isArray(finalAssets) ? 'Visual Identity, Design System' : '',
    techFocusAr: Array.isArray(finalAssets) ? 'الهوية البصرية، نظام التصميم' : '',
    coverImageUrl: Array.isArray(finalAssets) && finalAssets.length > 0 ? finalAssets[0] : '',
    galleryInput: Array.isArray(finalAssets) ? finalAssets.join(', ') : '',
    videoUrls: '',
  });

  const portfolioItem = await createPortfolioItem(payload);

  await prisma.portfolioProject.upsert({
    where: { projectId: project.id },
    create: {
      projectId: project.id,
      summary: `Client: ${project.client_name}. Soul: ${(submission.step1_soul || '').slice(0, 120)}`,
      bridgeStatus: PortfolioBridgeStatus.DRAFT,
    },
    update: {
      bridgeStatus: PortfolioBridgeStatus.DRAFT,
      summary: `Client: ${project.client_name}. Soul: ${(submission.step1_soul || '').slice(0, 120)}`,
    },
  });

  await prisma.project.update({
    where: { id: project.id },
    data: {
      lifecycleStatus: ProjectLifecycleStatus.APPROVED,
    },
  });

  await appendActivityLog({
    projectId: project.id,
    actorRole: ActivityActorRole.SYSTEM,
    action: 'portfolio.promoted',
    metadata: {
      client_name: project.client_name,
      portfolioItemId: portfolioItem?.id,
      final_assets: finalAssets,
    },
  });

  return portfolioItem;
}

/** Explicit bridge alias for PLM docs / server actions. */
export async function promoteToPortfolioAction(projectId) {
  return promoteProjectToPortfolio(projectId);
}
