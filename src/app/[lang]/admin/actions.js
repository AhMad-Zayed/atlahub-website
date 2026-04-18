'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  buildPortfolioPayload,
  createPortfolioItem,
  createPortfolioPreset,
  deletePortfolioItemById,
  updatePortfolioItemById,
} from '@/lib/portfolio-admin';
import {
  createProjectWithSecureToken,
  promoteProjectToPortfolio,
  markProjectNeedsRevision,
  revokeOnboardingToken,
  extendOnboardingToken,
  regenerateOnboardingToken,
  promoteToPortfolioAction as promoteToPortfolioActionOriginal,
} from '@/lib/onboarding';
import prisma from '@/lib/prisma';
import { hashPassword, verifyUserCredentials } from '@/lib/auth';
import { appendActivityLog } from '@/lib/plm/activity-log';
import { parseLifecycleStatusStrict } from '@/lib/plm/status';
import { ActivityActorRole } from '@prisma/client';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src/data/content.json');
const BACKUP_DIR_PATH = path.join(process.cwd(), 'src/data/backups');

function deepMerge(target, source) {
  if (Array.isArray(source)) {
    return source;
  }

  if (!source || typeof source !== 'object') {
    return source;
  }

  const base = target && typeof target === 'object' && !Array.isArray(target) ? { ...target } : {};

  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      base[key] = deepMerge(base[key], value);
    } else {
      base[key] = value;
    }
  }

  return base;
}

function validateContentShape(content) {
  const languages = ['en', 'ar'];

  for (const lang of languages) {
    const section = content?.[lang];
    if (!section || typeof section !== 'object') return false;
    if (!section.hero || !Array.isArray(section.hero.slides)) return false;
    if (!section.services || !Array.isArray(section.services.list)) return false;
    if (!section.founder || typeof section.founder.story !== 'string') return false;
    if (!section.portfolio || !Array.isArray(section.portfolio.list) || !section.portfolio.details) return false;
  }

  return true;
}

async function assertValidContentFile() {
  const raw = await fs.readFile(CONTENT_FILE_PATH, 'utf8');
  const content = JSON.parse(raw);
  if (!validateContentShape(content)) {
    throw new Error('Invalid content.json structure');
  }
  return content;
}

async function backupContentFile() {
  await fs.mkdir(BACKUP_DIR_PATH, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR_PATH, `content.${stamp}.json`);
  await fs.copyFile(CONTENT_FILE_PATH, backupPath);
  return backupPath;
}

async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (session !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

async function getClientIpFromHeaders() {
  const headerStore = await headers();
  const forwarded = headerStore.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || null;
  }
  return headerStore.get('x-real-ip') || null;
}

async function revalidateCmsPaths(lang) {
  revalidatePath(`/${lang}/admin/dashboard`);
  revalidatePath('/en/admin/dashboard');
  revalidatePath('/ar/admin/dashboard');
  revalidatePath('/en');
  revalidatePath('/ar');
  revalidatePath('/en/portfolio');
  revalidatePath('/ar/portfolio');
  revalidatePath('/en/services');
  revalidatePath('/ar/services');
}


