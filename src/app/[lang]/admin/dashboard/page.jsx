import prisma from '@/lib/prisma';
import content from '@/data/content.json';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({ params }) {
  const { lang = 'en' } = await params;
  
  // Aggregate Elite Data
  const campaigns = await prisma.campaign.findMany({ include: { client: true } });
  const activeClients = await prisma.client.count();
  
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.totalClientPaid, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.actualPlatformSpend, 0);
  const netProfit = totalRevenue - totalSpend;
  
  const visitors = await prisma.analytics.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-cairo">
      <header className="mb-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Elite Dashboard</h1>
        <p className="text-slate-400 mt-2">Comprehensive Profit & Loss Tracking.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-slate-500">Active Clients</p>
          <p className="text-4xl font-bold text-white mt-2">{activeClients}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-slate-500">Total Revenue</p>
          <p className="text-4xl font-bold text-emerald-400 mt-2">${totalRevenue}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-slate-500">Net Profit</p>
          <p className="text-4xl font-bold text-amber-400 mt-2">${netProfit}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-slate-500">Live Traffic</p>
          <p className="text-4xl font-bold text-cyan-400 mt-2">{visitors.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/5">
          <h2 className="text-xl font-bold mb-6">Live Visitor Feed</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {visitors.map(v => (
              <div key={v.id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 text-xs">{v.country?.slice(0,2) || 'UK'}</span>
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-white truncate">{v.ipHash.slice(0, 12)}... ({v.city})</p>
                  <p className="text-xs text-slate-500">{v.os} · {v.browser} · {v.device}</p>
                </div>
                <div className="ml-auto flex shrink-0">
                  <span className="text-[10px] text-slate-500">{new Date(v.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/5">
          <h2 className="text-xl font-bold mb-6">Active Campaigns</h2>
          <div className="space-y-4">
            {campaigns.map(camp => (
              <div key={camp.id} className="p-4 bg-white/[0.02] rounded-2xl border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <p className="font-bold">{camp.client?.name}</p>
                  <p className="text-xs text-slate-500">Spend: ${camp.actualPlatformSpend}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg uppercase">
                  {camp.status}
                </span>
              </div>
            ))}
            {campaigns.length === 0 && <p className="text-sm text-slate-500">No campaigns active.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
