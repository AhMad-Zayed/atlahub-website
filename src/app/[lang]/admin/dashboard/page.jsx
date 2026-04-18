import Link from 'next/link';
import {
  TrendingUp, Users, MessageSquare, FolderKanban,
  MonitorPlay, PencilLine, Database, DollarSign,
  AlertTriangle, CheckCircle2, Clock, PlusCircle,
} from 'lucide-react';
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

export const dynamic = 'force-dynamic';

// ── Utilities ──────────────────────────────────────────────────────────────

function formatStableDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Design System ──────────────────────────────────────────────────────────

function NeonCard({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-[#1e1e1e] bg-[#111] p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function FieldLabel({ children }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">{children}</label>;
}

function TextInput({ name, placeholder, required = false, defaultValue = '' }) {
  return (
    <input
      name={name} defaultValue={defaultValue} placeholder={placeholder} required={required}
      className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] placeholder:text-gray-700"
    />
  );
}

function TextArea({ name, placeholder, rows = 3, defaultValue = '' }) {
  return (
    <textarea
      name={name} defaultValue={defaultValue} placeholder={placeholder} rows={rows}
      className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] placeholder:text-gray-700"
    />
  );
}

function PrimaryButton({ children, type = 'submit', className = '' }) {
  return (
    <button type={type} className={`inline-flex items-center gap-2 rounded-md bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors ${className}`}>
      {children}
    </button>
  );
}

function GhostButton({ children, type = 'submit', className = '' }) {
  return (
    <button type={type} className={`inline-flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors ${className}`}>
      {children}
    </button>
  );
}

function DangerButton({ children, type = 'submit', className = '' }) {
  return (
    <button type={type} className={`inline-flex items-center gap-2 rounded-md border border-red-900/40 bg-red-950/20 px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors ${className}`}>
      {children}
    </button>
  );
}

// ── Home: Revenue Command Center ────────────────────────────────────────────

