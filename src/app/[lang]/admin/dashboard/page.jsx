import Link from 'next/link';
import {
  addPortfolioItem,
  addPortfolioPreset,
  createOnboardingProject,
  deletePortfolioItem,
  handleLogout,
  promoteOnboardingProject,
  regenerateOnboardingTokenAction,
  requestOnboardingRevisionAction,
  updateProjectDetails,
  deleteProjectById,
  changeProjectStatus,
  getCurrentAdminUser,
  updateMyProfile,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  updateSiteSections,
  updatePortfolioItem,
} from '../actions';
import ProjectManagementPanel from '@/components/Admin/ProjectManagementPanel';
import TeamSettingsPanel from '@/components/Admin/TeamSettingsPanel';
import ProfileSettingsPanel from '@/components/Admin/ProfileSettingsPanel';
import CopyOnboardingLink from '@/components/Admin/CopyOnboardingLink';
import AdminProjectManager from '@/components/Admin/AdminProjectManager';
import UnifiedTimeline from '@/components/PLM/UnifiedTimeline';
import { PORTFOLIO_CATEGORIES, getPortfolioItems } from '@/lib/portfolio-admin';
import { getPipelineProjects } from '@/lib/onboarding';
import { getContactMessages } from '@/lib/messages-store';
import content from '@/data/content.json';
import prisma from '@/lib/prisma';
import CreateEliteProjectModal from '@/components/Admin/CreateEliteProjectModal';
import UserJourneyMap from '@/components/Admin/UserJourneyMap';

export const dynamic = 'force-dynamic';

function formatStableDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  return date.toUTCString();
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block font-cairo text-sm font-semibold text-slate-900 dark:text-white">
      {children}
    </label>
  );
}

function TextInput({ name, placeholder, required = false, defaultValue = '' }) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 font-tajawal text-sm text-white shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-30 placeholder:text-slate-400"
    />
  );
}

