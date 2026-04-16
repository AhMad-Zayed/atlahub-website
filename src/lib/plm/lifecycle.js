import { ProjectLifecycleStatus } from '@prisma/client';

/** Allowed transitions (minimal guard for server-side consistency). */
const ALLOWED = {
  [ProjectLifecycleStatus.DRAFT]: [ProjectLifecycleStatus.SENT, ProjectLifecycleStatus.DRAFT],
  [ProjectLifecycleStatus.SENT]: [
    ProjectLifecycleStatus.SUBMITTED,
    ProjectLifecycleStatus.UNDER_REVIEW,
    ProjectLifecycleStatus.DRAFT,
  ],
  [ProjectLifecycleStatus.SUBMITTED]: [
    ProjectLifecycleStatus.UNDER_REVIEW,
    ProjectLifecycleStatus.NEEDS_REVISION,
    ProjectLifecycleStatus.APPROVED,
  ],
  [ProjectLifecycleStatus.UNDER_REVIEW]: [
    ProjectLifecycleStatus.NEEDS_REVISION,
    ProjectLifecycleStatus.APPROVED,
    ProjectLifecycleStatus.COMPLETED,
  ],
  [ProjectLifecycleStatus.NEEDS_REVISION]: [
    ProjectLifecycleStatus.SUBMITTED,
    ProjectLifecycleStatus.UNDER_REVIEW,
  ],
  [ProjectLifecycleStatus.APPROVED]: [ProjectLifecycleStatus.COMPLETED],
  [ProjectLifecycleStatus.COMPLETED]: [],
};

export function canTransition(from, to) {
  if (from === to) return true;
  const next = ALLOWED[from];
  return Array.isArray(next) && next.includes(to);
}
