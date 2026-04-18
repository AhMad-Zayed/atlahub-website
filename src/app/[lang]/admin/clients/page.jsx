import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Users, TrendingUp, DollarSign, PlusCircle, ChevronRight, Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_COLOR = {
  ACTIVE:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  PENDING:   'text-amber-400  bg-amber-500/10  border-amber-500/20',
  PAUSED:    'text-gray-400   bg-gray-500/10   border-gray-500/20',
  COMPLETED: 'text-sky-400    bg-sky-500/10    border-sky-500/20',
};

export default async function ClientDirectoryPage({ params }) {
  const { lang } = await params;

  const clients = await prisma.agencyClient.findMany({
    include: {
      campaigns: {
        select: {
          id: true,
          title: true,
          status: true,
          totalClientPaid: true,
          actualPlatformSpend: true,
          profitMargin: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Compute lifetime value per client
  const enrichedClients = clients.map(client => {
    const lifetimeValue = client.campaigns.reduce((sum, c) => sum + (c.totalClientPaid || 0), 0);
    const totalProfit   = client.campaigns.reduce((sum, c) => sum + (c.profitMargin || 0), 0);
    const activeCount   = client.campaigns.filter(c => c.status === 'ACTIVE').length;
    const latestStatus  = client.campaigns[0]?.status ?? 'PENDING';
    return { ...client, lifetimeValue, totalProfit, activeCount, latestStatus };
  });

  // Platform-wide P&L aggregate
  const aggregate = await prisma.agencyCampaign.aggregate({
    _sum: {
      totalClientPaid:     true,
      actualPlatformSpend: true,
      profitMargin:        true,
    },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1e1e1e] pb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Client Directory</h1>
          <p className="mt-1 text-sm text-gray-500">
            {clients.length} client{clients.length !== 1 ? 's' : ''} · Client-centric view of all agency relationships
          </p>
        </div>
        <Link
          href={`/${lang}/admin/agency`}
          className="inline-flex items-center gap-2 rounded-md bg-[#6d28d9] px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors"
        >
          <PlusCircle size={15} />
          New Campaign
        </Link>
      </div>

      {/* Platform P&L Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: `$${(aggregate._sum.totalClientPaid || 0).toLocaleString()}`, icon: DollarSign, color: 'text-white' },
          { label: 'Total Ad Spend', value: `$${(aggregate._sum.actualPlatformSpend || 0).toLocaleString()}`, icon: Activity, color: 'text-amber-400' },
          { label: 'Net Profit', value: `$${(aggregate._sum.profitMargin || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-400' },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-[#1e1e1e] bg-[#111] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">{stat.label}</p>
              <stat.icon size={14} className="text-gray-600" />
            </div>
            <p className={`font-mono text-2xl font-medium ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Client Grid */}
      {clients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#333] p-12 text-center">
          <Users size={32} className="mx-auto mb-4 text-gray-700" />
          <p className="text-sm text-gray-500">No clients yet. Create your first campaign in Ad-Ops & Funding.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enrichedClients.map(client => (
            <Link
              key={client.id}
              href={`/${lang}/admin/clients/${client.id}`}
              className="group flex items-center justify-between rounded-lg border border-[#1e1e1e] bg-[#111] p-5 transition-all hover:border-[#333] hover:bg-[#161616]"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#222] bg-[#0a0a0a] font-mono text-sm font-bold text-[#6d28d9]">
                  {client.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{client.name}</h3>
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase ${STATUS_COLOR[client.latestStatus] ?? STATUS_COLOR.PENDING}`}>
                      {client.latestStatus}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {client.primaryContact} · {client.campaigns.length} campaign{client.campaigns.length !== 1 ? 's' : ''}
                    {client.activeCount > 0 && ` · ${client.activeCount} active`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-white">${client.lifetimeValue.toLocaleString()}</p>
                  <p className="text-[11px] text-gray-600">Lifetime value</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono text-sm font-medium ${client.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ${client.totalProfit.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-gray-600">Net profit</p>
                </div>
                <ChevronRight size={16} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
