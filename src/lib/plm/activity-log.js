import prisma from '@/lib/prisma';
import { ActivityActorRole } from '@prisma/client';

/**
 * Append-only audit log. Do not expose delete/update APIs.
 */
export async function appendActivityLog({
  projectId,
  actorRole = ActivityActorRole.SYSTEM,
  action,
  metadata = null,
  ipAddress = null,
}) {
  if (!projectId || !action) {
    throw new Error('appendActivityLog: projectId and action are required');
  }

  return prisma.activityLog.create({
    data: {
      projectId: Number(projectId),
      actorRole,
      action: String(action).slice(0, 128),
      metadataJson: metadata && typeof metadata === 'object' ? metadata : undefined,
      ipAddress: ipAddress ? String(ipAddress).slice(0, 45) : undefined,
    },
  });
}

export async function getProjectTimeline(projectId, { take = 200 } = {}) {
  return prisma.activityLog.findMany({
    where: { projectId: Number(projectId) },
    orderBy: { createdAt: 'asc' },
    take,
  });
}
