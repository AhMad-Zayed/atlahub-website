import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, DollarSign, TrendingUp, Activity, BadgeCheck,
  Eye, EyeOff, ExternalLink, Clock, BarChart3, FileText,
  CheckCircle2, AlertCircle, RadioTower
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { markInvoicePaid, createInvoice } from '@/lib/services/invoices.service';
import { BLOCK_SCHEMAS } from '@/lib/services/blocks.schema';

export const dynamic = 'force-dynamic';

// ── Design tokens & helpers ────────────────────────────────────────────────

const STATUS_COLOR = {
  ACTIVE:    { ring: 'border-emerald-500/20 bg-emerald-500/5', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  PENDING:   { ring: 'border-amber-500/20  bg-amber-500/5',   badge: 'text-amber-400  bg-amber-500/10  border-amber-500/20' },
  PAUSED:    { ring: 'border-gray-600/20   bg-gray-500/5',    badge: 'text-gray-400   bg-gray-500/10   border-gray-500/20' },
  COMPLETED: { ring: 'border-sky-500/20    bg-sky-500/5',     badge: 'text-sky-400    bg-sky-500/10    border-sky-500/20' },
  FUNDED:    { ring: 'border-purple-500/20 bg-purple-500/5',  badge: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
};

const INVOICE_COLOR = {
  PAID:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  PENDING:   'text-amber-400  bg-amber-500/10  border-amber-500/20',
  OVERDUE:   'text-red-400    bg-red-500/10    border-red-500/20',
  CANCELLED: 'text-gray-500   bg-gray-500/10   border-gray-500/20',
};

function BurnBar({ paid, spent }) {
  if (!paid) return null;
  const pct = Math.min(100, Math.round((spent / paid) * 100));
  const isOver = spent > paid;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-mono text-gray-600">Burn Rate</span>
        <span className={`text-[11px] font-mono font-semibold ${isOver ? 'text-red-400' : 'text-gray-400'}`}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
        <div className={`h-full rounded-full ${isOver ? 'bg-red-500' : 'bg-[#6d28d9]'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MilestoneRow({ log }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#222] bg-[#0a0a0a]">
        <BadgeCheck size={9} className={log.isVisibleToClient ? 'text-[#6d28d9]' : 'text-gray-700'} />
      </div>
      <div className="flex-1 border-b border-[#111] pb-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-white">{log.action.replace(/_/g, ' ')}</p>
            {log.details && <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">{log.details}</p>}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {log.isVisibleToClient
              ? <span className="flex items-center gap-1 text-[10px] text-[#6d28d9]"><Eye size={9} />Client</span>
              : <span className="flex items-center gap-1 text-[10px] text-gray-700"><EyeOff size={9} />Internal</span>}
            <time className="font-mono text-[10px] text-gray-700">{new Date(log.createdAt).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockPreview({ block }) {
  const schema = BLOCK_SCHEMAS[block.type];
  if (!schema) return null;

  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] overflow-hidden">
      {/* OG Preview for MetaAds */}
      {block.type === 'MetaAds' && block.previewImage && (
        <div className="h-28 w-full bg-[#111]">
          <img src={block.previewImage} alt="Preview" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`text-[10px] font-mono uppercase font-semibold ${schema.color}`}>{schema.label}</span>
          {block.type === 'MetaAds' && block.postUrl && (
            <a href={block.postUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-gray-700 hover:text-gray-400">
              <ExternalLink size={10} />
            </a>
          )}
        </div>
        {block.type === 'MetaAds' && block.ogTitle && (
          <p className="text-xs font-medium text-white line-clamp-1 mb-0.5">{block.ogTitle}</p>
        )}
        {block.type === 'MetaAds' && block.ogDescription && (
          <p className="text-[11px] text-gray-500 line-clamp-2">{block.ogDescription}</p>
        )}
        {block.type === 'CyberAudit' && (
          <p className="text-xs text-gray-400">{block.targetDomain} · <span className="text-red-400">{block.securityLevel}</span></p>
        )}
        {block.type === 'Branding' && (
          <p className="text-xs text-gray-400">{block.brandName} · {block.revisionCount || '∞'} revisions</p>
        )}
        {block.type === 'Hosting' && (
          <p className="text-xs text-gray-400">{block.domain} · {block.plan}</p>
        )}
        {block.type === 'SSL' && (
          <p className="text-xs text-gray-400">{block.domain} · Exp: {block.expiresAt || '—'}</p>
        )}
        {typeof block.budget === 'number' && (
          <p className="mt-1 font-mono text-[11px] text-emerald-400">${Number(block.budget).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function ClientProfilePage({ params }) {
  const { lang, clientId } = await params;

  const client = await prisma.agencyClient.findUnique({
    where: { id: clientId },
    include: {
      campaigns: {
        include: {
          adItems:  { orderBy: { createdAt: 'desc' } },
          logs:     { orderBy: { createdAt: 'asc'  } },
          invoices: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
      },
      invoices:  { orderBy: { createdAt: 'desc' } },
      contracts: { orderBy: { renewsAt: 'asc'   } },
    },
  });

  if (!client) notFound();

  // Bind invoice server actions
  const markPaidAction   = markInvoicePaid;
  const createInvAction  = createInvoice.bind(null, { clientId });

  // Totals
  const totalSpent  = client.campaigns.reduce((s, c) => s + (c.actualPlatformSpend || 0), 0);
  const totalProfit = client.campaigns.reduce((s, c) => s + (c.profitMargin || 0), 0);
  const pendingInv  = client.invoices.filter(i => i.status === 'PENDING').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1e1e1e] pb-6">
        <div className="flex items-start gap-4">
          <Link href={`/${lang}/admin/clients`} className="mt-1 flex h-8 w-8 items-center justify-center rounded-md border border-[#222] text-gray-600 hover:border-[#333] hover:text-gray-300 transition-colors">
            <ArrowLeft size={14} />
          </Link>
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
        <span className="font-mono text-xs text-gray-700">ID: {clientId.slice(0, 8)}…</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Revenue',    value: `$${client.totalRevenue.toLocaleString()}`,  color: 'text-white',       icon: DollarSign },
          { label: 'Total Ad Spend',   value: `$${totalSpent.toLocaleString()}`,            color: 'text-amber-400',  icon: Activity   },
          { label: 'Net Profit',       value: `$${totalProfit.toLocaleString()}`,           color: 'text-emerald-400', icon: TrendingUp  },
          { label: 'Pending Invoices', value: `$${pendingInv.toLocaleString()}`,            color: pendingInv > 0 ? 'text-amber-400' : 'text-gray-600', icon: FileText },
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

      {/* Invoices */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-600">Invoices</h2>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-[#222] bg-[#111] px-3 py-1.5 text-xs text-gray-400 hover:bg-[#1a1a1a] hover:text-white">
              + New Invoice
            </summary>
            <div className="absolute right-0 top-9 z-10 w-72 rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-4 shadow-xl">
              <form action={async (fd) => {
                'use server';
                await createInvoice({
                  clientId,
                  campaignId: fd.get('campaignId') || null,
                  amount: fd.get('amount'),
                  description: fd.get('description'),
                  dueAt: fd.get('dueAt') || null,
                });
              }} className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Amount ($)</label>
                  <input name="amount" type="number" required min="1" step="0.01" placeholder="500.00"
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#6d28d9]" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Description</label>
                  <input name="description" placeholder="Meta Ads Campaign — April"
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Due Date</label>
                  <input name="dueAt" type="date"
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]" />
                </div>
                <button type="submit" className="w-full rounded-md bg-[#6d28d9] py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors">
                  Create Invoice
                </button>
              </form>
            </div>
          </details>
        </div>

        {client.invoices.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#2a2a2a] p-8 text-center text-sm text-gray-600">No invoices yet.</div>
        ) : (
          <div className="space-y-2">
            {client.invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border border-[#1e1e1e] bg-[#111] px-4 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-500">{inv.invoiceNumber}</span>
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase ${INVOICE_COLOR[inv.status] ?? INVOICE_COLOR.PENDING}`}>
                      {inv.status}
                    </span>
                  </div>
                  {inv.description && <p className="mt-0.5 text-xs text-gray-500">{inv.description}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-white">${inv.amount.toLocaleString()}</span>
                  {inv.status === 'PENDING' || inv.status === 'OVERDUE' ? (
                    <form action={async () => {
                      'use server';
                      await markInvoicePaid(inv.id);
                    }}>
                      <button type="submit" className="flex items-center gap-1 rounded-md border border-emerald-900/40 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-400 hover:bg-emerald-900/30 transition-colors">
                        <CheckCircle2 size={12} />Mark Paid
                      </button>
                    </form>
                  ) : inv.status === 'PAID' ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600">
                      <CheckCircle2 size={11} />{inv.paidAt ? new Date(inv.paidAt).toLocaleDateString() : 'Paid'}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Service Contracts */}
      {client.contracts.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">Service Contracts</h2>
          <div className="space-y-2">
            {client.contracts.map(contract => {
              const daysLeft = Math.ceil((new Date(contract.renewsAt) - new Date()) / (1000 * 60 * 60 * 24));
              const isExpiring = daysLeft <= 7;
              return (
                <div key={contract.id} className="flex items-center justify-between rounded-lg border border-[#1e1e1e] bg-[#111] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{contract.name}</p>
                    <p className="text-xs text-gray-500">${contract.amount}/period · {contract.autoRenew ? 'Auto-renews' : 'Manual renewal'}</p>
                  </div>
                  <span className={`font-mono text-xs ${isExpiring ? 'text-red-400' : 'text-gray-500'}`}>
                    {isExpiring ? `⚠ ${daysLeft}d left` : new Date(contract.renewsAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Campaign History with Service Blocks */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">Campaign History</h2>
        <div className="space-y-4">
          {client.campaigns.map(camp => {
            const colors = STATUS_COLOR[camp.status] ?? STATUS_COLOR.PENDING;
            const blocks = Array.isArray(camp.serviceBlocks) ? camp.serviceBlocks : [];

            return (
              <div key={camp.id} className={`rounded-xl border p-6 ${colors.ring}`}>
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start">

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-base font-semibold text-white">{camp.title}</h3>
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase ${colors.badge}`}>{camp.status}</span>
                    </div>

                    {/* Financials */}
                    <div className="grid grid-cols-3 gap-3 mb-4 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
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

                    {/* Service Blocks */}
                    {blocks.length > 0 && (
                      <div className="mt-5">
                        <p className="mb-3 text-[11px] uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                          <RadioTower size={11} />Service Blocks · {blocks.length}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {blocks.map(block => <BlockPreview key={block.id} block={block} />)}
                        </div>
                      </div>
                    )}

                    {/* Legacy Ad Items */}
                    {camp.adItems.length > 0 && blocks.length === 0 && (
                      <div className="mt-5">
                        <p className="mb-3 text-[11px] uppercase tracking-wider text-gray-600">Ad Links · {camp.adItems.length}</p>
                        <div className="flex flex-wrap gap-3">
                          {camp.adItems.map(ad => (
                            <div key={ad.id} className="rounded-md border border-[#222] bg-[#0a0a0a] p-3 max-w-[220px]">
                              {ad.previewImage && <img src={ad.previewImage} alt="" className="h-20 w-full rounded object-cover mb-2" />}
                              {ad.ogTitle && <p className="text-xs font-semibold text-white line-clamp-1">{ad.ogTitle}</p>}
                              <p className="text-[10px] font-mono text-[#6d28d9] truncate mt-0.5">{ad.postUrl}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Milestone Timeline */}
                  <div className="w-full xl:w-56 shrink-0">
                    <p className="mb-3 text-[11px] uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                      <Clock size={11} />Timeline
                    </p>
                    <div className="space-y-3">
                      {camp.logs.length === 0
                        ? <p className="text-[11px] text-gray-700">No milestones logged.</p>
                        : camp.logs.map(log => <MilestoneRow key={log.id} log={log} />)}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
