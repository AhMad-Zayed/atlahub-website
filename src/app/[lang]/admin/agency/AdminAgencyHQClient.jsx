'use client';

import { useState } from 'react';
import { updateCampaignFinances, setCampaignStatus, batchApproveAdItems, uploadAdPreview } from '@/lib/agency-actions';
import { toast } from 'sonner';

export default function AdminAgencyHQClient({ initialCampaigns }) {
  const [selectedAdItems, setSelectedAdItems] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeUploadId, setActiveUploadId] = useState(null);

  const toggleAdSelection = (id) => {
    const newSet = new Set(selectedAdItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedAdItems(newSet);
  };

  const handleBatchApprove = async () => {
    if (selectedAdItems.size === 0) return;
    setIsProcessing(true);
    try {
      await batchApproveAdItems(Array.from(selectedAdItems));
      toast.success(`Approved ${selectedAdItems.size} links!`);
      setSelectedAdItems(new Set());
    } catch {
      toast.error('Failed to batch approve.');
    }
    setIsProcessing(false);
  };

  const handleStatusChange = async (campaignId, status) => {
    setIsProcessing(true);
    try {
      await setCampaignStatus(campaignId, status);
      toast.success(`Status updated and automations triggered.`);
    } catch {
      toast.error('Failed update.');
    }
    setIsProcessing(false);
  };

  const handleMockUpload = async (adId) => {
    setActiveUploadId(adId);
    try {
      // Typically goes to S3 or a robust media portal. For simulation:
      await uploadAdPreview(adId, 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?width=400&height=400&q=80');
      toast.success('Screenshot Proof of Work uploaded and sent to client.');
    } catch {
      toast.error('Upload failed.');
    }
    setActiveUploadId(null);
  };

  return (
    <div className="space-y-12">
      {/* Batch Processing */}
      {selectedAdItems.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/50 p-4 rounded-full shadow-2xl flex items-center gap-6">
          <p className="text-white font-bold ml-4">{selectedAdItems.size} Links Selected</p>
          <button 
            disabled={isProcessing}
            onClick={handleBatchApprove}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2 rounded-full font-bold transition"
          >
            Batch Approve
          </button>
        </div>
      )}

      {initialCampaigns.map((camp) => {
        const isBleeding = camp.actualPlatformSpend > camp.totalClientPaid;

        return (
          <div key={camp.id} className={`rounded-[2.5rem] border p-8 shadow-2xl transition-all ${isBleeding ? 'bg-red-950/20 border-red-500/40' : 'bg-white/[0.02] border-white/10'}`}>
            <div className="flex flex-col xl:flex-row gap-8 justify-between">
              
              {/* Campaign Meta */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold font-cairo text-white">{camp.title}</h2>
                  <select 
                    value={camp.status}
                    onChange={(e) => handleStatusChange(camp.id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300 p-1"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
                <p className="text-slate-400 text-sm mt-1 mb-4">Client: <span className="font-bold text-amber-500">{camp.client.brandName}</span> | Portal Route: <span className="text-cyan-300 cursor-pointer" onClick={() => navigator.clipboard.writeText(`/[lang]/client-portal/${camp.client.id}`)}>Copy Secure Link</span></p>

                {/* Proof of Work List */}
                <div className="mt-8 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Ad Funnel Items</h4>
                  {camp.adItems.length === 0 && <p className="text-sm text-slate-600">No ad items submitted.</p>}
                  
                  {camp.adItems.map(ad => (
                    <div key={ad.id} className="flex flex-col md:flex-row gap-4 items-center bg-black/40 p-3 rounded-2xl border border-white/5">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-white/20 text-cyan-500 focus:ring-cyan-500"
                        checked={selectedAdItems.has(ad.id)}
                        onChange={() => toggleAdSelection(ad.id)}
                      />
                      <div className="flex-1 truncate w-full">
                        <p className="text-sm text-blue-300 truncate">{ad.url}</p>
                        <p className="text-[10px] uppercase mt-1 font-bold text-slate-400 tracking-wider">Status: {ad.status}</p>
                      </div>
                      
                      {ad.previewImage ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
                          <img src={ad.previewImage} alt="proof" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <button 
                          disabled={activeUploadId === ad.id}
                          onClick={() => handleMockUpload(ad.id)} 
                          className="shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition"
                        >
                          {activeUploadId === ad.id ? 'Uploading...' : '+ Upload Proof'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Automation & Finance Sync */}
              <div className="w-full xl:w-96 shrink-0 bg-slate-900 border border-white/5 p-6 rounded-3xl space-y-4">
                <h4 className="font-bold font-cairo border-b border-white/10 pb-4">Finance Controller</h4>
                {isBleeding && (
                  <p className="bg-red-500/20 text-red-300 p-2 text-xs rounded-lg font-bold border border-red-500/40 text-center uppercase tracking-widest">⚠️ Over Budget Alert</p>
                )}

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total Funded (Client)</span>
                    <span className="font-bold">${camp.totalClientPaid}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total Spent (Ad Platform)</span>
                    <span className="font-bold text-amber-300">${camp.actualPlatformSpend}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-4">
                    <span className="text-slate-400">Computed Agency Profit</span>
                    <span className="font-bold text-emerald-400">${camp.profitMargin}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-xs text-slate-500 italic mb-2">Automated P&L syncs based on database entries.</p>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl text-sm font-bold border border-white/5 transition">
                    Sync Platform Finances
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
