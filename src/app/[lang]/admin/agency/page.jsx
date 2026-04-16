import prisma from '@/lib/prisma';
import AdminAgencyHQClient from './AdminAgencyHQClient';
import { checkMockData } from '@/lib/agency-actions';

export const dynamic = 'force-dynamic';

export default async function AdminAgencyPage() {
  await checkMockData(); // hydrate developer environment if empty

  const campaigns = await prisma.agencyCampaign.findMany({
    include: {
      client: true,
      adItems: true,
      messages: { orderBy: { createdAt: 'desc' } }
    },
    orderBy: { updatedAt: 'desc' }
  });

  const aggregate = await prisma.agencyCampaign.aggregate({
    _sum: {
      totalClientPaid: true,
      actualPlatformSpend: true,
      profitMargin: true,
      serviceFee: true,
    }
  });

  return (
    <div className="space-y-8">
      <header className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold font-cairo text-white">AtlaHub Elite Management</h1>
        <p className="text-slate-400 mt-2">Manage agency clients, financial pipelines, and live ad tracking.</p>
      </header>

      {/* P&L Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-white/10 p-6 rounded-[2rem] shadow-xl">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">Total Processed</p>
          <p className="text-3xl text-white font-cairo font-bold">${aggregate._sum.totalClientPaid || 0}</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-6 rounded-[2rem] shadow-xl">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">Platform Spend</p>
          <p className="text-3xl text-amber-300 font-cairo font-bold">${aggregate._sum.actualPlatformSpend || 0}</p>
        </div>
        <div className="bg-white/[0.04] border border-cyan-500/20 p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(6,182,212,0.15)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-widest text-cyan-500 mb-2 font-bold">Service Fees</p>
          <p className="text-3xl text-cyan-300 font-cairo font-bold">${aggregate._sum.serviceFee || 0}</p>
        </div>
        <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(16,185,129,0.1)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-widest text-emerald-500 mb-2 font-bold">Net Profit Margin</p>
          <p className="text-3xl text-emerald-400 font-cairo font-bold">${aggregate._sum.profitMargin || 0}</p>
        </div>
      </div>

      <AdminAgencyHQClient initialCampaigns={campaigns} />
    </div>
  );
}
