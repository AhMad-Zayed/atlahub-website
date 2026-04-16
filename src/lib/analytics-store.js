import crypto from 'crypto';

// Legacy fs and path imports removed to fix Vercel EROFS errors
// We now fall back to an ephemeral memory model for legacy methods not yet migrated to Prisma.
let memoryAnalytics = null;
const MAX_EVENTS = 12000;
const MAX_LEADS = 3000;
let analyticsWriteQueue = Promise.resolve();

function nowIso() {
  return new Date().toISOString();
}

function toHost(value) {
  try {
    return new URL(value).host || 'direct';
  } catch {
    return value ? String(value) : 'direct';
  }
}

function parseCookieHeader(rawCookie = '') {
  return String(rawCookie || '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((acc, item) => {
      const separatorIndex = item.indexOf('=');
      if (separatorIndex === -1) return acc;
      const key = item.slice(0, separatorIndex).trim();
      const value = item.slice(separatorIndex + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function sanitizeSectionKey(value) {
  return String(value || '').trim();
}

function extractProjectKey(sectionKey) {
  const value = sanitizeSectionKey(sectionKey);
  if (!value.startsWith('project:')) return '';
  const withoutPrefix = value.slice('project:'.length);
  return withoutPrefix.split(':')[0].trim() || '';
}

function safeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function sha256Hex(value) {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function sanitizeIp(rawIp) {
  if (!rawIp) return '';
  return String(rawIp).split(',')[0].trim();
}

function normalizeTrustScore(score) {
  return Math.max(1, Math.min(100, Math.round(score)));
}

function calcTrustScore({ hasCanvas, hasWebgl, hasUa, hasTimezone, hasLang, hasScreen }) {
  let score = 20;
  if (hasCanvas) score += 18;
  if (hasWebgl) score += 18;
  if (hasUa) score += 16;
  if (hasTimezone) score += 10;
  if (hasLang) score += 8;
  if (hasScreen) score += 10;
  return normalizeTrustScore(score);
}

function createEmptyAnalytics() {
  return {
    profiles: {},
    events: [],
    leads: [],
    capi_dispatch_queue: [],
    updated_at: nowIso(),
  };
}

async function ensureAnalyticsFile() {
  // No-op for Vercel compatibility
}

async function readAnalytics() {
  if (!memoryAnalytics) {
    memoryAnalytics = createEmptyAnalytics();
  }
  return memoryAnalytics;
}

async function saveAnalytics(analytics) {
  memoryAnalytics = {
    ...analytics,
    events: (analytics.events || []).slice(-MAX_EVENTS),
    leads: (analytics.leads || []).slice(-MAX_LEADS),
    capi_dispatch_queue: (analytics.capi_dispatch_queue || []).slice(-MAX_LEADS),
    updated_at: nowIso(),
  };
}

async function withAnalyticsWriteLock(task) {
  analyticsWriteQueue = analyticsWriteQueue
    .then(() => task())
    .catch((error) => {
      console.error('Analytics write task failed:', error);
      throw error;
    });
  return analyticsWriteQueue;
}

function getRequestMeta(headersLike = {}) {
  const headers = {
    get(name) {
      if (typeof headersLike.get === 'function') return headersLike.get(name);
      return headersLike?.[name] || headersLike?.[name.toLowerCase()] || null;
    },
  };

  const userAgent = headers.get('user-agent') || 'unknown';
  const referrer = headers.get('referer') || headers.get('referrer') || 'direct';
  const ipRaw =
    headers.get('x-forwarded-for') ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    '';
  const ip = sanitizeIp(ipRaw);
  const ipHash = ip ? sha256Hex(ip) : 'unknown';

  const cookieMap = parseCookieHeader(headers.get('cookie') || '');
  const visitorUid =
    headers.get('x-atla-uid') ||
    cookieMap.atla_uid ||
    '';
  const fingerprintFromHeader = headers.get('x-atla-fingerprint') || cookieMap.atla_fp || '';

  return {
    userAgent,
    referrer,
    sourceHost: toHost(referrer),
    ipHash,
    visitorUid: String(visitorUid || '').trim(),
    fingerprintFromHeader: String(fingerprintFromHeader || '').trim(),
    geo: {
      country: headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || 'unknown',
      region: headers.get('x-vercel-ip-country-region') || 'unknown',
      city: headers.get('x-vercel-ip-city') || 'unknown',
    },
  };
}

function upsertProfile(analytics, payload, meta) {
  const fingerprint =
    String(payload?.fingerprint || '').trim() ||
    String(meta?.fingerprintFromHeader || '').trim() ||
    String(payload?.visitor_uid || '').trim() ||
    String(meta?.visitorUid || '').trim();
  if (!fingerprint) return null;

  const signals = payload?.signals || {};
  const profile = analytics.profiles[fingerprint] || {
    fingerprint,
    trust_score: 1,
    first_seen_at: nowIso(),
    last_seen_at: nowIso(),
    session_count: 0,
    ua_samples: [],
    source_hosts: {},
    geo_samples: {},
    tech_specs: {},
  };

  const lastSeen = profile.last_seen_at ? new Date(profile.last_seen_at).getTime() : 0;
  const thirtyMinutes = 1000 * 60 * 30;
  const isNewSession = !lastSeen || Date.now() - lastSeen > thirtyMinutes;

  profile.last_seen_at = nowIso();
  if (isNewSession) {
    profile.session_count = safeNumber(profile.session_count, 0) + 1;
  }
  profile.visitor_uid = String(payload?.visitor_uid || meta?.visitorUid || profile.visitor_uid || '');
  profile.ua_samples = [...new Set([...(profile.ua_samples || []), meta.userAgent])].slice(-8);
  profile.source_hosts = {
    ...(profile.source_hosts || {}),
    [meta.sourceHost]: safeNumber(profile.source_hosts?.[meta.sourceHost], 0) + 1,
  };

  const geoKey = `${meta.geo.country}|${meta.geo.region}|${meta.geo.city}`;
  profile.geo_samples = {
    ...(profile.geo_samples || {}),
    [geoKey]: safeNumber(profile.geo_samples?.[geoKey], 0) + 1,
  };

  profile.tech_specs = {
    browser: String(signals.browser || payload?.metadata?.browser || 'unknown'),
    platform: String(signals.platform || payload?.metadata?.platform || 'unknown'),
    language: String(signals.language || payload?.metadata?.language || 'unknown'),
    timezone: String(signals.timezone || payload?.metadata?.timezone || 'unknown'),
    screen: String(signals.screen || payload?.metadata?.screen || 'unknown'),
  };

  profile.trust_score = calcTrustScore({
    hasCanvas: Boolean(signals.canvas_hash),
    hasWebgl: Boolean(signals.webgl_hash),
    hasUa: Boolean(meta.userAgent && meta.userAgent !== 'unknown'),
    hasTimezone: Boolean(profile.tech_specs.timezone && profile.tech_specs.timezone !== 'unknown'),
    hasLang: Boolean(profile.tech_specs.language && profile.tech_specs.language !== 'unknown'),
    hasScreen: Boolean(profile.tech_specs.screen && profile.tech_specs.screen !== 'unknown'),
  });

  analytics.profiles[fingerprint] = profile;
  return profile;
}

export async function trackBehaviorEvent(payload, headersLike = {}) {
  return withAnalyticsWriteLock(async () => {
    const analytics = await readAnalytics();
    const meta = getRequestMeta(headersLike);
    const profile = upsertProfile(analytics, payload, meta);
    const fingerprint = profile?.fingerprint || String(payload?.fingerprint || '').trim() || 'anonymous';

    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      created_at: nowIso(),
      fingerprint,
      trust_score: profile?.trust_score || 1,
      visitor_uid: meta.visitorUid || '',
      type: String(payload?.type || 'unknown'),
      page_path: String(payload?.page_path || '/'),
      section_key: sanitizeSectionKey(payload?.section_key || ''),
      source_host: meta.sourceHost,
      referrer: meta.referrer,
      ip_hash: meta.ipHash,
      user_agent: meta.userAgent,
      geo: meta.geo,
      metadata: payload?.metadata || {},
      metrics: {
        scroll_depth: safeNumber(payload?.scroll_depth, null),
        dwell_ms: safeNumber(payload?.dwell_ms, null),
        click_x: safeNumber(payload?.click_x, null),
        click_y: safeNumber(payload?.click_y, null),
        click_target: payload?.click_target ? String(payload.click_target) : null,
      },
    };

    analytics.events.push(event);
    await saveAnalytics(analytics);
    return { ok: true, event_id: event.id, trust_score: event.trust_score };
  });
}

export async function dispatchLeadEvent(payload, headersLike = {}) {
  return withAnalyticsWriteLock(async () => {
    const analytics = await readAnalytics();
    const meta = getRequestMeta(headersLike);
    const profile = upsertProfile(analytics, payload, meta);
    const fingerprint = profile?.fingerprint || String(payload?.fingerprint || '').trim() || 'anonymous';

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      created_at: nowIso(),
      fingerprint,
      trust_score: profile?.trust_score || 1,
      visitor_uid: meta.visitorUid || '',
      event_name: String(payload?.event_name || 'Lead'),
      page_path: String(payload?.page_path || '/'),
      source_host: meta.sourceHost,
      referrer: meta.referrer,
      user_agent: meta.userAgent,
      ip_hash: meta.ipHash,
      geo: meta.geo,
      payload: payload?.payload || {},
    };

    analytics.leads.push(lead);
    analytics.capi_dispatch_queue.push({
      id: `capi_${lead.id}`,
      provider: 'meta_google_pending',
      status: 'queued',
      created_at: lead.created_at,
      payload: {
        event_name: lead.event_name,
        event_time: lead.created_at,
        user_data: {
          client_user_agent: lead.user_agent,
          client_ip_address_sha256: lead.ip_hash,
          fbp: lead.fingerprint,
        },
        custom_data: {
          source_host: lead.source_host,
          page_path: lead.page_path,
        },
      },
    });

    await saveAnalytics(analytics);
    return { ok: true, lead_id: lead.id, queue_size: analytics.capi_dispatch_queue.length };
  });
}

function topEntries(entriesObj, top = 5) {
  return Object.entries(entriesObj || {})
    .map(([key, count]) => ({ key, count: safeNumber(count, 0) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, top);
}

export async function getAnalyticsSummary() {
  const analytics = await readAnalytics();
  const events = analytics.events || [];
  const leads = analytics.leads || [];

  const sourceSessions = {};
  const sourceLeads = {};
  const sectionInterest = {};
  const countryTraffic = {};
  const techSpecCounts = {};
  const hotzones = {};
  const journeyTimeline = [];

  for (const event of events) {
    sourceSessions[event.source_host] = safeNumber(sourceSessions[event.source_host], 0) + 1;

    const section = event.section_key || 'general';
    if (!sectionInterest[section]) {
      sectionInterest[section] = {
        section,
        interactions: 0,
        total_dwell_ms: 0,
        clicks: 0,
      };
    }
    sectionInterest[section].interactions += 1;
    sectionInterest[section].total_dwell_ms += safeNumber(event.metrics?.dwell_ms, 0);
    if (event.type === 'click') {
      sectionInterest[section].clicks += 1;
    }

    const country = event.geo?.country || 'unknown';
    countryTraffic[country] = safeNumber(countryTraffic[country], 0) + 1;

    const techKey = `${event.metadata?.browser || 'unknown'} | ${event.metadata?.platform || 'unknown'}`;
    techSpecCounts[techKey] = safeNumber(techSpecCounts[techKey], 0) + 1;

    const projectKey = extractProjectKey(section);
    if (event.type === 'click' && projectKey) {
      hotzones[projectKey] = safeNumber(hotzones[projectKey], 0) + 1;
    }

    if ((event.type === 'dwell_time' || event.type === 'click') && projectKey) {
      journeyTimeline.push({
        created_at: event.created_at,
        visitor: event.visitor_uid || event.fingerprint,
        project: projectKey,
        action: event.type,
        dwell_ms: safeNumber(event.metrics?.dwell_ms, 0),
        source_host: event.source_host,
      });
    }
  }

  for (const lead of leads) {
    sourceLeads[lead.source_host] = safeNumber(sourceLeads[lead.source_host], 0) + 1;
  }

  const conversionBySource = Object.keys(sourceSessions)
    .map((source) => {
      const sessions = safeNumber(sourceSessions[source], 0);
      const leadCount = safeNumber(sourceLeads[source], 0);
      return {
        source,
        sessions,
        leads: leadCount,
        conversion_rate: sessions ? Number(((leadCount / sessions) * 100).toFixed(2)) : 0,
      };
    })
    .sort((a, b) => b.conversion_rate - a.conversion_rate)
    .slice(0, 8);

  const technicalInterestHeatmap = Object.values(sectionInterest)
    .map((entry) => ({
      section: entry.section,
      interactions: entry.interactions,
      clicks: entry.clicks,
      avg_dwell_seconds: entry.interactions
        ? Number((entry.total_dwell_ms / entry.interactions / 1000).toFixed(2))
        : 0,
    }))
    .sort((a, b) => b.interactions - a.interactions)
    .slice(0, 12);

  const uniqueIdentities = Object.keys(analytics.profiles || {}).length;
  const returningVisitors = Object.values(analytics.profiles || {}).filter(
    (profile) => safeNumber(profile.session_count, 0) > 1,
  ).length;
  const hotzoneProjects = Object.entries(hotzones)
    .map(([project, clicks]) => ({ project, clicks: safeNumber(clicks, 0) }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  return {
    totals: {
      profiles: uniqueIdentities,
      events: events.length,
      leads: leads.length,
      capi_queue: (analytics.capi_dispatch_queue || []).length,
      unique_identities: uniqueIdentities,
      returning_visitors: returningVisitors,
      project_engagement: events.filter((event) => extractProjectKey(event.section_key)).length,
      total_reach: uniqueIdentities + events.length,
      qualified_leads: leads.length,
    },
    uniqueVsReturning: {
      unique: uniqueIdentities,
      returning: returningVisitors,
    },
    userJourneyTimeline: journeyTimeline
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 20),
    hotzones: hotzoneProjects,
    conversionBySource,
    technicalInterestHeatmap,
    geoTraffic: topEntries(countryTraffic, 10),
    techSpecs: topEntries(techSpecCounts, 10),
    updated_at: analytics.updated_at,
  };
}
