import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import {
  ArrowLeft, DollarSign, TrendingUp, Activity, BadgeCheck,
  Eye, EyeOff, ExternalLink, Clock, BarChart3
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_COLOR = {
  ACTIVE:    { ring: 'border-emerald-500/30 bg-emerald-500/5', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  PENDING:   { ring: 'border-amber-500/20  bg-amber-500/5',   badge: 'text-amber-400  bg-amber-500/10  border-amber-500/20' },
  PAUSED:    { ring: 'border-gray-600/30   bg-gray-500/5',    badge: 'text-gray-400   bg-gray-500/10   border-gray-500/20' },
  COMPLETED: { ring: 'border-sky-500/30    bg-sky-500/5',     badge: 'text-sky-400    bg-sky-500/10    border-sky-500/20' },
};

function BurnBar({ paid, spent }) {
  if (!paid) return null;
  const pct = Math.min(100, Math.round((spent / paid) * 100));
  const isOver = spent > paid;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-mono text-gray-500">Burn Rate</span>
        <span className={`text-[11px] font-mono font-semibold ${isOver ? 'text-red-400' : 'text-gray-300'}`}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e1e1e]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : 'bg-[#6d28d9]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OGPreviewCard({ ad }) {
  return (
    <div className="rounded-md border border-[#222] bg-[#0a0a0a] overflow-hidden max-w-[260px]">
      {ad.previewImage && (
        <div className="h-32 w-full bg-[#111]">
          <img src={ad.previewImage} alt="Ad preview" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <p className="text-[10px] font-mono text-[#6d28d9] truncate">{ad.postUrl}</p>
        {ad.ogTitle && <p className="mt-1 text-xs font-semibold text-white line-clamp-2">{ad.ogTitle}</p>}
        {ad.ogDescription && <p className="mt-1 text-[11px] text-gray-500 line-clamp-2">{ad.ogDescription}</p>}
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${
            ad.status === 'ACTIVE'   ? 'text-emerald-400 border-emerald-900/50 bg-emerald-950/30' :
            ad.status === 'APPROVED' ? 'text-sky-400     border-sky-900/50     bg-sky-950/30'     :
                                       'text-gray-500    border-gray-700/40    bg-gray-900/30'
          }`}>{ad.status}</span>
          <span className="text-[10px] font-mono text-gray-600">${ad.itemBudget}</span>
          <a href={ad.postUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-gray-600 hover:text-gray-300">
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

function MilestoneRow({ log, showAll }) {
  if (!showAll && !log.isVisibleToClient) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#222] bg-[#111]">
        <BadgeCheck size={11} className={log.isVisibleToClient ? 'text-[#6d28d9]' : 'text-gray-700'} />
      </div>
      <div className="flex-1 border-b border-[#1a1a1a] pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-white">{log.action.replace(/_/g, ' ')}</p>
            {log.details && <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">{log.details}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {log.isVisibleToClient
              ? <span className="flex items-center gap-1 text-[10px] text-[#6d28d9]"><Eye size={10} />Client</span>
              : <span className="flex items-center gap-1 text-[10px] text-gray-700"><EyeOff size={10} />Internal</span>
            }
            <time className="font-mono text-[10px] text-gray-700">
              {new Date(log.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ClientProfilePage({ params }) {
  const { lang, clientId } = await params;

  const client = await prisma.agencyClient.findUnique({
    where: { id: clientId },
    include: {
      campaigns: {
        include: {
          adItems: { orderBy: { createdAt: 'desc' } },
          logs:    { orderBy: { createdAt: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!client) notFound();

  const lifetimeValue = client.campaigns.reduce((s, c) => s + (c.totalClientPaid || 0), 0);
  const totalSpent    = client.campaigns.reduce((s, c) => s + (c.actualPlatformSpend || 0), 0);
  const totalProfit   = client.campaigns.reduce((s, c) => s + (c.profitMargin || 0), 0);
  const allLogs       = client.campaigns.flatMap(c => c.logs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1e1e1e] pb-6">
        <div className="flex items-start gap-4">
          <Link href={`/${lang}/admin/clients`} className="mt-1 flex h-8 w-8 items-center justify-center rounded-md border border-[#222] text-gray-600 hover:border-[#333] hover:text-gray-300 transition-colors">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#222] bg-[#111] font-mono text-lg font-bold text-[#6d28d9]">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white">{client.name}</h1>
                <p className="text-sm text-gray-500">{client.primaryContact} · {client.preferredCurrency}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="font-mono text-xs text-gray-700">ID: {client.id.slice(0, 8)}...</div>
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Lifetime Value',   value: `$${lifetimeValue.toLocaleString()}`,  color: 'text-white',       icon: DollarSign },
          { label: 'Total Ad Spend',   value: `$${totalSpent.toLocaleString()}`,     color: 'text-amber-400',  icon: Activity },
          { label: 'Net Profit',       value: `$${totalProfit.toLocaleString()}`,    color: 'text-emerald-400', icon: TrendingUp },
          { label: 'Campaigns',        value: client.campaigns.length,               color: 'text-sky-400',     icon: BarChart3 },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-[#1e1e1e] bg-[#111] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{s.label}</p>
              <s.icon size={13} className="text-gray-700" />
            </div>
            <p className={`font-mono text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Campaign History */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">Campaign History</h2>
        <div className="space-y-4">
          {client.campaigns.map(camp => {
            const colors = STATUS_COLOR[camp.status] ?? STATUS_COLOR.PENDING;
            return (
              <div key={camp.id} className={`rounded-xl border p-6 ${colors.ring}`}>
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start">

                  {/* Campaign header */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-base font-semibold text-white">{camp.title}</h3>
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase ${colors.badge}`}>{camp.status}</span>
                    </div>

                    {/* Budget */}
                    <div className="grid grid-cols-3 gap-4 mb-4 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Approved</p>
                        <p className="font-mono text-sm font-medium text-white">${camp.totalClientPaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Spent</p>
                        <p className="font-mono text-sm font-medium text-amber-400">${camp.actualPlatformSpend.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Profit</p>
                        <p className={`font-mono text-sm font-medium ${camp.profitMargin >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          ${camp.profitMargin.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <BurnBar paid={camp.totalClientPaid} spent={camp.actualPlatformSpend} />

                    {/* Ad Links with OG Previews */}
                    {camp.adItems.length > 0 && (
                      <div className="mt-5">
                        <p className="mb-3 text-[11px] uppercase tracking-wider text-gray-600">Ad Archive — {camp.adItems.length} links</p>
                        <div className="flex flex-wrap gap-3">
                          {camp.adItems.map(ad => (
                            <OGPreviewCard key={ad.id} ad={ad} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Milestone sidebar */}
                  <div className="w-full xl:w-64 shrink-0">
                    <p className="mb-3 text-[11px] uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                      <Clock size={11} />Milestones
                    </p>
                    <div className="space-y-3">
                      {camp.logs.length === 0 ? (
                        <p className="text-[11px] text-gray-700">No milestones logged yet.</p>
                      ) : (
                        camp.logs.map(log => (
                          <MilestoneRow key={log.id} log={log} showAll={true} />
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
