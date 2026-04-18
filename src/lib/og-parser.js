'use server';

export async function fetchOgData(url) {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'WhatsApp/2' }, credentials: 'omit' });
    if (!response.ok) return null;
    
    const html = await response.text();
    
    const extract = (prop) => {
      const regex = new RegExp(`<meta\\s+(?:property|name)=["']${prop}["']\\s+content=["'](.*?)["']`, 'i');
      const match = html.match(regex);
      return match ? match[1] : null;
    };
    
    return {
      ogTitle: extract('og:title') || extract('twitter:title') || extract('title'),
      ogDescription: extract('og:description') || extract('twitter:description') || extract('description'),
      previewImage: extract('og:image') || extract('twitter:image'),
    };
  } catch (err) {
    console.error("Failed to parse OG data for visual archive:", err);
    return null;
  }
}