export async function handleLogin(lang, _prevState, formData) {
  const result = await verifyUserCredentials(
    formData.get('username'),
    formData.get('password'),
  );

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    cookieStore.set('admin_user_id', String(result?.user?.id || ''), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    cookieStore.set('admin_username', String(result?.user?.username || ''), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    redirect(`/${lang}/admin/dashboard`);
  }

  return result;
}

export async function handleLogout(lang) {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect(`/${lang}/admin/login`);
}

export async function addPortfolioItem(lang, formData) {
  await requireAdminSession();
  await assertValidContentFile();
  await backupContentFile();

  const payload = buildPortfolioPayload({
    titleEn: formData.get('title_en'),
    titleAr: formData.get('title_ar'),
    descriptionEn: formData.get('description_en'),
    descriptionAr: formData.get('description_ar'),
    resultEn: formData.get('result_en'),
    resultAr: formData.get('result_ar'),
    category: formData.get('category'),
    coverImageUrl: formData.get('cover_image_url'),
    galleryInput: formData.get('gallery_input'),
    videoUrls: formData.get('video_urls'),
    roleSummaryEn: formData.get('role_summary_en'),
    roleSummaryAr: formData.get('role_summary_ar'),
    actionSummaryEn: formData.get('action_summary_en'),
    actionSummaryAr: formData.get('action_summary_ar'),
    techFocusEn: formData.get('tech_focus_en'),
    techFocusAr: formData.get('tech_focus_ar'),
  });

  await createPortfolioItem(payload);
  await assertValidContentFile();

  await revalidateCmsPaths(lang);
}

export async function addPortfolioPreset(lang, presetKey) {
  await requireAdminSession();
  await assertValidContentFile();
  await backupContentFile();

  await createPortfolioPreset(presetKey);
  await assertValidContentFile();

  await revalidateCmsPaths(lang);
}

export async function deletePortfolioItem(lang, id) {
  await requireAdminSession();
  if (!id) return;
  await assertValidContentFile();
  await backupContentFile();
  await deletePortfolioItemById(String(id));
  await assertValidContentFile();

  await revalidateCmsPaths(lang);
}

export async function updatePortfolioItem(lang, id, formData) {
  await requireAdminSession();
  if (!id) return;
  await assertValidContentFile();
  await backupContentFile();

  const payload = buildPortfolioPayload({
    titleEn: formData.get('title_en'),
    titleAr: formData.get('title_ar'),
    descriptionEn: formData.get('description_en'),
    descriptionAr: formData.get('description_ar'),
    resultEn: formData.get('result_en'),
    resultAr: formData.get('result_ar'),
    category: formData.get('category'),
    coverImageUrl: formData.get('cover_image_url'),
    galleryInput: formData.get('gallery_input'),
    videoUrls: formData.get('video_urls'),
    roleSummaryEn: formData.get('role_summary_en'),
    roleSummaryAr: formData.get('role_summary_ar'),
    actionSummaryEn: formData.get('action_summary_en'),
    actionSummaryAr: formData.get('action_summary_ar'),
    techFocusEn: formData.get('tech_focus_en'),
    techFocusAr: formData.get('tech_focus_ar'),
  });

  await updatePortfolioItemById(String(id), payload);
  await assertValidContentFile();

  await revalidateCmsPaths(lang);
}

export async function updateSiteSections(lang, formData) {
  await requireAdminSession();
  const content = await assertValidContentFile();
  await backupContentFile();

  const patch = {
    en: {
      hero: {
        ctaPrimary: String(formData.get('hero_cta_primary_en') || '').trim(),
        ctaSecondary: String(formData.get('hero_cta_secondary_en') || '').trim(),
        slides: [
          {
            title: String(formData.get('hero_slide_1_title_en') || '').trim(),
            description: String(formData.get('hero_slide_1_description_en') || '').trim(),
          },
          {
            title: String(formData.get('hero_slide_2_title_en') || '').trim(),
            description: String(formData.get('hero_slide_2_description_en') || '').trim(),
          },
          {
            title: String(formData.get('hero_slide_3_title_en') || '').trim(),
            description: String(formData.get('hero_slide_3_description_en') || '').trim(),
          },
        ],
      },
      services: {
        headline: String(formData.get('services_headline_en') || '').trim(),
        subheadline: String(formData.get('services_subheadline_en') || '').trim(),
        uniqueBadge: String(formData.get('services_badge_en') || '').trim(),
      },
      founder: {
        headline: String(formData.get('about_headline_en') || '').trim(),
        badge: String(formData.get('about_badge_en') || '').trim(),
        story: String(formData.get('about_story_en') || '').trim(),
      },
    },
    ar: {
      hero: {
        ctaPrimary: String(formData.get('hero_cta_primary_ar') || '').trim(),
        ctaSecondary: String(formData.get('hero_cta_secondary_ar') || '').trim(),
        slides: [
          {
            title: String(formData.get('hero_slide_1_title_ar') || '').trim(),
            description: String(formData.get('hero_slide_1_description_ar') || '').trim(),
          },
          {
            title: String(formData.get('hero_slide_2_title_ar') || '').trim(),
            description: String(formData.get('hero_slide_2_description_ar') || '').trim(),
          },
          {
            title: String(formData.get('hero_slide_3_title_ar') || '').trim(),
            description: String(formData.get('hero_slide_3_description_ar') || '').trim(),
          },
        ],
      },
      services: {
        headline: String(formData.get('services_headline_ar') || '').trim(),
        subheadline: String(formData.get('services_subheadline_ar') || '').trim(),
        uniqueBadge: String(formData.get('services_badge_ar') || '').trim(),
      },
      founder: {
        headline: String(formData.get('about_headline_ar') || '').trim(),
        badge: String(formData.get('about_badge_ar') || '').trim(),
        story: String(formData.get('about_story_ar') || '').trim(),
      },
    },
  };

  const merged = deepMerge(content, patch);

  for (const langKey of ['en', 'ar']) {
    const oldSlides = content?.[langKey]?.hero?.slides || [];
    const newSlides = merged?.[langKey]?.hero?.slides || [];
    merged[langKey].hero.slides = newSlides.map((slide, index) => ({
      ...oldSlides[index],
      ...slide,
    }));
  }

  if (!validateContentShape(merged)) {
    throw new Error('Invalid content.json structure after merge');
  }

  await fs.writeFile(CONTENT_FILE_PATH, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  await revalidateCmsPaths(lang);
}

export async function createOnboardingProject(lang, formData) {
  if (!formData) {
    throw new Error('Missing form data');
  }

  await requireAdminSession();
  const title = String(formData.get('project_title') || 'New Client Project').trim();
  const clientName = String(formData.get('client_name') || 'Client').trim();
  const projectType = String(formData.get('project_type') || 'CLIENT_SERVICES').trim();
  const { token } = await createProjectWithSecureToken({ title, clientName, projectType });

  await revalidateCmsPaths(lang);
  return { success: true, token };
}

function resolveServerActionFormData(first, second) {
  if (first instanceof FormData) return first;
  if (second instanceof FormData) return second;
  return null;
}

export async function updateProjectDetails(lang, prevStateOrFormData, maybeFormData) {
  try {
    await requireAdminSession();
    const resolvedFormData = resolveServerActionFormData(prevStateOrFormData, maybeFormData);
    if (!resolvedFormData) {
      throw new Error('Missing form data');
    }
    const projectId = Number(resolvedFormData.get('projectId'));
    const title = String(resolvedFormData.get('project_title') || '').trim();
    const clientName = String(resolvedFormData.get('client_name') || '').trim();
    const statusRaw = String(resolvedFormData.get('status') || '').trim();

    if (!projectId) {
      throw new Error('Project ID is required');
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title || undefined,
        client_name: clientName || undefined,
        ...(statusRaw
          ? { lifecycleStatus: parseLifecycleStatusStrict(statusRaw) }
          : {}),
      },
    });

    if (statusRaw) {
      await appendActivityLog({
        projectId,
        actorRole: ActivityActorRole.ADMIN,
        action: 'project.updated',
        metadata: { lifecycleStatus: parseLifecycleStatusStrict(statusRaw) },
        ipAddress: await getClientIpFromHeaders(),
      });
    }

    await revalidateCmsPaths(lang);
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.message || 'Unable to update project' };
  }
}

