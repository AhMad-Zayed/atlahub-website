'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { findSecureTokenByBearer } from '@/lib/plm/tokens';
import { appendActivityLog } from '@/lib/plm/activity-log';
import { ActivityActorRole, ProjectLifecycleStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const pinCommentSchema = z.object({
  deliverableId: z.number().int().positive(),
  comment: z.string().min(1).max(500),
  pinX: z.number().min(0).max(100).optional().nullable(),
  pinY: z.number().min(0).max(100).optional().nullable(),
});

export async function addPinCommentAction(token, payload) {
  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken || !secureToken.is_active || secureToken.is_used || secureToken.expires_at <= new Date()) {
    throw new Error('Invalid onboarding token');
  }

  const { deliverableId, comment, pinX, pinY } = pinCommentSchema.parse(payload);

  const deliverable = await prisma.deliverable.findUnique({ where: { id: deliverableId } });
  if (!deliverable || deliverable.projectId !== secureToken.project_id) {
    throw new Error('Deliverable not found or unauthorized');
  }

  await prisma.deliverableComment.create({
    data: {
      deliverableId,
      comment,
      pinX,
      pinY,
      author: 'Client',
    },
  });

  await prisma.project.update({
    where: { id: secureToken.project_id },
    data: { lifecycleStatus: ProjectLifecycleStatus.UNDER_REVIEW },
  });

  await appendActivityLog({
    projectId: secureToken.project_id,
    actorRole: ActivityActorRole.CLIENT,
    action: 'client.comment_added',
    metadata: { deliverableId, message: 'Client dropped a comment on deliverable.' },
  });

  revalidatePath('/[lang]/onboarding/portal', 'page');
  return { success: true };
}

const collaboratorNoteSchema = z.object({
  content: z.string().min(1).max(2000),
});

export async function addCollaboratorNoteAction(token, payload) {
  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken || !secureToken.is_active || secureToken.is_used || secureToken.expires_at <= new Date()) {
    throw new Error('Invalid onboarding token');
  }

  const { content } = collaboratorNoteSchema.parse(payload);

  await prisma.collaboratorNote.create({
    data: {
      projectId: secureToken.project_id,
      content,
      author: 'Provider', 
    },
  });

  await prisma.project.update({
    where: { id: secureToken.project_id },
    data: { lifecycleStatus: ProjectLifecycleStatus.UNDER_REVIEW },
  });

  await appendActivityLog({
    projectId: secureToken.project_id,
    actorRole: ActivityActorRole.CLIENT,
    action: 'client.collaborator_note_added',
    metadata: { message: 'Collaborator added a note to the proposal.' },
  });

  revalidatePath('/[lang]/onboarding/portal', 'page');
  return { success: true };
}

export async function approveDeliverableAction(token, deliverableId) {
  const secureToken = await findSecureTokenByBearer(token);
  if (!secureToken || !secureToken.is_active || secureToken.is_used || secureToken.expires_at <= new Date()) {
    throw new Error('Invalid onboarding token');
  }

  const deliverable = await prisma.deliverable.findUnique({ where: { id: Number(deliverableId) } });
  if (!deliverable || deliverable.projectId !== secureToken.project_id) {
    throw new Error('Deliverable not found or unauthorized');
  }

  await prisma.deliverable.update({
    where: { id: deliverable.id },
    data: { status: 'APPROVED' },
  });

  await appendActivityLog({
    projectId: secureToken.project_id,
    actorRole: ActivityActorRole.CLIENT,
    action: 'client.deliverable_approved',
    metadata: { deliverableId: deliverable.id, type: deliverable.type, version: deliverable.version },
  });

  revalidatePath('/[lang]/onboarding/portal', 'page');
  return { success: true };
}
