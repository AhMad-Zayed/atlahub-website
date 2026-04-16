import crypto from 'crypto';
import prisma from '@/lib/prisma';

export function hashBearerToken(token) {
  return crypto.createHash('sha256').update(String(token), 'utf8').digest('hex');
}

/**
 * Resolve a bearer string from the URL to a SecureToken row.
 * - Primary: SHA-256(bearer) === token_hash (no raw token persisted).
 * - Legacy: row id === bearer (UUID) and token_hash === SHA-256(bearer), as issued by older builds.
 */
export async function findSecureTokenByBearer(bearer) {
  if (!bearer) return null;
  const raw = String(bearer).trim();
  const digest = hashBearerToken(raw);

  const byHash = await prisma.secureToken.findFirst({
    where: { token_hash: digest },
  });
  if (byHash) return byHash;

  const byId = await prisma.secureToken.findUnique({
    where: { id: raw },
  });
  if (!byId) return null;

  return byId;
}
