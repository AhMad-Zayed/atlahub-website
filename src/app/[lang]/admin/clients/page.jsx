import Link from 'next/link';
import prisma from '@/lib/prisma';
import { initialiseClient } from '@/lib/services/clients.service';
import { Users, TrendingUp, DollarSign, PlusCircle, ChevronRight, Activity, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_COLOR = {
  ACTIVE:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  PENDING:   'text-amber-400  bg-amber-500/10  border-amber-500/20',
  PAUSED:    'text-gray-400   bg-gray-500/10   border-gray-500/20',
  COMPLETED: 'text-sky-400    bg-sky-500/10    border-sky-500/20',
  FUNDED:    'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default async function ClientDirectoryPage({ params }) {
  const { lang } = await params;

  const clients = await prisma.agencyClient.findMany({
    include: {
      campaigns: {
        select: {
          id: true, status: true, totalClientPaid: true,
          profitMargin: true, createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      invoices: {
        where: { status: 'PENDING' },
        select: { amount: true },
      },
      contracts: {
        where: { renewsAt: { lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } },
        select: { id: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const enriched = clients.map(c => ({
    ...c,
    activeCount:     c.campaigns.filter(x => x.status === 'ACTIVE').length,
    latestStatus:    c.campaigns[0]?.status ?? 'PENDING',
    pendingInvoices: c.invoices.reduce((s, i) => s + i.amount, 0),
    expiringCount:   c.contracts.length,
  }));

  const aggregate = await prisma.agencyCampaign.aggregate({
    _sum: { totalClientPaid: true, actualPlatformSpend: true, profitMargin: true },
  });

  // New client initialisation via the atomic transaction service
  const initialiseAction = async (formData) => {
    'use server';
    await initialiseClient({
      name:             formData.get('name'),
      primaryContact:   formData.get('primaryContact'),
      preferredCurrency: formData.get('currency') || 'USD',
      campaignTitle:    formData.get('campaignTitle'),
    });
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1e1e1e] pb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Client Directory</h1>
          <p className="mt-1 text-sm text-gray-500">
            {clients.length} client{clients.length !== 1 ? 's' : ''} · Identity layer for all services and invoices
          </p>
        </div>

        {/* Quick Init Form */}
        <details className="relative">
          <summary className="cursor-pointer list-none inline-flex items-center gap-2 rounded-md bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors">
            <PlusCircle size={14} />Initialise Client
          </summary>
          <div className="absolute right-0 top-11 z-10 w-80 rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-5 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">New Client Initialisation</p>
            <form action={initialiseAction} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Client Name *</label>
                <input name="name" required placeholder="Tamer Beauty Center"
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Primary Contact *</label>
                <input name="primaryContact" required placeholder="tamer@example.com"
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">First Project Name</label>
                <input name="campaignTitle" placeholder="Discovery Campaign"
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Currency</label>
                <select name="currency"
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-[#6d28d9]">
                  <option value="USD">USD</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                  <option value="EGP">EGP</option>
                </select>
              </div>
              <button type="submit"
                className="w-full rounded-md bg-[#6d28d9] py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors">
                Create Client + Project + Milestone
              </button>
            </form>
          </div>
        </details>
      </div>

      {/* P&L Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue',   value: `$${(aggregate._sum.totalClientPaid     || 0).toLocaleString()}`, icon: DollarSign, color: 'text-white'       },
          { label: 'Total Ad Spend',  value: `$${(aggregate._sum.actualPlatformSpend || 0).toLocaleString()}`, icon: Activity,   color: 'text-amber-400'  },
          { label: 'Net Profit',      value: `$${(aggregate._sum.profitMargin        || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-[#1e1e1e] bg-[#111] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">{s.label}</p>
              <s.icon size={14} className="text-gray-700" />
            </div>
            <p className={`font-mono text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Client List */}
      {clients.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#2a2a2a] p-12 text-center">
          <Users size={32} className="mx-auto mb-4 text-gray-700" />
          <p className="text-sm text-gray-500">No clients yet. Initialise your first client above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {enriched.map(client => (
            <Link
              key={client.id}
              href={`/${lang}/admin/clients/${client.id}`}
              className="group flex items-center justify-between rounded-xl border border-[#1e1e1e] bg-[#111] p-5 transition-all hover:border-[#2a2a2a] hover:bg-[#161616]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#222] bg-[#0a0a0a] font-mono text-sm font-bold text-[#6d28d9]">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{client.name}</h3>
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase ${STATUS_COLOR[client.latestStatus] ?? STATUS_COLOR.PENDING}`}>
                      {client.latestStatus}
                    </span>
                    {client.expiringCount > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-red-400">
                        <AlertCircle size={10} />{client.expiringCount} expiring
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {client.primaryContact} · {client.campaigns.length} campaign{client.campaigns.length !== 1 ? 's' : ''}
                    {client.activeCount > 0 && ` · ${client.activeCount} active`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-white">${client.totalRevenue.toLocaleString()}</p>
                  <p className="text-[11px] text-gray-600">Total revenue</p>
                </div>
                {client.pendingInvoices > 0 && (
                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-amber-400">${client.pendingInvoices.toLocaleString()}</p>
                    <p className="text-[11px] text-gray-600">Pending</p>
                  </div>
                )}
                <ChevronRight size={15} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
