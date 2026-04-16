function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function normalizeCategoryMetadata(portfolio) {
  const next = cloneDeep(portfolio);
  next.list = Array.isArray(next.list) ? next.list : [];
  next.details = next.details && typeof next.details === 'object' ? next.details : {};

  next.list = next.list.map((category) => {
    const detail = next.details[category.id] || { projects: [] };
    const projects = Array.isArray(detail.projects) ? detail.projects : [];
    const image =
      category.image ||
      projects.find((project) => project?.image)?.image ||
      projects.find((project) => Array.isArray(project?.gallery) && project.gallery.length)?.gallery?.[0] ||
      null;
    const hasVideo = projects.some((project) =>
      (project.links || []).some((link) => ['youtube', 'facebook'].includes(String(link?.type || '').toLowerCase())),
    );

    return {
      ...category,
      image,
      hasVideo: Boolean(category.hasVideo || hasVideo),
      projectCount: String(projects.length),
    };
  });

  return next;
}

export function mergePortfolioWithDatabase(portfolio) {
  return normalizeCategoryMetadata(portfolio);
}

export async function getMergedPortfolio(portfolio) {
  return normalizeCategoryMetadata(portfolio);
}
