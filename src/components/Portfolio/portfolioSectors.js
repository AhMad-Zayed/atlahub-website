export const SERVICE_SECTOR_MAP = {
  'software-development': ['software'],
  'digital-marketing-creative': ['media', 'marketing', 'design'],
  'cybersecurity-forensics': ['cybertraining'],
  infrastructure: ['software'],
  academy: ['academy'],
};

export function getPortfolioCategoriesForService(serviceId) {
  return SERVICE_SECTOR_MAP[serviceId] || [];
}
