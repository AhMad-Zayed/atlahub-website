import { promises as fs } from 'fs';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src/data/content.json');

export const PORTFOLIO_CATEGORIES = [
  { value: 'software', label: 'Software' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'media', label: 'Media' },
  { value: 'training', label: 'Training' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
];

export const PORTFOLIO_PRESETS = {
  qalandiaSocialEngineering: {
    title: 'Digital Security Camp - Best Football Player Academy (Qalandia)',
    category: 'training',
    description:
      'Interactive workshop focusing on safe internet practices, digital privacy, and secure browsing. The session aimed at raising awareness to prevent falling victim to social engineering and cyber-extortion among youth.',
    roleSummary:
      'Interactive youth workshop on safe internet habits, digital privacy, and practical online self-protection.',
    actionSummary:
      'Explained secure browsing, privacy preservation, and the warning signs of social engineering and cyber-extortion using relatable examples for younger audiences.',
    result:
      'Raised digital safety awareness and translated cybersecurity concepts into practical prevention habits for youth participants.',
    techFocus: 'Social Engineering, Digital Privacy, Safe Browsing',
    coverImageUrl: '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player1.jpg',
    gallery: [
      '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player1.jpg',
      '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player2.jpg',
      '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player3.jpg',
      '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player4.jpg',
      '/assets/images/portfolio/Qalnda_Camp_Best_fotball_player5.jpg',
    ],
    videoLinks: [],
  },
  alQudsEmailSpoofing: {
    title: 'Digital Security for Marketing - Al-Quds Open University',
    category: 'training',
    description:
      "Advanced technical workshop for Digital Marketing students on social media security. Featured live demonstrations of Phishing Attacks and Email Spoofing, including a simulation of sending an email from the professor's address to demonstrate social engineering risks.",
    roleSummary:
      'Advanced training for Digital Marketing students on platform protection and technical attack awareness.',
    actionSummary:
      "Delivered live phishing and email spoofing demonstrations, including a controlled simulation of sending an email from the professor's address to expose impersonation risk.",
    result:
      'Connected cybersecurity theory to live technical simulations so students could understand how spoofing and phishing directly threaten platform trust and brand operations.',
    techFocus: 'Email Spoofing, Phishing, Social Engineering, Social Media Security',
    coverImageUrl: '/assets/images/portfolio/Adus_open_university_DigitalMarketing_AhmaddZayed1.jpeg',
    gallery: [
      '/assets/images/portfolio/Adus_open_university_DigitalMarketing_AhmaddZayed1.jpeg',
      '/assets/images/portfolio/Adus_open_university_DigitalMarketing_AhmaddZayed2.jpeg',
    ],
    videoLinks: [],
  },
};

function parseListInput(value) {
  return String(value || '')
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueItems(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function detectVideoType(url) {
  if (/youtu\.?be|youtube\.com/i.test(url)) return 'youtube';
  if (/facebook\.com/i.test(url)) return 'facebook';
  return 'website';
}

function normalizeVideoLinks(value) {
  const rawLinks = Array.isArray(value) ? value : parseListInput(value);

  return rawLinks
    .map((item) => {
      if (!item) return null;

      if (typeof item === 'string') {
        return {
          type: detectVideoType(item),
          url: item,
          label: item,
        };
      }

      if (item?.url) {
        return {
          type: item.type || detectVideoType(item.url),
          url: item.url,
          label: item.label || item.url,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function pickCategoryLabel(id) {
  return PORTFOLIO_CATEGORIES.find((item) => item.value === id)?.label || id;
}

export function normalizePortfolioCategory(value) {
  const normalized = String(value || '').trim().toLowerCase();

  if (!normalized) return 'software';
  if (normalized === 'academy' || normalized === 'cybertraining' || normalized === 'cyber-training') {
    return 'training';
  }

  const aliasMap = {
    'software-development': 'software',
    software: 'software',
    cybersecurity: 'cybersecurity',
    cyber: 'cybersecurity',
    'cyber-security': 'cybersecurity',
    media: 'media',
    training: 'training',
    marketing: 'marketing',
    design: 'design',
  };

  return aliasMap[normalized] || 'software';
}

async function readContentData() {
  const raw = await fs.readFile(CONTENT_FILE_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeContentData(contentData) {
  await fs.writeFile(CONTENT_FILE_PATH, `${JSON.stringify(contentData, null, 2)}\n`, 'utf8');
}

function ensureLanguagePortfolio(contentData, lang) {
  if (!contentData[lang]) contentData[lang] = {};
  if (!contentData[lang].portfolio) contentData[lang].portfolio = {};
  if (!Array.isArray(contentData[lang].portfolio.list)) contentData[lang].portfolio.list = [];
  if (!contentData[lang].portfolio.details || typeof contentData[lang].portfolio.details !== 'object') {
    contentData[lang].portfolio.details = {};
  }

  return contentData[lang].portfolio;
}

function ensureCategoryStructures(portfolio, categoryId) {
  const listItem = portfolio.list.find((entry) => entry.id === categoryId);

  if (!listItem) {
    portfolio.list.push({
      id: categoryId,
      title: pickCategoryLabel(categoryId),
      summary: `${pickCategoryLabel(categoryId)} projects`,
      image: null,
      projectCount: '0',
      hasVideo: false,
    });
  }

  if (!portfolio.details[categoryId]) {
    portfolio.details[categoryId] = {
      title: pickCategoryLabel(categoryId),
      subtitle: `${pickCategoryLabel(categoryId)} projects`,
      projects: [],
    };
  }

  if (!Array.isArray(portfolio.details[categoryId].projects)) {
    portfolio.details[categoryId].projects = [];
  }
}

function updateCategoryMetadata(portfolio, categoryId) {
  ensureCategoryStructures(portfolio, categoryId);
  const detail = portfolio.details[categoryId];
  const projects = detail.projects || [];
  const listItem = portfolio.list.find((entry) => entry.id === categoryId);

  if (!listItem) return;

  const firstImage = projects.find((project) => project?.image)?.image
    || projects.find((project) => Array.isArray(project?.gallery) && project.gallery.length)?.gallery?.[0]
    || null;

  const hasVideo = projects.some((project) => (project.links || []).some((link) => {
    const type = String(link?.type || '').toLowerCase();
    return type === 'youtube' || type === 'facebook';
  }));

  listItem.projectCount = String(projects.length);
  listItem.image = firstImage;
  listItem.hasVideo = hasVideo;
}

function createLegacyId(categoryId, _project, index) {
  return `${categoryId}::idx::${index}`;
}

function resolveProjectId(categoryId, project, index) {
  if (project?.id) return String(project.id);
  return createLegacyId(categoryId, project, index);
}

function extractTechFocus(resultValue = '') {
  const value = String(resultValue || '');
  const marker = 'Tech Focus:';
  const markerIndex = value.lastIndexOf(marker);

  if (markerIndex === -1) {
    return {
      result: value,
      techFocus: '',
    };
  }

  const result = value.slice(0, markerIndex).trim();
  const techFocus = value.slice(markerIndex + marker.length).trim();
  return { result, techFocus };
}

function buildProjectRecord({
  id,
  name,
  role,
  action,
  result,
  techFocus,
  coverImageUrl,
  gallery,
  videoLinks,
}) {
  return {
    id,
    name,
    image: coverImageUrl || gallery[0] || null,
    role,
    action,
    result: techFocus ? `${result}${result ? '\n\n' : ''}Tech Focus: ${techFocus}` : result,
    gallery,
    links: videoLinks,
  };
}

export async function getPortfolioItems() {
  const contentData = await readContentData();
  const enPortfolio = contentData?.en?.portfolio || {};
  const arPortfolio = contentData?.ar?.portfolio || {};
  const items = [];

  for (const category of enPortfolio.list || []) {
    const categoryId = category.id;
    const enProjects = enPortfolio.details?.[categoryId]?.projects || [];
    const arProjects = arPortfolio.details?.[categoryId]?.projects || [];

    enProjects.forEach((project, index) => {
      const arProject = arProjects[index] || {};
      const normalizedLinks = normalizeVideoLinks(project.links || arProject.links || []);
      const enTech = extractTechFocus(project.result || '');
      const arTech = extractTechFocus(arProject.result || '');
      items.push({
        id: resolveProjectId(categoryId, project, index),
        category: categoryId,
        title: project.name || '',
        description: project.role || '',
        result: enTech.result || '',
        role_summary: project.role || '',
        action_summary: project.action || '',
        tech_focus: enTech.techFocus || '',
        cover_image_url: project.image || project.gallery?.[0] || null,
        image_url: project.image || project.gallery?.[0] || null,
        gallery: uniqueItems([project.image, ...(project.gallery || [])]),
        videoLinks: normalizedLinks,
        title_en: project.name || '',
        title_ar: arProject.name || '',
        description_en: project.role || '',
        description_ar: arProject.role || '',
        role_summary_en: project.role || '',
        role_summary_ar: arProject.role || '',
        action_summary_en: project.action || '',
        action_summary_ar: arProject.action || '',
        result_en: enTech.result || '',
        result_ar: arTech.result || '',
        tech_focus_en: enTech.techFocus || '',
        tech_focus_ar: arTech.techFocus || '',
      });
    });
  }

  return items.reverse();
}

export function buildPortfolioPayload(formDataLike) {
  const category = normalizePortfolioCategory(formDataLike.category);
  const coverImageUrl = String(formDataLike.coverImageUrl || '').trim();
  const gallery = uniqueItems([coverImageUrl, ...parseListInput(formDataLike.galleryInput)]);
  const videoLinks = normalizeVideoLinks(formDataLike.videoUrls);

  return {
    category,
    en: {
      title: String(formDataLike.titleEn || '').trim(),
      description: String(formDataLike.descriptionEn || '').trim(),
      roleSummary: String(formDataLike.roleSummaryEn || '').trim(),
      actionSummary: String(formDataLike.actionSummaryEn || '').trim(),
      result: String(formDataLike.resultEn || '').trim(),
      techFocus: String(formDataLike.techFocusEn || '').trim(),
    },
    ar: {
      title: String(formDataLike.titleAr || '').trim(),
      description: String(formDataLike.descriptionAr || '').trim(),
      roleSummary: String(formDataLike.roleSummaryAr || '').trim(),
      actionSummary: String(formDataLike.actionSummaryAr || '').trim(),
      result: String(formDataLike.resultAr || '').trim(),
      techFocus: String(formDataLike.techFocusAr || '').trim(),
    },
    coverImageUrl: coverImageUrl || gallery[0] || null,
    gallery,
    videoLinks,
  };
}

export async function createPortfolioItem(payload) {
  const contentData = await readContentData();
  const generatedId = `project_${Date.now()}`;

  for (const lang of ['en', 'ar']) {
    const portfolio = ensureLanguagePortfolio(contentData, lang);
    const categoryId = payload.category;
    ensureCategoryStructures(portfolio, categoryId);

    const langPayload = payload[lang] || {};
    const fallbackPayload = payload[lang === 'en' ? 'ar' : 'en'] || {};
    const title = langPayload.title || fallbackPayload.title || 'Untitled Project';
    const description = langPayload.description || fallbackPayload.description || '';
    const roleSummary = langPayload.roleSummary || description;
    const actionSummary = langPayload.actionSummary || description;
    const result = langPayload.result || fallbackPayload.result || '';
    const techFocus = langPayload.techFocus || fallbackPayload.techFocus || '';

    const project = buildProjectRecord({
      id: generatedId,
      name: title,
      role: roleSummary,
      action: actionSummary,
      result,
      techFocus,
      coverImageUrl: payload.coverImageUrl,
      gallery: payload.gallery,
      videoLinks: payload.videoLinks,
    });

    portfolio.details[categoryId].projects.push(project);
    updateCategoryMetadata(portfolio, categoryId);
  }

  await writeContentData(contentData);

  return {
    id: generatedId,
    category: payload.category,
    title: payload.en.title || payload.ar.title || 'Untitled Project',
    description: payload.en.description || payload.ar.description || '',
    cover_image_url: payload.coverImageUrl,
    gallery: payload.gallery,
    videoLinks: payload.videoLinks,
  };
}

export async function createPortfolioPreset(presetKey) {
  const preset = PORTFOLIO_PRESETS[presetKey];

  if (!preset) {
    throw new Error(`Unknown preset: ${presetKey}`);
  }

  const payload = {
    category: normalizePortfolioCategory(preset.category),
    en: {
      title: preset.title,
      description: preset.description,
      roleSummary: preset.roleSummary,
      actionSummary: preset.actionSummary,
      result: preset.result,
      techFocus: preset.techFocus,
    },
    ar: {
      title: preset.title,
      description: preset.description,
      roleSummary: preset.roleSummary,
      actionSummary: preset.actionSummary,
      result: preset.result,
      techFocus: preset.techFocus,
    },
    coverImageUrl: preset.coverImageUrl,
    gallery: uniqueItems([preset.coverImageUrl, ...(preset.gallery || [])]),
    videoLinks: normalizeVideoLinks(preset.videoLinks || []),
  };

  return createPortfolioItem(payload);
}

export async function deletePortfolioItemById(itemId) {
  if (!itemId) return { deleted: false };

  const contentData = await readContentData();
  let deleted = false;

  for (const lang of ['en', 'ar']) {
    const portfolio = ensureLanguagePortfolio(contentData, lang);

    for (const category of portfolio.list || []) {
      const categoryId = category.id;
      ensureCategoryStructures(portfolio, categoryId);
      const projects = portfolio.details[categoryId].projects || [];

      const filteredProjects = projects.filter((project, index) => {
        const resolvedId = resolveProjectId(categoryId, project, index);
        return resolvedId !== itemId;
      });

      if (filteredProjects.length !== projects.length) {
        deleted = true;
        portfolio.details[categoryId].projects = filteredProjects;
        updateCategoryMetadata(portfolio, categoryId);
      }
    }
  }

  if (deleted) {
    await writeContentData(contentData);
  }

  return { deleted };
}

function moveProjectToCategory(portfolio, fromCategoryId, toCategoryId, project) {
  ensureCategoryStructures(portfolio, toCategoryId);
  portfolio.details[toCategoryId].projects.push(project);
  updateCategoryMetadata(portfolio, toCategoryId);
  updateCategoryMetadata(portfolio, fromCategoryId);
}

export async function updatePortfolioItemById(itemId, payload) {
  if (!itemId) return { updated: false };

  const contentData = await readContentData();
  let updated = false;

  for (const lang of ['en', 'ar']) {
    const portfolio = ensureLanguagePortfolio(contentData, lang);
    const fromCategoryIds = (portfolio.list || []).map((category) => category.id);

    for (const fromCategoryId of fromCategoryIds) {
      ensureCategoryStructures(portfolio, fromCategoryId);
      const projects = portfolio.details[fromCategoryId].projects || [];
      const projectIndex = projects.findIndex((project, index) => {
        const resolvedId = resolveProjectId(fromCategoryId, project, index);
        return resolvedId === itemId;
      });

      if (projectIndex === -1) continue;

      updated = true;
      const existing = projects[projectIndex] || {};
      const langPayload = payload[lang] || {};
      const fallbackPayload = payload[lang === 'en' ? 'ar' : 'en'] || {};

      const title = langPayload.title || fallbackPayload.title || existing.name || 'Untitled Project';
      const description = langPayload.description || fallbackPayload.description || '';
      const roleSummary = langPayload.roleSummary || description;
      const actionSummary = langPayload.actionSummary || description;
      const result = langPayload.result || fallbackPayload.result || '';
      const techFocus = langPayload.techFocus || fallbackPayload.techFocus || '';

      const nextProject = buildProjectRecord({
        id: existing.id || itemId,
        name: title,
        role: roleSummary,
        action: actionSummary,
        result,
        techFocus,
        coverImageUrl: payload.coverImageUrl,
        gallery: payload.gallery,
        videoLinks: payload.videoLinks,
      });

      const toCategoryId = payload.category;
      projects.splice(projectIndex, 1);

      if (toCategoryId === fromCategoryId) {
        projects.splice(projectIndex, 0, nextProject);
        updateCategoryMetadata(portfolio, fromCategoryId);
      } else {
        moveProjectToCategory(portfolio, fromCategoryId, toCategoryId, nextProject);
      }

      break;
    }
  }

  if (updated) {
    await writeContentData(contentData);
  }

  return { updated };
}
