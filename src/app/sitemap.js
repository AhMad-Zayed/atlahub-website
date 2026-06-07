const siteUrl = 'https://www.atlahub.tech';

export default function sitemap() {
  const now = new Date().toISOString();

  const staticPages = [
    { url: `${siteUrl}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/ar`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/en/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/ar/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/en/portfolio/software`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/portfolio/media`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/portfolio/training`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/portfolio/marketing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/portfolio/design`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ar/portfolio/software`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ar/portfolio/media`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ar/portfolio/training`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ar/portfolio/marketing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ar/portfolio/design`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/services/software-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/en/services/digital-marketing-creative`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/en/services/cybersecurity-forensics`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/en/services/infrastructure`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/en/services/training`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/ar/services/software-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/ar/services/digital-marketing-creative`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/ar/services/cybersecurity-forensics`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/ar/services/infrastructure`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/ar/services/training`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ];

  return staticPages;
}