export async function changeProjectStatus(lang, prevStateOrFormData, maybeFormData) {
  try {
    await requireAdminSession();
    const resolvedFormData = resolveServerActionFormData(prevStateOrFormData, maybeFormData);
    if (!resolvedFormData) {
      throw new Error('Missing form data');
    }
    const projectId = Number(resolvedFormData.get('projectId'));
    const statusRaw = String(resolvedFormData.get('status') || '').trim();

    if (!projectId) {
      throw new Error('Project ID is required');
    }

    if (!statusRaw) {
      throw new Error('Status is required');
    }

    const lifecycleStatus = parseLifecycleStatusStrict(statusRaw);

    await prisma.project.update({
      where: { id: projectId },
      data: { lifecycleStatus },
    });

    await appendActivityLog({
      projectId,
      actorRole: ActivityActorRole.ADMIN,
      action: 'lifecycle.changed',
      metadata: { lifecycleStatus },
      ipAddress: await getClientIpFromHeaders(),
    });

    await revalidateCmsPaths(lang);
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.message || 'Unable to change project status' };
  }
}

export async function deleteProjectById(lang, prevStateOrFormData, maybeFormData) {
  try {
    await requireAdminSession();
    const resolvedFormData = resolveServerActionFormData(prevStateOrFormData, maybeFormData);
    if (!resolvedFormData) {
      throw new Error('Missing form data');
    }
    const projectId = Number(resolvedFormData.get('projectId'));
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    await prisma.project.delete({ where: { id: projectId } });

    await revalidateCmsPaths(lang);
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.message || 'Unable to delete project' };
  }
}

export async function getAdminUsers(lang) {
  await requireAdminSession();
  return prisma.users.findMany({
    select: {
      id: true,
      username: true,
    },
    orderBy: { id: 'asc' },
  });
}

export async function createAdminUser(lang, formData) {
  await requireAdminSession();
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();

  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const passwordHash = await hashPassword(password);
  await prisma.users.create({
    data: { username, password: passwordHash },
  });

  await revalidateCmsPaths(lang);
}

export async function updateAdminUser(lang, formData) {
  await requireAdminSession();
  const userId = Number(formData.get('userId'));
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();

  if (!userId || !username) {
    throw new Error('User ID and username are required');
  }

  const updatePayload = { username };
  if (password) {
    updatePayload.password = await hashPassword(password);
  }

  await prisma.users.update({
    where: { id: userId },
    data: updatePayload,
  });

  await revalidateCmsPaths(lang);
}

export async function deleteAdminUser(lang, formData) {
  await requireAdminSession();
  const userId = Number(formData.get('userId'));

  if (!userId) {
    throw new Error('User ID is required');
  }

  await prisma.users.delete({ where: { id: userId } });
  await revalidateCmsPaths(lang);
}

