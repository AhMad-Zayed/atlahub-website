import { ProjectLifecycleStatus } from '@prisma/client';

/** Maps DB enum → legacy dashboard labels (existing UI). */
export function lifecycleStatusToLegacyLabel(status) {
  switch (status) {
    case ProjectLifecycleStatus.DRAFT:
    case ProjectLifecycleStatus.SENT:
      return 'Pipeline';
    case ProjectLifecycleStatus.SUBMITTED:
    case ProjectLifecycleStatus.UNDER_REVIEW:
      return 'Review';
    case ProjectLifecycleStatus.NEEDS_REVISION:
      return 'Needs Revision';
    case ProjectLifecycleStatus.APPROVED:
      return 'Approved';
    case ProjectLifecycleStatus.COMPLETED:
      return 'Completed';
    default:
      return 'Pipeline';
  }
}

const LEGACY_TO_ENUM = {
  Pipeline: ProjectLifecycleStatus.DRAFT,
  Review: ProjectLifecycleStatus.UNDER_REVIEW,
  'Needs Revision': ProjectLifecycleStatus.NEEDS_REVISION,
  Approved: ProjectLifecycleStatus.APPROVED,
  Completed: ProjectLifecycleStatus.COMPLETED,
};

/** Parses admin form / API strings into Prisma enum (defaults to UNDER_REVIEW). */
export function parseLifecycleStatusFromLegacyString(value) {
  const key = String(value || '').trim();
  return LEGACY_TO_ENUM[key] ?? ProjectLifecycleStatus.UNDER_REVIEW;
}

export function parseLifecycleStatusStrict(value) {
  const v = String(value || '').trim();
  if (Object.values(ProjectLifecycleStatus).includes(v)) {
    return v;
  }
  return parseLifecycleStatusFromLegacyString(v);
}
