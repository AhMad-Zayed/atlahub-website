export const SERVICE_SECTOR_MAP = {
  'software-development': ['software'],
  'digital-marketing-creative': ['media', 'marketing', 'design'],
  'cybersecurity-forensics': ['cybersecurity', 'training'],
  infrastructure: ['software'],
  training: ['training'],
};

function inferSectorsByServiceId(serviceId) {
  if (SERVICE_SECTOR_MAP[serviceId]) {
    return SERVICE_SECTOR_MAP[serviceId];
  }

  const normalized = String(serviceId || '').toLowerCase();
  if (normalized.includes('software')) return ['software'];
  if (normalized.includes('marketing')) return ['media', 'marketing', 'design'];
  if (normalized.includes('cyber')) return ['cybersecurity', 'training'];
  if (normalized.includes('infra')) return ['software'];
  if (normalized.includes('training') || normalized.includes('academy')) return ['training'];
  return [];
}

export function getPortfolioCategoriesForService(serviceId, portfolio) {
  const candidateIds = inferSectorsByServiceId(serviceId);
  const available = new Set((portfolio?.list || []).map((item) => item.id));
  const withProjects = (portfolio?.list || [])
    .filter((item) => (portfolio?.details?.[item.id]?.projects || []).length > 0)
    .map((item) => item.id);

  const result = candidateIds.filter((id) => available.has(id));
  if (result.length) return result;
  return withProjects;
}