function TextArea({ name, placeholder, rows = 4, defaultValue = '' }) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 font-tajawal text-sm text-white shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-30 placeholder:text-slate-400"
    />
  );
}

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const enContent = content.en || {};
  const arContent = content.ar || {};
  const portfolioItems = await getPortfolioItems();
  const contactMessages = await getContactMessages();

  const totalEvents = await prisma.analytics.count();
  const leads = await prisma.analytics.count({
    where: { event: { contains: 'lead', mode: 'insensitive' } },
  });
  const projectEngagement = await prisma.analytics.count({
    where: { path: { contains: 'project', mode: 'insensitive' } },
  });
  
  const trendsByEvent = await prisma.analytics.groupBy({
    by: ['event'],
    _count: {
      id: true,
    },
  });

  const recentEvents = await prisma.analytics.findMany({
    orderBy: { timestamp: 'desc' },
    take: 20,
  });

  const analyticsSummary = {
    totals: {
      total_reach: totalEvents,
      project_engagement: projectEngagement,
      unique_identities: totalEvents, 
      qualified_leads: leads,
    },
    technicalInterestHeatmap: trendsByEvent.map((trend) => ({
      section: trend.event,
      interactions: trend._count.id,
      clicks: 0,
      avg_dwell_seconds: 0,
    })),
    userJourneyTimeline: recentEvents.map((ev) => ({
      created_at: ev.timestamp.toISOString(),
      visitor: 'Anonymous',
      project: ev.path || 'Global',
      action: ev.event,
      dwell_ms: 0,
      source_host: 'direct',
    })),
  };
  const logoutAction = handleLogout.bind(null, lang);
  const updateSiteAction = updateSiteSections.bind(null, lang);
  const addItemAction = addPortfolioItem.bind(null, lang);
  const createOnboardingProjectAction = createOnboardingProject.bind(null, lang);
  const promoteOnboardingProjectAction = promoteOnboardingProject.bind(null, lang);
  const regenerateTokenAction = regenerateOnboardingTokenAction.bind(null, lang);
  const requestRevisionAction = requestOnboardingRevisionAction.bind(null, lang);
  const updateProjectAction = updateProjectDetails.bind(null, lang);
  const deleteProjectAction = deleteProjectById.bind(null, lang);
  const changeProjectStatusAction = changeProjectStatus.bind(null, lang);
  const updateMyProfileAction = updateMyProfile.bind(null, lang);
  const createAdminUserAction = createAdminUser.bind(null, lang);
  const updateAdminUserAction = updateAdminUser.bind(null, lang);
  const deleteAdminUserAction = deleteAdminUser.bind(null, lang);
  const addQalandiaPresetAction = addPortfolioPreset.bind(null, lang, 'qalandiaSocialEngineering');
  const addOpenUniversityPresetAction = addPortfolioPreset.bind(null, lang, 'alQudsEmailSpoofing');
  const onboardingProjects = await getPipelineProjects();
  const adminUsers = await getAdminUsers(lang);
  const currentAdminUser = await getCurrentAdminUser(lang);
  const executiveStats = [
    { label: 'Total Reach', value: analyticsSummary?.totals?.total_reach || 0, color: 'text-cyan-300' },
    { label: 'Project Engagement', value: analyticsSummary?.totals?.project_engagement || 0, color: 'text-pink-300' },
    { label: 'Unique Identities', value: analyticsSummary?.totals?.unique_identities || 0, color: 'text-emerald-300' },
    { label: 'Qualified Leads', value: analyticsSummary?.totals?.qualified_leads || 0, color: 'text-amber-300' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] p-4 font-cairo text-white md:p-6">
      <div className="pointer-events-none absolute -left-28 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25),transparent_62%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.2),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.2),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1700px]">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <p className="font-tajawal text-xs uppercase tracking-[0.34em] text-slate-400">Elite Navigation</p>
            <h2 className="mt-3 font-cairo text-2xl font-bold text-white">Command Center</h2>
            <nav className="mt-6 space-y-3 font-tajawal text-sm text-slate-200">
              <a href="#overview" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-cyan-400/40 hover:bg-slate-800/80 hover:text-cyan-300">Overview</a>
              <a href="#journey-map" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-pink-400/40 hover:bg-slate-800/80 hover:text-pink-300">User Journey</a>
              <a href="#core-editor" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-cyan-400/40 hover:bg-slate-800/80 hover:text-cyan-300">Core Content</a>
              <a href="#portfolio-hub" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-amber-400/40 hover:bg-slate-800/80 hover:text-amber-300">Portfolio Hub</a>
              <a href="#pipeline-management" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-emerald-400/40 hover:bg-slate-800/80 hover:text-emerald-300">Pipeline Management</a>
              <a href={`/${lang}/admin/onboarding`} className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-cyan-400/40 hover:bg-slate-800/80 hover:text-cyan-300">Onboarding Ops</a>
              <a href="#portfolio-records" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-emerald-400/40 hover:bg-slate-800/80 hover:text-emerald-300">Project Records</a>
              <a href="#lead-inbox" className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition hover:border-orange-400/40 hover:bg-slate-800/80 hover:text-orange-300">Lead Inbox</a>
            </nav>
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="font-tajawal text-xs uppercase tracking-[0.24em] text-cyan-200">Server Status</p>
              <p className="mt-2 font-cairo text-lg font-semibold text-white">Live Operational</p>
            </div>
          </aside>

          <div>
            <div id="overview" className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Mission Control</p>
                <h1 className="mt-3 text-4xl font-bold text-white">Executive Control Center</h1>
                <p className="mt-3 max-w-3xl font-tajawal text-base leading-7 text-slate-300">
                  Manage bilingual content, portfolio media, and performance intelligence from a single elite command surface.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#portfolio-hub" className="rounded-full border border-white/10 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15 hover:text-white">
                    Portfolio Hub
                  </a>
                  <a href="#lead-inbox" className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white">
                    Recent Inbox
                  </a>
                </div>
              </div>
              <form action={logoutAction} className="flex items-center justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 px-5 py-3 font-tajawal text-sm font-semibold text-slate-950 transition hover:from-orange-300 hover:to-amber-400"
                >
                  Logout
                </button>
              </form>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {executiveStats.map((card) => (
                <div key={card.label} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                  <p className="font-tajawal text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
                  <p className={`mt-4 font-cairo text-4xl font-semibold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-8">
                <section id="journey-map" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(14,165,233,0.18)] backdrop-blur-xl">
                  <div className="mb-6">
                    <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">
                      Performance Intelligence
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">User Journey Map</h2>
                    <p className="mt-2 font-tajawal text-sm text-slate-300">
                      Advanced behavioral analytics with fingerprint trust scoring, heatmap events, and CAPI-ready lead queue.
                    </p>
                  </div>
                  <UserJourneyMap summary={analyticsSummary} />
                </section>

                <section id="core-editor" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(56,189,248,0.14)] backdrop-blur-xl">
                  <div className="mb-6">
                    <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">
                      Content Pipeline
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">Core Content Editor</h2>
                    <p className="mt-3 max-w-3xl font-tajawal text-sm leading-7 text-slate-300">
                      Update core brand messaging in both languages at once. This editor writes directly to <code>src/data/content.json</code> with backup + structure validation.
                    </p>
                  </div>

                  <form action={updateSiteAction} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <FieldLabel>Hero CTA Primary (EN)</FieldLabel>
                      <TextInput name="hero_cta_primary_en" required defaultValue={enContent.hero?.ctaPrimary || ''} placeholder="Start Your Project" />
                    </div>
                    <div>
                      <FieldLabel>Hero CTA Primary (AR)</FieldLabel>
                      <TextInput name="hero_cta_primary_ar" required defaultValue={arContent.hero?.ctaPrimary || ''} placeholder="ابدأ مشروعك" />
                    </div>
                    <div>
                      <FieldLabel>Hero CTA Secondary (EN)</FieldLabel>
                      <TextInput name="hero_cta_secondary_en" required defaultValue={enContent.hero?.ctaSecondary || ''} placeholder="View Results" />
                    </div>
                    <div>
                      <FieldLabel>Hero CTA Secondary (AR)</FieldLabel>
                      <TextInput name="hero_cta_secondary_ar" required defaultValue={arContent.hero?.ctaSecondary || ''} placeholder="استعرض النتائج" />
                    </div>

                    <div>
                      <FieldLabel>Hero Slide 1 Title (EN)</FieldLabel>
                      <TextInput name="hero_slide_1_title_en" required defaultValue={enContent.hero?.slides?.[0]?.title || ''} placeholder="Slide title" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 1 Title (AR)</FieldLabel>
                      <TextInput name="hero_slide_1_title_ar" required defaultValue={arContent.hero?.slides?.[0]?.title || ''} placeholder="عنوان الشريحة" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 1 Description (EN)</FieldLabel>
                      <TextArea name="hero_slide_1_description_en" rows={3} defaultValue={enContent.hero?.slides?.[0]?.description || ''} placeholder="Slide description" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 1 Description (AR)</FieldLabel>
                      <TextArea name="hero_slide_1_description_ar" rows={3} defaultValue={arContent.hero?.slides?.[0]?.description || ''} placeholder="وصف الشريحة" />
                    </div>

                    <div>
                      <FieldLabel>Hero Slide 2 Title (EN)</FieldLabel>
                      <TextInput name="hero_slide_2_title_en" required defaultValue={enContent.hero?.slides?.[1]?.title || ''} placeholder="Slide title" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 2 Title (AR)</FieldLabel>
                      <TextInput name="hero_slide_2_title_ar" required defaultValue={arContent.hero?.slides?.[1]?.title || ''} placeholder="عنوان الشريحة" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 2 Description (EN)</FieldLabel>
                      <TextArea name="hero_slide_2_description_en" rows={3} defaultValue={enContent.hero?.slides?.[1]?.description || ''} placeholder="Slide description" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 2 Description (AR)</FieldLabel>
                      <TextArea name="hero_slide_2_description_ar" rows={3} defaultValue={arContent.hero?.slides?.[1]?.description || ''} placeholder="وصف الشريحة" />
                    </div>

                    <div>
                      <FieldLabel>Hero Slide 3 Title (EN)</FieldLabel>
                      <TextInput name="hero_slide_3_title_en" required defaultValue={enContent.hero?.slides?.[2]?.title || ''} placeholder="Slide title" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 3 Title (AR)</FieldLabel>
                      <TextInput name="hero_slide_3_title_ar" required defaultValue={arContent.hero?.slides?.[2]?.title || ''} placeholder="عنوان الشريحة" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 3 Description (EN)</FieldLabel>
                      <TextArea name="hero_slide_3_description_en" rows={3} defaultValue={enContent.hero?.slides?.[2]?.description || ''} placeholder="Slide description" />
                    </div>
                    <div>
                      <FieldLabel>Hero Slide 3 Description (AR)</FieldLabel>
                      <TextArea name="hero_slide_3_description_ar" rows={3} defaultValue={arContent.hero?.slides?.[2]?.description || ''} placeholder="وصف الشريحة" />
                    </div>

                    <div>
                      <FieldLabel>Services Headline (EN)</FieldLabel>
                      <TextInput name="services_headline_en" required defaultValue={enContent.services?.headline || ''} placeholder="Services headline" />
                    </div>
                    <div>
                      <FieldLabel>Services Headline (AR)</FieldLabel>
                      <TextInput name="services_headline_ar" required defaultValue={arContent.services?.headline || ''} placeholder="عنوان الخدمات" />
                    </div>
                    <div>
                      <FieldLabel>Services Subheadline (EN)</FieldLabel>
                      <TextArea name="services_subheadline_en" rows={3} defaultValue={enContent.services?.subheadline || ''} placeholder="Services subheadline" />
                    </div>
                    <div>
                      <FieldLabel>Services Subheadline (AR)</FieldLabel>
                      <TextArea name="services_subheadline_ar" rows={3} defaultValue={arContent.services?.subheadline || ''} placeholder="وصف الخدمات" />
                    </div>
                    <div>
                      <FieldLabel>Services Badge (EN)</FieldLabel>
                      <TextInput name="services_badge_en" defaultValue={enContent.services?.uniqueBadge || ''} placeholder="Featured" />
                    </div>
                    <div>
                      <FieldLabel>Services Badge (AR)</FieldLabel>
                      <TextInput name="services_badge_ar" defaultValue={arContent.services?.uniqueBadge || ''} placeholder="مميز" />
                    </div>

                    <div>
                      <FieldLabel>About Headline (EN)</FieldLabel>
                      <TextInput name="about_headline_en" required defaultValue={enContent.founder?.headline || ''} placeholder="Founder headline" />
                    </div>
                    <div>
                      <FieldLabel>About Headline (AR)</FieldLabel>
                      <TextInput name="about_headline_ar" required defaultValue={arContent.founder?.headline || ''} placeholder="عنوان المؤسس" />
                    </div>
                    <div>
                      <FieldLabel>About Badge (EN)</FieldLabel>
                      <TextInput name="about_badge_en" defaultValue={enContent.founder?.badge || ''} placeholder="Founder badge" />
                    </div>
                    <div>
                      <FieldLabel>About Badge (AR)</FieldLabel>
                      <TextInput name="about_badge_ar" defaultValue={arContent.founder?.badge || ''} placeholder="وسم المؤسس" />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel>About Story (EN)</FieldLabel>
                      <TextArea name="about_story_en" rows={5} defaultValue={enContent.founder?.story || ''} placeholder="Founder story in English" />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel>About Story (AR)</FieldLabel>
                      <TextArea name="about_story_ar" rows={5} defaultValue={arContent.founder?.story || ''} placeholder="قصة المؤسس بالعربية" />
                    </div>

                    <button
                      type="submit"
                      className="md:col-span-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 font-tajawal text-sm font-semibold text-white transition hover:from-sky-500 hover:to-cyan-400"
                    >
                      Save Core Site Sections
                    </button>
                  </form>
                </section>

                <section id="portfolio-hub" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-amber-300">
                        Portfolio Operations
                      </p>
                      <h2 className="mt-3 text-2xl font-bold text-white">Add Portfolio Item</h2>
                    </div>
                    <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 font-tajawal text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                      Multi-media Ready
                    </div>
                  </div>

                  <form action={addItemAction} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <FieldLabel>Project Title (EN)</FieldLabel>
                      <TextInput
                        name="title_en"
                        placeholder="Digital Security for Marketing - Al-Quds Open University"
                        required
                      />
                    </div>

                    <div>
                      <FieldLabel>Project Title (AR)</FieldLabel>
                      <TextInput
                        name="title_ar"
                        placeholder="الأمن الرقمي للتسويق - جامعة القدس المفتوحة"
                        required
                      />
                    </div>

                    <div>
                      <FieldLabel>Category</FieldLabel>
                      <select
                        name="category"
                        defaultValue="training"
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 font-tajawal text-sm text-white shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-30"
                      >
                        {PORTFOLIO_CATEGORIES.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel>Challenge / Overview (EN)</FieldLabel>
                      <TextArea
                        name="description_en"
                        rows={4}
                        placeholder="Describe the scenario, audience, and objective of the project."
                      />
                    </div>

                    <div>
                      <FieldLabel>Challenge / Overview (AR)</FieldLabel>
                      <TextArea
                        name="description_ar"
                        rows={4}
                        placeholder="اشرح السيناريو، الجمهور، والهدف من المشروع."
                      />
                    </div>

                    <div>
                      <FieldLabel>Role Summary (EN)</FieldLabel>
                      <TextArea
                        name="role_summary_en"
                        rows={3}
                        placeholder="Curriculum design, phishing simulation, digital privacy coaching..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Role Summary (AR)</FieldLabel>
                      <TextArea
                        name="role_summary_ar"
                        rows={3}
                        placeholder="تصميم المنهج، محاكاة التصيد، التوعية بالخصوصية الرقمية..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Action Summary (EN)</FieldLabel>
                      <TextArea
                        name="action_summary_en"
                        rows={3}
                        placeholder="Explain how the workshop, demo, or implementation was executed."
                      />
                    </div>

                    <div>
                      <FieldLabel>Action Summary (AR)</FieldLabel>
                      <TextArea
                        name="action_summary_ar"
                        rows={3}
                        placeholder="اشرح كيف تم تنفيذ الورشة أو العرض أو التطبيق."
                      />
                    </div>

                    <div>
                      <FieldLabel>Result / Impact (EN)</FieldLabel>
                      <TextArea
                        name="result_en"
                        rows={3}
                        placeholder="Raised awareness, improved readiness, demonstrated spoofing risk..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Result / Impact (AR)</FieldLabel>
                      <TextArea
                        name="result_ar"
                        rows={3}
                        placeholder="رفع الوعي، تحسين الجاهزية، توضيح مخاطر الانتحال..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Technical Focus (EN)</FieldLabel>
                      <TextInput
                        name="tech_focus_en"
                        placeholder="Email Spoofing, Phishing, Social Engineering, Flutter, ML..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Technical Focus (AR)</FieldLabel>
                      <TextInput
                        name="tech_focus_ar"
                        placeholder="انتحال البريد، التصيد، الهندسة الاجتماعية، Flutter، تعلم الآلة..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Cover Image Path</FieldLabel>
                      <TextInput
                        name="cover_image_url"
                        placeholder="/assets/images/portfolio/example.jpg"
                      />
                    </div>

                    <div>
                      <FieldLabel>Video URLs</FieldLabel>
                      <TextArea
                        name="video_urls"
                        rows={3}
                        placeholder="One YouTube/Facebook URL per line, or comma-separated."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <FieldLabel>Gallery Image Paths</FieldLabel>
                      <TextArea
                        name="gallery_input"
                        rows={4}
                        placeholder="/assets/images/portfolio/image1.jpg, /assets/images/portfolio/image2.jpg"
                      />
                      <p className="mt-2 font-tajawal text-xs text-slate-500 dark:text-slate-400">
                        Supports comma-separated or one-path-per-line input. The cover image will be merged into the gallery automatically.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="md:col-span-2 rounded-2xl bg-slate-950 px-5 py-3 font-tajawal text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-gradient-to-r dark:from-sky-500 dark:to-cyan-400 dark:text-slate-950"
                    >
                      Save Portfolio Item
                    </button>
                  </form>
                </section>

                <section id="pipeline-management" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">
                        Client Pipeline
                      </p>
                      <h2 className="mt-3 text-2xl font-bold text-white">Onboarding Project Pipeline</h2>
                      <p className="mt-3 max-w-2xl font-tajawal text-sm text-slate-400">
                        Generate secure onboarding portals for elite clients and track submissions through the project pipeline.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end">
                      <CreateEliteProjectModal />
                      <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-tajawal text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                        Live secure onboarding links
                      </div>
                    </div>
                  </div>

                  <form action={createOnboardingProjectAction} className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
                    <div>
                      <label className="mb-2 block font-cairo text-sm font-semibold text-slate-200">New Project Name</label>
                      <input
                        name="project_title"
                        placeholder="Strategic Campaign Onboarding"
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-cairo text-sm font-semibold text-slate-200">Client Name</label>
                      <input
                        name="client_name"
                        placeholder="Al-Quds Studio"
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-cairo text-sm font-semibold text-slate-200">Project Type</label>
                      <select
                        name="project_type"
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                      >
                        <option value="CLIENT_SERVICES">Client Services (Default Flow)</option>
                        <option value="VISUAL_ID">Visual Identity (Deliverable Vault)</option>
                        <option value="PROPOSAL">Workshop Proposal</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="lg:col-span-3 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 font-tajawal text-sm font-semibold text-white transition hover:from-sky-500 hover:to-cyan-400"
                    >
                      Generate Onboarding Link
                    </button>
                  </form>

                  <div className="mt-8 space-y-4">
                    {onboardingProjects.length === 0 ? (
                      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 text-slate-400">
                        No active onboarding projects yet. Create a secure link to begin the pipeline.
                      </div>
                    ) : (
                      onboardingProjects.map((project) => {
                        const progressCount = [
                          project.submission?.step1_soul,
                          project.submission?.step2_market,
                          project.submission?.step3_visual,
                          (project.submission?.step4_media || []).length ? 'filled' : '',
                          project.submission?.step5_summary,
                        ].filter(Boolean).length;
                        const progress = Math.round((progressCount / 5) * 100);
                        const activeToken = project.tokens?.find(
                          (candidate) => candidate?.is_active && new Date(candidate.expires_at) > new Date()
                        );
                        const onboardingToken = activeToken || project.tokens?.[0] || null;
                        const tokenState = onboardingToken
                          ? onboardingToken.is_active && new Date(onboardingToken.expires_at) > new Date()
                            ? 'Live'
                            : 'Expired'
                          : 'Unavailable';

                        const formatMetadata = (meta) => {
                          if (!meta) return '';
                          try {
                            const obj = typeof meta === 'string' ? JSON.parse(meta) : meta;
                            return obj.message || obj.title ? `${obj.message || ''} ${obj.title || ''}`.trim() : JSON.stringify(obj);
                          } catch {
                            return String(meta);
                          }
                        };

                        const unifiedEvents = [
                          ...(project.activityLogs || []).map(log => ({ id: `al-${log.id}`, createdAt: log.createdAt, title: log.action, description: formatMetadata(log.metadata), actor: log.actorRole })),
                          ...(project.collaboratorNotes || []).map(note => ({ id: `cn-${note.id}`, createdAt: note.createdAt, title: 'Collaborator Note', description: note.content, actor: note.author })),
                          ...(project.deliverables || []).flatMap(d => (d.comments || []).map(c => ({ id: `dc-${c.id}`, createdAt: c.createdAt, title: `Comment on ${d.title}`, description: c.comment, actor: c.author })))
                        ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                        return (
                          <div key={project.id} className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(2,8,24,0.35)]">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <h3 className="font-cairo text-xl font-semibold text-white">{project.title}</h3>
                                <p className="mt-1 text-sm text-slate-400">Client: {project.client_name}</p>
                                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500">Status: {project.status}</p>
                              </div>
                              <div className="space-y-2 text-right">
                                {onboardingToken ? (
                                  <>
                                    <div className="text-sm text-slate-300">
                                      Link:{' '}
                                      <CopyOnboardingLink lang={lang} token={onboardingToken.id} />
                                    </div>
                                    <p className="text-sm text-slate-400">Token Status: {tokenState}</p>
                                    <p className="text-sm text-slate-400">Expires: {new Date(onboardingToken.expires_at).toLocaleDateString()}</p>
                                  </>
                                ) : (
                                  <p className="text-sm text-slate-400">No onboarding token available</p>
                                )}
                                <p className="text-sm text-slate-400">Progress: {progress}%</p>
                              </div>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                              <ProjectManagementPanel
                                project={project}
                                updateAction={updateProjectAction}
                                deleteAction={deleteProjectAction}
                                changeStatusAction={changeProjectStatusAction}
                              />
                              <form action={regenerateTokenAction}>
                                <input type="hidden" name="token" value={onboardingToken?.id || ''} />
                                <button
                                  type="submit"
                                  disabled={!onboardingToken}
                                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Regenerate Token
                                </button>
                              </form>
                              {project.status === 'Review' ? (
                                <form action={requestRevisionAction}>
                                  <input type="hidden" name="projectId" value={project.id} />
                                  <button
                                    type="submit"
                                    className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                                  >
                                    Request Revision
                                  </button>
                                </form>
                              ) : null}
                              <form action={promoteOnboardingProjectAction}>
                                <input type="hidden" name="projectId" value={project.id} />
                                <button
                                  type="submit"
                                  className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                                >
                                  Promote to Portfolio
                                </button>
                              </form>
                            </div>

                            <AdminProjectManager lang={lang} projectId={project.id} projectType={project.type} />

                            <div className="mt-8 border-t border-white/10 pt-6">
                              <h4 className="text-cyan-300 font-semibold mb-4 text-sm tracking-widest uppercase">Project Timeline</h4>
                              <UnifiedTimeline events={unifiedEvents} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </section>

                <section id="profile-settings" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <ProfileSettingsPanel user={currentAdminUser} updateAction={updateMyProfileAction} />
                </section>

                <section id="team-management" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <TeamSettingsPanel
                    users={adminUsers}
                    createAction={createAdminUserAction}
                    updateAction={updateAdminUserAction}
                    deleteAction={deleteAdminUserAction}
                  />
                </section>

                <section id="portfolio-records" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="mb-6">
                    <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-slate-400">
                      Quick Injection
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">Training Showcase Presets</h2>
                    <p className="mt-3 max-w-3xl font-tajawal text-sm leading-7 text-slate-300">
                      One-click actions to add the cybersecurity community projects we discussed, with galleries and technical metadata preloaded.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <form action={addQalandiaPresetAction} className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_60px_rgba(14,165,233,0.12)] backdrop-blur-xl">
                      <p className="font-cairo text-lg font-semibold text-white">Digital Security Camp (Qalandia)</p>
                      <p className="mt-2 font-tajawal text-sm leading-7 text-slate-300">
                        Youth-facing Training entry centered on social engineering awareness, safe browsing, and digital privacy habits.
                      </p>
                      <button
                        type="submit"
                        className="mt-4 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-cyan-400 px-4 py-2 font-tajawal text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 transition hover:brightness-110"
                      >
                        Add Qalandia Preset
                      </button>
                    </form>

                    <form action={addOpenUniversityPresetAction} className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_60px_rgba(248,113,113,0.12)] backdrop-blur-xl">
                      <p className="font-cairo text-lg font-semibold text-white">Al-Quds Open University</p>
                      <p className="mt-2 font-tajawal text-sm leading-7 text-slate-300">
                        Technical simulation-focused Training entry for phishing and email spoofing demos in a Digital Marketing context.
                      </p>
                      <button
                        type="submit"
                        className="mt-4 rounded-full bg-amber-400 px-4 py-2 font-tajawal text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 transition hover:brightness-110"
                      >
                        Add Spoofing Demo Preset
                      </button>
                    </form>
                  </div>
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="mb-6">
                    <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-slate-400">
                      Live JSON View
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">Portfolio Records</h2>
                  </div>

                  <div className="space-y-4">
                    {portfolioItems.map((item) => {
                      const updateAction = updatePortfolioItem.bind(null, lang, item.id);
                      const deleteAction = deletePortfolioItem.bind(null, lang, item.id);
                      const galleryInput = (item.gallery || []).join(', ');
                      const videoUrls = (item.videoLinks || []).map((link) => link.url).join('\n');

                      return (
                        <article
                          key={item.id}
                          className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                        >
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-cairo text-xl font-semibold text-white">
                                  {item.title}
                                </h3>
                                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-tajawal text-xs font-semibold uppercase tracking-[0.24em] text-slate-100">
                                  {item.category}
                                </span>
                              </div>
                              <p className="font-tajawal text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-2 font-tajawal text-xs text-slate-500 dark:text-slate-400">
                                <span>Gallery: {item.gallery.length}</span>
                                <span>Videos: {item.videoLinks.length}</span>
                                {item.tech_focus ? <span>Focus: {item.tech_focus}</span> : null}
                              </div>
                            </div>

                            <form action={deleteAction}>
                              <button
                                type="submit"
                                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 font-tajawal text-sm font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
                              >
                                Delete
                              </button>
                            </form>
                          </div>

                          <details className="mt-5 rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl">
                            <summary className="cursor-pointer font-tajawal text-sm font-semibold text-slate-200">
                              Edit Project
                            </summary>

                            <form action={updateAction} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div>
                                <FieldLabel>Project Title (EN)</FieldLabel>
                                <TextInput name="title_en" required defaultValue={item.title_en || ''} placeholder="English title" />
                              </div>
                              <div>
                                <FieldLabel>Project Title (AR)</FieldLabel>
                                <TextInput name="title_ar" required defaultValue={item.title_ar || ''} placeholder="عنوان عربي" />
                              </div>

                              <div>
                                <FieldLabel>Category</FieldLabel>
                                <select
                                  name="category"
                                  defaultValue={item.category}
                                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 font-tajawal text-sm text-white shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-30"
                                >
                                  {PORTFOLIO_CATEGORIES.map((category) => (
                                    <option key={category.value} value={category.value}>
                                      {category.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <FieldLabel>Cover Image Path</FieldLabel>
                                <TextInput name="cover_image_url" defaultValue={item.cover_image_url || ''} placeholder="/assets/images/portfolio/example.jpg" />
                              </div>

                              <div>
                                <FieldLabel>Challenge / Overview (EN)</FieldLabel>
                                <TextArea name="description_en" rows={3} defaultValue={item.description_en || ''} placeholder="English description" />
                              </div>
                              <div>
                                <FieldLabel>Challenge / Overview (AR)</FieldLabel>
                                <TextArea name="description_ar" rows={3} defaultValue={item.description_ar || ''} placeholder="الوصف بالعربية" />
                              </div>

                              <div>
                                <FieldLabel>Role Summary (EN)</FieldLabel>
                                <TextArea name="role_summary_en" rows={3} defaultValue={item.role_summary_en || ''} placeholder="English role summary" />
                              </div>
                              <div>
                                <FieldLabel>Role Summary (AR)</FieldLabel>
                                <TextArea name="role_summary_ar" rows={3} defaultValue={item.role_summary_ar || ''} placeholder="ملخص الدور بالعربية" />
                              </div>

                              <div>
                                <FieldLabel>Action Summary (EN)</FieldLabel>
                                <TextArea name="action_summary_en" rows={3} defaultValue={item.action_summary_en || ''} placeholder="English action summary" />
                              </div>
                              <div>
                                <FieldLabel>Action Summary (AR)</FieldLabel>
                                <TextArea name="action_summary_ar" rows={3} defaultValue={item.action_summary_ar || ''} placeholder="ملخص التنفيذ بالعربية" />
                              </div>

                              <div>
                                <FieldLabel>Result / Impact (EN)</FieldLabel>
                                <TextArea name="result_en" rows={3} defaultValue={item.result_en || ''} placeholder="English result" />
                              </div>
                              <div>
                                <FieldLabel>Result / Impact (AR)</FieldLabel>
                                <TextArea name="result_ar" rows={3} defaultValue={item.result_ar || ''} placeholder="النتيجة بالعربية" />
                              </div>

                              <div>
                                <FieldLabel>Technical Focus (EN)</FieldLabel>
                                <TextInput name="tech_focus_en" defaultValue={item.tech_focus_en || ''} placeholder="English technical focus" />
                              </div>
                              <div>
                                <FieldLabel>Technical Focus (AR)</FieldLabel>
                                <TextInput name="tech_focus_ar" defaultValue={item.tech_focus_ar || ''} placeholder="التركيز التقني بالعربية" />
                              </div>

                              <div className="md:col-span-2">
                                <FieldLabel>Gallery Image Paths</FieldLabel>
                                <TextArea name="gallery_input" rows={3} defaultValue={galleryInput} placeholder="/assets/images/portfolio/1.jpg, /assets/images/portfolio/2.jpg" />
                              </div>

                              <div className="md:col-span-2">
                                <FieldLabel>Video URLs</FieldLabel>
                                <TextArea name="video_urls" rows={3} defaultValue={videoUrls} placeholder="One URL per line" />
                              </div>

                              <button
                                type="submit"
                                className="md:col-span-2 rounded-2xl bg-sky-600 px-5 py-3 font-tajawal text-sm font-semibold text-white transition hover:bg-sky-500"
                              >
                                Update Project
                              </button>
                            </form>
                          </details>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className="space-y-8">
                <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-slate-400">
                    Schema Coverage
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">Supported Fields</h2>
                  <ul className="mt-5 space-y-3 font-tajawal text-sm leading-7 text-slate-300">
                    <li>Unified categories with Training as the only education/cyber-training lane.</li>
                    <li>Multi-image galleries stored as JSON for clean media expansion.</li>
                    <li>YouTube and Facebook video links stored separately from images.</li>
                    <li>Role, action, result, and technical focus for advanced showcase context.</li>
                  </ul>
                </section>

                <section id="lead-inbox" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    Contact Inbox
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">Recent Messages</h2>
                  <div className="mt-5 space-y-4">
                    {contactMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="rounded-[1.4rem] border border-white/10 bg-slate-950/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-cairo text-lg font-semibold text-white">
                              {msg.name}
                            </p>
                            <p className="font-tajawal text-sm text-slate-600 dark:text-slate-300">
                              {msg.email}
                            </p>
                            <p className="mt-1 font-tajawal text-xs uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
                              Service: {msg.service}
                            </p>
                          </div>
                          <p className="font-tajawal text-xs text-slate-500 dark:text-slate-400">
                            {formatStableDate(msg.created_at)}
                          </p>
                        </div>
                        {msg.phone ? (
                          <p className="mt-3 font-tajawal text-sm text-slate-500 dark:text-slate-400">
                            Phone: {msg.phone}
                          </p>
                        ) : null}
                        <p className="mt-4 rounded-2xl bg-slate-900/80 p-3 font-tajawal text-sm leading-7 text-slate-200">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
