'use client';

import { useState } from 'react';
import { Link2, Loader2, DollarSign, Target, Briefcase } from 'lucide-react';
import { fetchOgData } from '@/lib/og-parser';

export default function FundingProjectForm({ clients, createProjectAction }) {
  const [url, setUrl] = useState('');
  const [ogData, setOgData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlParse = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    const data = await fetchOgData(url);
    if (data) setOgData(data);
    setLoading(false);
  };

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#333] pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Create New Funding Project</h1>
          <p className="text-sm text-gray-400">Establish a new client-centric ad-ops campaign with managed budgets.</p>
        </div>

        <form action={createProjectAction} className="space-y-6">
          
          {/* Client Centric Selection */}
          <div className="rounded-xl border border-[#333] bg-[#161616] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={18} className="text-[#6d28d9]" />
              <h2 className="text-lg font-medium text-white tracking-tight">Client Association</h2>
            </div>
            
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Select Client Entity</label>
              <select name="clientId" required className="w-full rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]">
                <option value="">Select a client...</option>
                {clients?.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            
            <div>
               <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Project Title</label>
               <input name="title" required placeholder="Q1 Meta Ads Scaling" className="w-full rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]" />
            </div>
          </div>

          {/* Financial Layer */}
          <div className="rounded-xl border border-[#333] bg-[#161616] p-6 shadow-sm space-y-4">
             <div className="flex items-center gap-3 mb-4">
              <DollarSign size={18} className="text-emerald-500" />
              <h2 className="text-lg font-medium text-white tracking-tight">Financial & Budgeting</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Total Approved Budget</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-gray-500 font-mono text-sm">$</span>
                   </div>
                   <input name="totalClientPaid" type="number" required placeholder="5000" className="w-full pl-8 rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm font-mono text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]" />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Agency Margin (%)</label>
                 <div className="relative">
                   <input name="profitMargin" type="number" required placeholder="20" className="w-full rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm font-mono text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]" />
                 </div>
               </div>
            </div>
          </div>

          {/* Visual Link Archiving */}
          <div className="rounded-xl border border-[#333] bg-[#161616] p-6 shadow-sm space-y-4">
             <div className="flex items-center gap-3 mb-4">
              <Target size={18} className="text-sky-500" />
              <h2 className="text-lg font-medium text-white tracking-tight">Visual Link Archive</h2>
             </div>
             
             <div className="flex items-end gap-3 border-b border-[#333] pb-4">
               <div className="flex-1">
                 <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Primary Ad / Post URL</label>
                 <div className="relative flex items-center">
                   <Link2 size={16} className="absolute left-3 text-gray-500" />
                   <input name="postUrl" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://facebook.com/..." className="w-full pl-9 rounded-md border border-[#333] bg-[#0c0c0c] px-3 py-2.5 text-sm text-white focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]" />
                 </div>
               </div>
               <button type="button" onClick={handleUrlParse} disabled={loading || !url} className="h-10 px-4 bg-[#333] hover:bg-[#444] rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                 {loading ? <Loader2 size={16} className="animate-spin" /> : 'Fetch Metadata'}
               </button>
             </div>

             {/* Hidden fields to pass OG data on submit */}
             <input type="hidden" name="ogTitle" value={ogData?.ogTitle || ''} />
             <input type="hidden" name="ogDescription" value={ogData?.ogDescription || ''} />
             <input type="hidden" name="previewImage" value={ogData?.previewImage || ''} />

             {ogData && (
                <div className="mt-4">
                  <span className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Rich Preview Validation</span>
                  <div className="max-w-sm rounded-lg border border-[#333] bg-[#0c0c0c] overflow-hidden shadow-lg">
                    {ogData.previewImage && (
                      <div className="w-full h-48 bg-[#161616] border-b border-[#333]">
                        <img src={ogData.previewImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="text-emerald-400 font-semibold text-sm line-clamp-1">{url}</h4>
                      <h3 className="text-white text-base mt-1 line-clamp-2">{ogData.ogTitle || 'No Title Found'}</h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-3 leading-relaxed">{ogData.ogDescription || 'No description found.'}</p>
                    </div>
                  </div>
                </div>
             )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-[#6d28d9] text-white hover:bg-purple-600 px-6 py-2.5 rounded-md font-medium text-sm transition-colors">
              Initialize Project
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
