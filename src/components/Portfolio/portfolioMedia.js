export function isRemoteUrl(src) {
  return typeof src === 'string' && /^https?:\/\//.test(src);
}

export function getYoutubeId(url) {
  if (!url) return null;

  const patterns = [
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/watch\?v=([^?&/]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getFacebookReelId(url) {
  if (!url) return null;

  const match = url.match(/facebook\.com\/reel\/(\d+)/i);
  return match?.[1] || null;
}

export function getVideoEmbedUrl(url, type) {
  if (!url) return null;

  if (type === 'youtube') {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
  }

  if (type === 'facebook') {
    const reelId = getFacebookReelId(url);

    if (!reelId) return null;

    const reelUrl = `https://www.facebook.com/reel/${reelId}/`;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl)}&show_text=false&autoplay=true`;
  }

  return null;
}

export function getVideoThumbnail(url, type) {
  if (!url) return null;

  if (type === 'youtube') {
    const id = getYoutubeId(url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  }

  if (type === 'facebook') {
    return null;
  }

  return null;
}

export function getFirstVideoLink(links = []) {
  return links.find((link) => link.type === 'youtube' || link.type === 'facebook') || null;
}

export function getProjectPrimaryMedia(project) {
  if (project?.image) {
    return project.image;
  }

  const firstVideo = getFirstVideoLink(project?.links);
  return firstVideo ? getVideoThumbnail(firstVideo.url, firstVideo.type) : null;
}

export function buildProjectMediaItems(project) {
  const imageSources = project?.gallery?.length
    ? project.gallery
    : project?.image
      ? [project.image]
      : [];

  const imageItems = imageSources.map((src, index) => ({
    id: `image-${index}`,
    type: 'image',
    src,
    thumbnail: src,
    title: `${project?.name || 'Project'} ${index + 1}`,
  }));

  const videoItems = (project?.links || [])
    .filter((link) => link.type === 'youtube' || link.type === 'facebook')
    .map((link, index) => ({
      id: `video-${index}`,
      type: 'video',
      src: link.url,
      thumbnail: getVideoThumbnail(link.url, link.type),
      embedUrl: getVideoEmbedUrl(link.url, link.type),
      label: link.label,
      linkType: link.type,
      title: `${project?.name || 'Project'} ${link.label || index + 1}`,
    }))
    .filter((item) => item.embedUrl);

  return [...imageItems, ...videoItems];
}