async function RevenueCommandCenter({ contactMessages, onboardingProjects }) {
  // Real revenue from campaigns this calendar month
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const monthlyRevenue = await prisma.agencyCampaign.aggregate({
    _sum: { totalClientPaid: true },
    where: { createdAt: { gte: monthStart } },
  });

  const mrr = monthlyRevenue._sum.totalClientPaid ?? 0;
  const goal = 2000;
  const pct = Math.min(100, Math.round((mrr / goal) * 100));

  // Active clients
  const activeClients = await prisma.agencyClient.count({
    where: { campaigns: { some: { status: 'ACTIVE' } } },
  });

  // Expiring tokens (next 7 days)
  const expiryThreshold = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const expiringTokens = await prisma.secureToken.count({
    where: { is_active: true, expires_at: { lte: expiryThreshold } },
  });

  const pendingProjects = onboardingProjects.filter(p => ['SUBMITTED', 'UNDER_REVIEW'].includes(p.lifecycleStatus)).length;
  const unreadMessages = contactMessages.length;

  return (
    <div className="space-y-6">
      {/* MRR Goal Bar */}
      <NeonCard>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Monthly Revenue</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold text-white">${mrr.toLocaleString()}</span>
              <span className="text-sm text-gray-500">/ ${goal.toLocaleString()} goal</span>
            </div>
          </div>
          <div className={`rounded-md border px-3 py-1 font-mono text-sm font-semibold ${pct >= 100 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-[#2a2a2a] bg-[#0a0a0a] text-gray-300'}`}>
            {pct}%
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
          <div className={`h-full rounded-full transition-all duration-700 ${pct >= 100 ? 'bg-emerald-500' : 'bg-[#6d28d9]'}`} style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-gray-600">{pct >= 100 ? '✓ Goal reached this month' : `$${(goal - mrr).toLocaleString()} remaining to hit $${goal.toLocaleString()}/mo`}</p>
      </NeonCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Active Clients',   value: activeClients,   icon: Users,        color: 'text-sky-400',     href: './clients' },
          { label: 'Pending Reviews',  value: pendingProjects, icon: FolderKanban, color: 'text-amber-400',   href: '#pipeline' },
          { label: 'Unread Messages',  value: unreadMessages,  icon: MessageSquare,color: 'text-purple-400',  href: '#inbox' },
          { label: 'Expiring Tokens',  value: expiringTokens,  icon: AlertTriangle, color: expiringTokens > 0 ? 'text-red-400' : 'text-gray-500', href: '#pipeline' },
        ].map(s => (
          <a key={s.label} href={s.href} className="group rounded-xl border border-[#1e1e1e] bg-[#111] p-5 hover:border-[#2a2a2a] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{s.label}</p>
              <s.icon size={13} className="text-gray-700 group-hover:text-gray-500 transition-colors" />
            </div>
            <p className={`font-mono text-2xl font-medium ${s.color}`}>{s.value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const enContent = content.en || {};
  const arContent = content.ar || {};
  const portfolioItems = await getPortfolioItems();
  const contactMessages = await getContactMessages();
  const onboardingProjects = await getPipelineProjects();
  const adminUsers = await getAdminUsers(lang);
  const currentAdminUser = await getCurrentAdminUser(lang);

  // Bind server actions
  const updateSiteAction         = updateSiteSections.bind(null, lang);
  const addItemAction            = addPortfolioItem.bind(null, lang);
  const createOnboardingAction   = createOnboardingProject.bind(null, lang);
  const promoteAction            = promoteOnboardingProject.bind(null, lang);
  const regenerateTokenAction    = regenerateOnboardingTokenAction.bind(null, lang);
  const requestRevisionAction    = requestOnboardingRevisionAction.bind(null, lang);
  const updateProjectAction      = updateProjectDetails.bind(null, lang);
  const deleteProjectAction      = deleteProjectById.bind(null, lang);
  const changeProjectStatusAction= changeProjectStatus.bind(null, lang);
  const updateMyProfileAction    = updateMyProfile.bind(null, lang);
  const createAdminUserAction    = createAdminUser.bind(null, lang);
  const updateAdminUserAction    = updateAdminUser.bind(null, lang);
  const deleteAdminUserAction    = deleteAdminUser.bind(null, lang);

  return (
    <div className="space-y-12">

      {/* ── Overview ── */}
      <div className="border-b border-[#1e1e1e] pb-6">
        <h1 className="text-xl font-semibold tracking-tight text-white">Mission Control</h1>
        <p className="mt-1 text-sm text-gray-500">Revenue overview, pipeline status, and lead inbox.</p>
      </div>

      <RevenueCommandCenter contactMessages={contactMessages} onboardingProjects={onboardingProjects} />

      {/* ── Pipeline ── */}
      <section id="pipeline">
        <SectionHeader title="Onboarding Pipeline" subtitle="Client project tracking and secure token management" />

        {/* Create form */}
        <NeonCard className="mb-6">
          <form action={createOnboardingAction} className="grid gap-4 sm:grid-cols-4 items-end">
            <div>
              <FieldLabel>Project Name</FieldLabel>
              <TextInput name="project_title" placeholder="Acme Rebrand" required />
            </div>
            <div>
              <FieldLabel>Client Name</FieldLabel>
              <TextInput name="client_name" placeholder="Acme Inc" required />
            </div>
            <div>
              <FieldLabel>Type</FieldLabel>
              <select name="project_type" className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]">
                <option value="CLIENT_SERVICES">Client Services</option>
                <option value="VISUAL_ID">Visual Identity</option>
                <option value="PROPOSAL">Proposal</option>
              </select>
            </div>
            <PrimaryButton type="submit"><PlusCircle size={14} />Create Pipeline</PrimaryButton>
          </form>
        </NeonCard>

        {/* Project list */}
        <div className="space-y-3">
          {onboardingProjects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#2a2a2a] p-10 text-center text-sm text-gray-600">
              No active pipelines. Create one above.
            </div>
          ) : onboardingProjects.map((project) => {
            const progressCount = [
              project.submission?.step1_soul,
              project.submission?.step2_market,
              project.submission?.step3_visual,
              (project.submission?.step4_media || []).length ? 'filled' : '',
              project.submission?.step5_summary,
            ].filter(Boolean).length;
            const progress = Math.round((progressCount / 5) * 100);
            const onboardingToken = project.tokens?.find(t => t?.is_active && new Date(t.expires_at) > new Date()) || project.tokens?.[0] || null;

            const formatMetadata = (meta) => {
              if (!meta) return '';
              try {
                const obj = typeof meta === 'string' ? JSON.parse(meta) : meta;
                return obj.message || obj.title ? `${obj.message || ''} ${obj.title || ''}`.trim() : JSON.stringify(obj);
              } catch { return String(meta); }
            };

            const unifiedEvents = [
              ...(project.activityLogs || []).map(log => ({ id: `al-${log.id}`, createdAt: log.createdAt, title: log.action, description: formatMetadata(log.metadata), actor: log.actorRole })),
              ...(project.collaboratorNotes || []).map(note => ({ id: `cn-${note.id}`, createdAt: note.createdAt, title: 'Collaborator Note', description: note.content, actor: note.author })),
              ...(project.deliverables || []).flatMap(d => (d.comments || []).map(c => ({ id: `dc-${c.id}`, createdAt: c.createdAt, title: `Comment on ${d.title}`, description: c.comment, actor: c.author }))),
            ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            return (
              <div key={project.id} className="rounded-xl border border-[#1e1e1e] bg-[#0a0a0a] overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#1e1e1e]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                      <span className="rounded bg-[#1a1a1a] border border-[#2a2a2a] px-1.5 py-0.5 font-mono text-[10px] uppercase text-gray-500">
                        {project.lifecycleStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Client: {project.client_name}</p>
                  </div>
                  {onboardingToken ? (
                    <div className="text-right flex flex-col items-end gap-1">
                      <CopyOnboardingLink lang={lang} token={onboardingToken.id} />
                      <span className={`text-[10px] font-mono ${onboardingToken.is_active ? 'text-emerald-500' : 'text-red-400'}`}>
                        {onboardingToken.is_active ? 'Active' : 'Expired'} · Exp: {formatStableDate(onboardingToken.expires_at)}
                      </span>
                    </div>
                  ) : <span className="text-xs text-gray-600">No token</span>}
                </div>

                <div className="p-5">
                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                      <span>Client completion</span><span className="font-mono">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
                      <div className="h-full bg-[#6d28d9] transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 border-t border-[#1a1a1a] pt-4">
                    <ProjectManagementPanel project={project} updateAction={updateProjectAction} deleteAction={deleteProjectAction} changeStatusAction={changeProjectStatusAction} />
                    <form action={regenerateTokenAction}>
                      <input type="hidden" name="token" value={onboardingToken?.id || ''} />
                      <GhostButton type="submit" className="text-xs h-8">Refresh Token</GhostButton>
                    </form>
                    {project.lifecycleStatus === 'SUBMITTED' || project.lifecycleStatus === 'UNDER_REVIEW' ? (
                      <form action={requestRevisionAction}>
                        <input type="hidden" name="projectId" value={project.id} />
                        <GhostButton type="submit" className="text-xs h-8 border-amber-900/30 text-amber-500 hover:bg-amber-950/20">Request Revision</GhostButton>
                      </form>
                    ) : null}
                    <form action={promoteAction}>
                      <input type="hidden" name="projectId" value={project.id} />
                      <GhostButton type="submit" className="text-xs h-8 border-emerald-900/30 text-emerald-500 hover:bg-emerald-950/20">Publish to Portfolio</GhostButton>
                    </form>
                  </div>

                  <div className="mt-4">
                    <AdminProjectManager lang={lang} projectId={project.id} projectType={project.type} />
                  </div>

                  {unifiedEvents.length > 0 && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-xs font-mono text-gray-600 hover:text-gray-400">
                        View Audit Log ({unifiedEvents.length})
                      </summary>
                      <div className="mt-3 border-l border-[#1e1e1e] pl-4">
                        <UnifiedTimeline events={unifiedEvents} />
                      </div>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio">
        <SectionHeader title="Portfolio Registry" subtitle="Public case studies and capabilities" />

        <details className="mb-4">
          <summary className="cursor-pointer rounded-xl border border-[#1e1e1e] bg-[#111] px-5 py-3 text-sm font-medium text-white hover:bg-[#161616]">
            + Add New Portfolio Entry
          </summary>
          <div className="mt-2 rounded-xl border border-[#1e1e1e] bg-[#0a0a0a] p-5">
            <form action={addItemAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><FieldLabel>Title (EN)</FieldLabel><TextInput name="title_en" required /></div>
              <div><FieldLabel>Title (AR)</FieldLabel><TextInput name="title_ar" required /></div>
              <div>
                <FieldLabel>Category</FieldLabel>
                <select name="category" className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none">
                  {PORTFOLIO_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div><FieldLabel>Cover Image URL</FieldLabel><TextInput name="cover_image_url" /></div>
              <div><FieldLabel>Description (EN)</FieldLabel><TextArea name="description_en" /></div>
              <div><FieldLabel>Description (AR)</FieldLabel><TextArea name="description_ar" /></div>
              <div className="sm:col-span-2"><PrimaryButton type="submit">Add Entry</PrimaryButton></div>
            </form>
          </div>
        </details>

        <div className="space-y-2">
          {portfolioItems.map(item => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#1e1e1e] bg-[#111] px-5 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-gray-600">{String(item.id).slice(0, 6)}</span>
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                </div>
                <span className="text-[11px] text-emerald-500/70">#{item.category}</span>
              </div>
              <form action={deletePortfolioItem.bind(null, lang, item.id)}>
                <DangerButton type="submit" className="text-xs h-8">Delete</DangerButton>
              </form>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lead Inbox ── */}
      <section id="inbox">
        <SectionHeader title="Lead Inbox" subtitle={`${contactMessages.length} message${contactMessages.length !== 1 ? 's' : ''}`} />
        <div className="space-y-3">
          {contactMessages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#2a2a2a] p-8 text-center text-sm text-gray-600">No messages yet.</div>
          ) : contactMessages.slice(0, 8).map((msg) => (
            <div key={msg.id} className="rounded-xl border border-[#1e1e1e] bg-[#111] p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{msg.name}</p>
                  <p className="text-xs font-mono text-[#6d28d9]">{msg.email}</p>
                  <p className="text-[11px] uppercase tracking-wide text-gray-500 mt-0.5">Service: {msg.service}</p>
                </div>
                <time className="text-[11px] font-mono text-gray-600 shrink-0">{formatStableDate(msg.created_at)}</time>
              </div>
              <p className="rounded-lg bg-[#0a0a0a] p-3 text-sm text-gray-300 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Site Content Editor ── */}
      <section id="content">
        <SectionHeader title="Site Content Editor" subtitle="Edit public-facing text in content.json" />
        <details className="rounded-xl border border-[#1e1e1e] overflow-hidden">
          <summary className="cursor-pointer bg-[#111] px-5 py-3 text-sm font-medium text-white hover:bg-[#161616]">
            Expand Editor
          </summary>
          <div className="border-t border-[#1e1e1e] bg-[#0a0a0a] p-5">
            <form action={updateSiteAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><FieldLabel>Hero CTA (EN)</FieldLabel><TextInput name="hero_cta_primary_en" defaultValue={enContent.hero?.ctaPrimary} /></div>
              <div><FieldLabel>Hero CTA (AR)</FieldLabel><TextInput name="hero_cta_primary_ar" defaultValue={arContent.hero?.ctaPrimary} /></div>
              <div className="sm:col-span-2"><PrimaryButton type="submit">Save Content</PrimaryButton></div>
            </form>
          </div>
        </details>
      </section>

      {/* ── Team & Profile ── */}
      <section id="team">
        <SectionHeader title="Team Access" />
        <NeonCard><TeamSettingsPanel users={adminUsers} createAction={createAdminUserAction} updateAction={updateAdminUserAction} deleteAction={deleteAdminUserAction} /></NeonCard>
      </section>

      <section id="profile">
        <SectionHeader title="My Profile" />
        <NeonCard><ProfileSettingsPanel user={currentAdminUser} updateAction={updateMyProfileAction} /></NeonCard>
      </section>

    </div>
  );
}
