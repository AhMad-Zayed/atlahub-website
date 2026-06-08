'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitClientAdLink } from '@/lib/agency-actions';
import { toast } from 'sonner';

export default function ClientDashboardClient({ client, lang }) {
  const [activeTab, setActiveTab] = useState(client.campaigns?.[0]?.id || null);
  const [linkInput, setLinkInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCampaign = client.campaigns?.find(c => c.id === activeTab);

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!linkInput.trim() || !activeCampaign) return;
    setIsSubmitting(true);
    try {
      const links = linkInput.split(/[\n,]+/).map(l => l.trim()).filter(l => l.length > 0);
      await submitClientAdLink(activeCampaign.id, links);
      toast.success(`${links.length} Ad Links Submitted gracefully.`);
      setLinkInput('');
    } catch {
      toast.error('Failed to submit links.');
    }
    setIsSubmitting(false);
  };

  if (!client.campaigns?.length) {
    return (
      <div className="p-8 rounded-[2rem] border border-amber-500/20 bg-amber-500/5 text-center shadow-xl backdrop-blur-xl">
        <h3 className="text-xl text-amber-300 font-cairo">No Active Campaigns</h3>
        <p className="text-slate-400 mt-2">AtlaHub HQ is preparing your elite strategy. Stay tuned.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar / Tabs */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-slate-500 font-bold mb-4">Your Campaigns</h3>
        {client.campaigns.map((camp) => (
          <button
            key={camp.id}
            onClick={() => setActiveTab(camp.id)}
            className={`w-full text-left p-4 rounded-2xl transition border ${
              activeTab === camp.id 
                ? 'bg-amber-500/10 border-amber-500/30 text-white' 
                : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            <p className="font-bold font-cairo text-sm">#{camp.id.slice(0, 8)}</p>
            <p className="text-xs text-amber-400 mt-1">{camp.category}</p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-md ${
                camp.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 
                camp.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300'
              }`}>
                {camp.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeCampaign && (
          <motion.div
            key={activeCampaign.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Funded Total</p>
                <p className="text-3xl font-bold font-cairo text-white">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: client.preferredCurrency }).format(activeCampaign.totalClientPaid)}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Active Spend</p>
                <p className="text-3xl font-bold font-cairo text-amber-300">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: client.preferredCurrency }).format(activeCampaign.actualPlatformSpend)}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Budget Health</p>
                {activeCampaign.actualPlatformSpend > activeCampaign.totalClientPaid ? (
                  <p className="text-xl font-bold font-cairo text-red-400">Over Limit</p>
                ) : (
                  <p className="text-xl font-bold font-cairo text-emerald-400">Healthy</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Ad Submissions & Proof */}
              <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
                <h3 className="text-xl font-cairo font-bold mb-6">Smart Link Drop</h3>
                <form onSubmit={handleLinkSubmit} className="flex flex-col gap-2">
                  <textarea
                    required
                    placeholder="Paste TikTok/Insta links here... (One per line or comma separated)"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    rows={3}
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                  <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-amber-400 transition disabled:opacity-50">
                    Submit Links
                  </button>
                </form>

                <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {activeCampaign.adItems.map(ad => (
                    <div key={ad.id} className="flex gap-4 items-start p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                      {ad.previewImage ? (
                        <img src={ad.previewImage} alt="Proof" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-xs text-slate-500 text-center">Processing</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate text-amber-300 block">{ad.postUrl}</p>
                        <p className="text-[10px] uppercase mt-2 font-bold text-slate-400 tracking-wider">Status: {ad.status} · Budget: ${ad.itemBudget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logs / Audit Trail */}
              <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl h-[500px] flex flex-col">
                <h3 className="text-xl font-cairo font-bold mb-6">Audit Trail</h3>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {activeCampaign.logs?.map(log => (
                    <div key={log.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">{log.action}</span>
                        <span className="text-[10px] text-slate-500">{new Date(log.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-300">{log.details}</p>
                      <p className="text-[10px] text-slate-500 mt-2 text-right">By {log.user}</p>
                    </div>
                  ))}
                  {!activeCampaign.logs?.length && (
                    <p className="text-sm text-slate-500">No activity logged.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
