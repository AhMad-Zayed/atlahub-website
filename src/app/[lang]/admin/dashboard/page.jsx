import Link from 'next/link';
import {
  Server, Activity, LayoutDashboard, FolderKanban, MessageSquare, Users2, ShieldAlert,
  Settings, LogOut, ChevronRight, PlusCircle, MonitorPlay, BarChart3, Database, KeySquare, Map, PencilLine
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
import CreateEliteProjectModal from '@/components/Admin/CreateEliteProjectModal';
import UserJourneyMap from '@/components/Admin/UserJourneyMap';
import LiveSessionFeed from '@/components/Admin/LiveSessionFeed';

export const dynamic = 'force-dynamic';

function formatStableDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  return date.toUTCString();
}

function NeonCard({ children, title, subtitle, icon: Icon, className = '', headerRight }) {
  return (
    <div className={`rounded-xl border border-[#333] bg-[#161616] p-6 shadow-sm transition-all duration-200 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex gap-4">
            {Icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#333] bg-[#0c0c0c] text-slate-300">
                <Icon size={18} />
              </div>
            )}
            <div>
              {title && <h2 className="text-lg font-medium text-white tracking-tight">{title}</h2>}
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
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
      className="w-full rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm text-white shadow-sm outline-none transition-colors focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] placeholder:text-gray-600"
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
      className="w-full rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm text-white shadow-sm outline-none transition-colors focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] placeholder:text-gray-600"
    />
  );
}

function NeonButton({ children, type = "button", variant = "primary", className = "", disabled=false }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[#6d28d9] text-white hover:bg-purple-600",
    secondary: "bg-white text-black hover:bg-gray-200",
    accent: "bg-emerald-500 text-black hover:bg-emerald-400",
    ghost: "border border-[#333] bg-[#161616] text-white hover:bg-[#222]",
    danger: "border border-red-900/50 bg-red-950/20 text-red-500 hover:bg-red-900/40"
  };
  return (
    <button type={type} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const enContent = content.en || {};
  const arContent = content.ar || {};
  const portfolioItems = await getPortfolioItems();
  const contactMessages = await getContactMessages();

  // Logic Isolation - Kept exactly as original
  const totalSessions = await prisma.session.count();
  const leads = await prisma.event.count({ where: { type: { contains: 'lead', mode: 'insensitive' } } });
  const projectEngagement = await prisma.event.count({ where: { target: { contains: 'project', mode: 'insensitive' } } });
  const trendsByEvent = await prisma.event.groupBy({ by: ['type'], _count: { id: true } });
  const recentEvents = await prisma.event.findMany({ orderBy: { timestamp: 'desc' }, take: 20, include: { session: true } });
  const recentSessions = await prisma.session.findMany({ orderBy: { startTime: 'desc' }, take: 15, include: { events: true } });

  const analyticsSummary = {
    totals: { total_reach: totalSessions, project_engagement: projectEngagement, unique_identities: totalSessions, qualified_leads: leads },
    technicalInterestHeatmap: trendsByEvent.map((trend) => ({ section: trend.type, interactions: trend._count.id, clicks: 0, avg_dwell_seconds: 0 })),
    userJourneyTimeline: recentEvents.map((ev) => ({ created_at: ev.timestamp.toISOString(), visitor: ev.session?.ipHash?.slice(0, 8) || 'Anonymous', project: ev.target || 'Global', action: ev.type, dwell_ms: 0, source_host: ev.session?.referrer || 'direct' })),
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

  const NavItem = ({ href, icon: Icon, label }) => (
    <a href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#222] hover:text-white">
      <Icon size={16} />
      <span>{label}</span>
    </a>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0c0c0c] text-white font-sans selection:bg-[#6d28d9] selection:text-white">
      {/* Sidebar - Advanced Neon Concept */}
      <aside className="no-scrollbar flex w-[260px] shrink-0 flex-col overflow-y-auto border-r border-[#333] bg-[#0c0c0c]">
        <div className="flex h-16 shrink-0 items-center border-b border-[#333] px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-[#6d28d9] text-white flex items-center justify-center">
              <span className="font-bold text-xs leading-none">A</span>
            </div>
            <span className="font-semibold tracking-tight text-white">AtlaHub Console</span>
          </div>
        </div>
        
        <div className="mx-4 mt-6">
          <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-gray-500">Global Overview</div>
          <nav className="space-y-1">
            <NavItem href="#overview" icon={LayoutDashboard} label="Mission Control" />
            <NavItem href="#analytics" icon={BarChart3} label="Intelligence & Metrics" />
            <NavItem href="#inbox" icon={MessageSquare} label="Lead Inbox" />
          </nav>
        </div>

        <div className="mx-4 mt-8">
          <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-gray-500">Project Operations</div>
          <nav className="space-y-1">
            <NavItem href="#pipeline" icon={FolderKanban} label="Onboarding Pipeline" />
            <NavItem href="#portfolio" icon={MonitorPlay} label="Portfolio Manager" />
            <NavItem href="#presets" icon={Database} label="Showcase Presets" />
          </nav>
        </div>

        <div className="mx-4 mt-8 mb-6">
          <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-gray-500">System Config</div>
          <nav className="space-y-1">
            <NavItem href="#content" icon={PencilLine} label="Core JSON Content" />
            <NavItem href="#team" icon={Users2} label="Team Access" />
            <NavItem href="#profile" icon={Settings} label="Global Settings" />
          </nav>
        </div>

        <div className="mt-auto border-t border-[#333] p-4">
          <div className="flex items-center justify-between rounded-md bg-[#161616] p-3 border border-[#333]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs text-gray-400 font-mono">iad1 (US East)</span>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="text-gray-400 hover:text-white transition-colors" title="Logout">
                <LogOut size={14} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto w-full bg-[#0c0c0c] p-6 lg:p-10">
        <div className="mx-auto max-w-[1400px] space-y-10">
          
          {/* Header & Overview */}
          <div id="overview" className="flex flex-col gap-4 border-b border-[#333] pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Overview</h1>
              <p className="text-sm text-gray-400">Comprehensive dashboard for managing deployments, portfolios, and analytics.</p>
            </div>
            <div className="flex gap-2">
              <Link href="#pipeline" className="inline-flex items-center justify-center rounded-md border border-[#333] bg-[#161616] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#222]">
                New Pipeline Project
              </Link>
            </div>
          </div>

          {/* Stats Box System */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-[#333] bg-[#161616] p-5.5 px-6 py-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Reach</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-mono text-3xl font-medium text-white">{analyticsSummary.totals.total_reach}</p>
                <p className="text-xs text-emerald-400 font-mono">+12%</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#333] bg-[#161616] p-5.5 px-6 py-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Engagement</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-mono text-3xl font-medium text-white">{analyticsSummary.totals.project_engagement}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#333] bg-[#161616] p-5.5 px-6 py-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Identities</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-mono text-3xl font-medium text-white">{analyticsSummary.totals.unique_identities}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#333] bg-[#161616] p-5.5 px-6 py-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Quality Leads</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-mono text-3xl font-medium text-white">{analyticsSummary.totals.qualified_leads}</p>
              </div>
            </div>
          </div>

          {/* Analytics Modules */}
          <div id="analytics" className="grid gap-6 xl:grid-cols-3">
            <NeonCard className="xl:col-span-2" icon={Map} title="Journey Intelligence" subtitle="Live tracking across interactive components and models.">
               <UserJourneyMap summary={analyticsSummary} />
            </NeonCard>
            
            <NeonCard icon={Activity} title="Live Feed" subtitle="Real-time geographic stream">
               <LiveSessionFeed sessions={recentSessions} />
            </NeonCard>
          </div>

          {/* Pipeline Management */}
          <NeonCard id="pipeline" icon={FolderKanban} title="Onboarding Pipeline" subtitle="Secure client tracking and phase management" headerRight={<CreateEliteProjectModal />}>
            <div className="rounded-lg border border-[#333] bg-[#0c0c0c] p-5 mb-6">
              <form action={createOnboardingProjectAction} className="grid gap-4 lg:grid-cols-4 items-end">
                <div>
                  <FieldLabel>Project Name</FieldLabel>
                  <TextInput name="project_title" placeholder="Acme Inc Rebrand" />
                </div>
                <div>
                  <FieldLabel>Client Name</FieldLabel>
                  <TextInput name="client_name" placeholder="Acme Inc" />
                </div>
                <div>
                  <FieldLabel>Flow Type</FieldLabel>
                  <select name="project_type" className="w-full rounded-md border border-[#333] bg-[#161616] px-3 py-2.5 text-sm text-white shadow-sm outline-none transition-colors focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]">
                    <option value="CLIENT_SERVICES">Client Services</option>
                    <option value="VISUAL_ID">Visual Identity</option>
                    <option value="PROPOSAL">Workshop Proposal</option>
                  </select>
                </div>
                <NeonButton type="submit" variant="primary">Generate Pipeline</NeonButton>
              </form>
            </div>

            <div className="space-y-4">
              {onboardingProjects.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#444] p-8 text-center text-sm text-gray-500">
                  No active pipelines. Create one above to begin.
                </div>
              ) : (
                onboardingProjects.map((project) => {
                  const progressCount = [ project.submission?.step1_soul, project.submission?.step2_market, project.submission?.step3_visual, (project.submission?.step4_media || []).length ? 'filled' : '', project.submission?.step5_summary ].filter(Boolean).length;
                  const progress = Math.round((progressCount / 5) * 100);
                  const activeToken = project.tokens?.find(c => c?.is_active && new Date(c.expires_at) > new Date());
                  const onboardingToken = activeToken || project.tokens?.[0] || null;
                  
                  const formatMetadata = (meta) => {
                    if (!meta) return '';
                    try { const obj = typeof meta === 'string' ? JSON.parse(meta) : meta; return obj.message || obj.title ? `${obj.message || ''} ${obj.title || ''}`.trim() : JSON.stringify(obj); } catch { return String(meta); }
                  };

                  const unifiedEvents = [
                    ...(project.activityLogs || []).map(log => ({ id: `al-${log.id}`, createdAt: log.createdAt, title: log.action, description: formatMetadata(log.metadata), actor: log.actorRole })),
                    ...(project.collaboratorNotes || []).map(note => ({ id: `cn-${note.id}`, createdAt: note.createdAt, title: 'Collaborator Note', description: note.content, actor: note.author })),
                    ...(project.deliverables || []).flatMap(d => (d.comments || []).map(c => ({ id: `dc-${c.id}`, createdAt: c.createdAt, title: `Comment on ${d.title}`, description: c.comment, actor: c.author })))
                  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                  return (
                    <div key={project.id} className="rounded-xl border border-[#333] bg-[#0c0c0c] overflow-hidden">
                      <div className="p-5 border-b border-[#333] flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-white">{project.title}</h3>
                            <span className="rounded-md bg-[#222] px-2 py-0.5 font-mono text-[10px] uppercase text-gray-400">{project.status}</span>
                          </div>
                          <p className="text-sm text-gray-400">Client: <span className="text-white">{project.client_name}</span></p>
                        </div>
                        <div className="flex flex-col items-end gap-1 font-mono text-xs text-gray-400">
                          {onboardingToken ? (
                            <>
                              <div className="flex items-center gap-2"><span>Link:</span><CopyOnboardingLink lang={lang} token={onboardingToken.id} /></div>
                              <p className={onboardingToken.is_active ? 'text-emerald-400' : 'text-red-400'}>{onboardingToken.is_active ? 'Live' : 'Expired'} · Ex: {new Date(onboardingToken.expires_at).toLocaleDateString()}</p>
                            </>
                          ) : <p>No Active Token</p>}
                        </div>
                      </div>
                      
                      <div className="bg-[#161616] p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="font-mono text-xs text-gray-400">Pipeline Completion</p>
                          <p className="font-mono text-xs font-semibold text-white">{progress}%</p>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0c0c0c] border border-[#333]">
                          <div className="h-full bg-[#6d28d9] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                        </div>
                        
                        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#333] pt-5">
                          <ProjectManagementPanel project={project} updateAction={updateProjectAction} deleteAction={deleteProjectAction} changeStatusAction={changeProjectStatusAction} />
                          <form action={regenerateTokenAction}>
                            <input type="hidden" name="token" value={onboardingToken?.id || ''} />
                            <NeonButton type="submit" disabled={!onboardingToken} variant="ghost" className="h-8 text-xs">Refresh Token</NeonButton>
                          </form>
                          {project.status === 'Review' && (
                            <form action={requestRevisionAction}>
                              <input type="hidden" name="projectId" value={project.id} />
                              <NeonButton type="submit" variant="ghost" className="border-amber-900/50 text-amber-500 hover:bg-amber-900/10 h-8 text-xs">Request Revision</NeonButton>
                            </form>
                          )}
                          <form action={promoteOnboardingProjectAction}>
                            <input type="hidden" name="projectId" value={project.id} />
                            <NeonButton type="submit" variant="ghost" className="border-emerald-900/50 text-emerald-500 hover:bg-emerald-900/10 h-8 text-xs">Publish to Portfolio</NeonButton>
                          </form>
                        </div>
                        
                        <div className="mt-5">
                           <AdminProjectManager lang={lang} projectId={project.id} projectType={project.type} />
                        </div>
                        
                        {unifiedEvents.length > 0 && (
                          <details className="mt-4 px-2">
                             <summary className="cursor-pointer text-xs font-mono text-gray-500 hover:text-gray-300">View Audit Log ({unifiedEvents.length})</summary>
                             <div className="mt-4 border-l border-[#333] pl-4"><UnifiedTimeline events={unifiedEvents} /></div>
                          </details>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </NeonCard>

          {/* Portfolio Management */}
          <NeonCard id="portfolio" icon={MonitorPlay} title="Portfolio Registry" subtitle="Manage public case studies and capabilities">
             <details className="mb-6 rounded-lg border border-[#333] bg-[#0c0c0c]">
                <summary className="cursor-pointer p-4 text-sm font-medium text-white hover:bg-[#111]">Create New Portfolio Entry</summary>
                <div className="border-t border-[#333] p-5">
                   <form action={addItemAction} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div><FieldLabel>Title (EN)</FieldLabel><TextInput name="title_en" required /></div>
                      <div><FieldLabel>Title (AR)</FieldLabel><TextInput name="title_ar" required /></div>
                      <div><FieldLabel>Category</FieldLabel>
                        <select name="category" className="w-full rounded-md border border-[#333] bg-[#161616] px-3 py-2.5 text-sm text-white outline-none">
                          {PORTFOLIO_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div><FieldLabel>Cover Image URL</FieldLabel><TextInput name="cover_image_url" /></div>
                      <div><FieldLabel>Description (EN)</FieldLabel><TextArea name="description_en" rows={2} /></div>
                      <div><FieldLabel>Description (AR)</FieldLabel><TextArea name="description_ar" rows={2} /></div>
                      <div className="md:col-span-2">
                        <NeonButton type="submit" variant="primary">Add to Registry</NeonButton>
                      </div>
                   </form>
                </div>
             </details>

             <div className="space-y-3">
               {portfolioItems.map(item => (
                 <div key={item.id} className="rounded-lg border border-[#333] bg-[#0c0c0c] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                         <span className="font-mono text-xs text-gray-500">{item.id.slice(0,6)}</span>
                         <h4 className="text-sm font-medium text-white tracking-wide">{item.title}</h4>
                      </div>
                      <span className="text-xs text-emerald-500/80 mt-1 inline-block border border-emerald-900/30 bg-emerald-950/20 px-2 py-0.5 rounded">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <form action={deletePortfolioItem.bind(null, lang, item.id)}>
                        <NeonButton type="submit" variant="danger" className="h-8 px-3 text-xs">Delete</NeonButton>
                      </form>
                    </div>
                 </div>
               ))}
             </div>
          </NeonCard>
          
          <div className="grid gap-6 md:grid-cols-2">
             <NeonCard id="inbox" icon={MessageSquare} title="Lead Inbox">
                {contactMessages.slice(0,5).map(msg => (
                  <div key={msg.id} className="mb-3 rounded-lg border border-[#333] bg-[#0c0c0c] p-4 last:mb-0">
                    <div className="flex justify-between items-start">
                       <div>
                         <p className="font-medium text-sm text-white">{msg.name}</p>
                         <p className="text-xs font-mono text-emerald-400">{msg.email}</p>
                       </div>
                       <span className="text-[10px] text-gray-500">{formatStableDate(msg.created_at)}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-300">{msg.message}</p>
                  </div>
                ))}
             </NeonCard>

             <NeonCard id="presets" icon={Database} title="Showcase Injectors" subtitle="Auto-gen standard packages">
                <div className="space-y-4">
                  <form action={addQalandiaPresetAction} className="rounded-lg border border-[#333] bg-[#0c0c0c] p-4">
                     <h4 className="text-sm font-medium text-white mb-1">Cyber Camp (Qalandia)</h4>
                     <p className="text-xs text-gray-400 mb-3">Social engineering awareness curriculum</p>
                     <NeonButton type="submit" variant="ghost" className="w-full text-xs">Inject Package</NeonButton>
                  </form>
                  <form action={addOpenUniversityPresetAction} className="rounded-lg border border-[#333] bg-[#0c0c0c] p-4">
                     <h4 className="text-sm font-medium text-white mb-1">Spoofing Simulation (Al-Quds)</h4>
                     <p className="text-xs text-gray-400 mb-3">Phishing simulation infrastructure</p>
                     <NeonButton type="submit" variant="ghost" className="w-full text-xs">Inject Package</NeonButton>
                  </form>
                </div>
             </NeonCard>
          </div>

          <NeonCard id="content" icon={PencilLine} title="Core Site JSON Editor" subtitle="Direct writes to src/data/content.json">
            <details className="rounded-lg border border-[#333] bg-[#0c0c0c] overflow-hidden">
                <summary className="cursor-pointer p-4 text-sm font-medium text-white hover:bg-[#111]">Expand Editor Interface</summary>
                <div className="border-t border-[#333] p-5">
                   <form action={updateSiteAction} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                       <div><FieldLabel>Hero Action (EN)</FieldLabel><TextInput name="hero_cta_primary_en" defaultValue={enContent.hero?.ctaPrimary} /></div>
                       <div><FieldLabel>Hero Action (AR)</FieldLabel><TextInput name="hero_cta_primary_ar" defaultValue={arContent.hero?.ctaPrimary} /></div>
                       <div className="md:col-span-2"><NeonButton type="submit" variant="secondary">Commit to JSON</NeonButton></div>
                   </form>
                </div>
            </details>
          </NeonCard>

          <NeonCard id="team" title="Team Access & Security">
             <TeamSettingsPanel users={adminUsers} createAction={createAdminUserAction} updateAction={updateAdminUserAction} deleteAction={deleteAdminUserAction} />
          </NeonCard>
          
          <NeonCard id="profile" title="Global Profile">
             <ProfileSettingsPanel user={currentAdminUser} updateAction={updateMyProfileAction} />
          </NeonCard>

        </div>
      </main>
    </div>
  );
}
