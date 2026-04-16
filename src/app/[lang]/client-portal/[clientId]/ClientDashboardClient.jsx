'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitClientAdLink, postCampaignMessage } from '@/lib/agency-actions';
import { toast } from 'sonner';

export default function ClientDashboardClient({ client, lang }) {
  const [activeTab, setActiveTab] = useState(client.campaigns[0]?.id || null);
  const [linkInput, setLinkInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCampaign = client.campaigns.find(c => c.id === activeTab);

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!linkInput.trim() || !activeCampaign) return;
    setIsSubmitting(true);
    try {
      await submitClientAdLink(activeCampaign.id, linkInput);
      toast.success('Ad Link Submitted gracefully.');
      setLinkInput('');
    } catch {
      toast.error('Failed to submit link.');
    }
    setIsSubmitting(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeCampaign) return;
    setIsSubmitting(true);
    try {
      await postCampaignMessage(activeCampaign.id, 'CLIENT', chatInput);
      setChatInput('');
    } catch {
      toast.error('Failed to post message.');
    }
    setIsSubmitting(false);
  };

  if (!client.campaigns.length) {
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
            <p className="font-bold font-cairo">{camp.title}</p>
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
                <form onSubmit={handleLinkSubmit} className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="Paste TikTok/Insta link here..."
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                  <button disabled={isSubmitting} type="submit" className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-amber-400 transition disabled:opacity-50">
                    Submit
                  </button>
                </form>

                <div className="mt-8 space-y-4">
                  {activeCampaign.adItems.map(ad => (
                    <div key={ad.id} className="flex gap-4 items-start p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                      {ad.previewImage ? (
                        <img src={ad.previewImage} alt="Proof" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-xs text-slate-500">Processing</div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs truncate text-amber-300">{ad.url}</p>
                        <p className="text-[10px] uppercase mt-2 font-bold text-slate-400 tracking-wider">Status: {ad.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Chat */}
              <div className="p-6 rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl flex flex-col h-[500px]">
                <h3 className="text-xl font-cairo font-bold mb-6">Strategy Chat</h3>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {activeCampaign.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'CLIENT' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                        msg.sender === 'CLIENT' ? 'bg-amber-500/20 text-white rounded-br-none border border-amber-500/20' : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Message your strategist..."
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button disabled={isSubmitting} type="submit" className="p-2 bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition disabled:opacity-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