export async function getCurrentAdminUser(lang) {
  await requireAdminSession();
  const cookieStore = await cookies();
  const rawId = String(cookieStore.get('admin_user_id')?.value || '').trim();
  const cookieUsername = String(cookieStore.get('admin_username')?.value || '').trim();
  const numericId = Number(rawId);

  if (!rawId || Number.isNaN(numericId) || numericId <= 0) {
    return { id: null, username: cookieUsername || null };
  }

  const user = await prisma.users.findUnique({
    where: { id: numericId },
    select: { id: true, username: true },
  });

  return user ? { id: user.id, username: user.username } : { id: null, username: cookieUsername || null };
}

export async function updateMyProfile(lang, prevStateOrFormData, maybeFormData) {
  try {
    await requireAdminSession();
    const resolvedFormData = resolveServerActionFormData(prevStateOrFormData, maybeFormData);
    if (!resolvedFormData) {
      throw new Error('Missing form data');
    }
    const username = String(resolvedFormData.get('username') || '').trim();
    const password = String(resolvedFormData.get('password') || '').trim();

    if (!username) {
      throw new Error('Username is required');
    }

    const cookieStore = await cookies();
    const rawId = String(cookieStore.get('admin_user_id')?.value || '').trim();
    const numericId = Number(rawId);
    if (!rawId || Number.isNaN(numericId) || numericId <= 0) {
      throw new Error('Profile updates require a database-backed admin user.');
    }

    const updatePayload = { username };
    if (password) {
      updatePayload.password = await hashPassword(password);
    }

    await prisma.users.update({
      where: { id: numericId },
      data: updatePayload,
    });

    cookieStore.set('admin_username', username, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    await revalidateCmsPaths(lang);
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.message || 'Unable to update profile' };
  }
}

export async function promoteOnboardingProject(lang, formData) {
  await requireAdminSession();
  const projectId = Number(formData.get('projectId'));
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  await promoteProjectToPortfolio(projectId);
  await revalidateCmsPaths(lang);
}

export async function promoteToPortfolioAction(projectId) {
  return await promoteToPortfolioActionOriginal(projectId);
}

export async function revokeOnboardingTokenAction(lang, formData) {
  await requireAdminSession();
  const token = String(formData.get('token') || '').trim();
  if (!token) {
    throw new Error('Invalid token');
  }

  await revokeOnboardingToken(token);
  await revalidateCmsPaths(lang);
}

export async function extendOnboardingTokenAction(lang, formData) {
  await requireAdminSession();
  const token = String(formData.get('token') || '').trim();
  if (!token) {
    throw new Error('Invalid token');
  }

  await extendOnboardingToken(token);
  await revalidateCmsPaths(lang);
}

export async function requestOnboardingRevisionAction(lang, formData) {
  await requireAdminSession();
  const projectId = Number(formData.get('projectId'));
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  await markProjectNeedsRevision(projectId);
  await revalidateCmsPaths(lang);
}

export async function regenerateOnboardingTokenAction(lang, formData) {
  await requireAdminSession();
  const token = String(formData.get('token') || '').trim();
  if (!token) {
    throw new Error('Invalid token');
  }

  const newToken = await regenerateOnboardingToken(token);
  await revalidateCmsPaths(lang);
  return { token: newToken };
}

export async function uploadDeliverableToProjectAction(lang, projectId, formData) {
  await requireAdminSession();
  
  const file = formData.get('file');
  const type = String(formData.get('type') || 'Design').trim();
  const version = parseInt(formData.get('version') || '1', 10);
  const title = String(formData.get('title') || 'Deliverable').trim();

  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('A valid file is required.');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  const filePath = path.join(uploadDir, safeFileName);
  await fs.writeFile(filePath, buffer);
  
  const fileUrl = `/uploads/${safeFileName}`;

  await prisma.deliverable.create({
    data: {
      projectId: Number(projectId),
      type,
      version,
      title,
      fileUrl,
      status: 'PENDING',
    }
  });

  await prisma.activityLog.create({
    data: {
      projectId: Number(projectId),
      actorRole: 'ADMIN',
      action: 'admin.deliverable_uploaded',
      metadataJson: { title, version, type, fileUrl }
    }
  });

  revalidatePath(`/${lang}/admin/dashboard`, 'page');
  return { success: true };
}

export async function injectSnapshotFieldAction(lang, projectId, stepId, fieldPayload) {
  await requireAdminSession();
  const { injectFieldToSnapshot } = await import('@/lib/plm/snapshot');
  
  await injectFieldToSnapshot(Number(projectId), stepId, fieldPayload);

  await prisma.activityLog.create({
    data: {
      projectId: Number(projectId),
      actorRole: 'ADMIN',
      action: 'admin.snapshot_field_injected',
      metadataJson: { stepId, fieldKey: fieldPayload.key }
    }
  });

  revalidatePath(`/${lang}/admin/dashboard`, 'page');
  return { success: true };
}

