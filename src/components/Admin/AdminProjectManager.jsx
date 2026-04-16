'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadDeliverableToProjectAction } from '@/app/[lang]/admin/actions';

export default function AdminProjectManager({ lang, projectId, projectType }) {
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMsg('');
    const formData = new FormData(e.target);

    try {
      await uploadDeliverableToProjectAction(lang, projectId, formData);
      setSuccessMsg('Uploaded successfully!');
      e.target.reset();
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  if (projectType === 'CLIENT_SERVICES') {
    return <div className="text-sm text-slate-500 italic mt-4">Standard flow. No deliverables strictly required.</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 border-t border-white/5 pt-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-4 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        <h4 className="text-cyan-300 font-bold text-sm tracking-[0.2em] uppercase font-cairo">Secure Deliverable Vault</h4>
      </div>
      
      <form onSubmit={handleUpload} className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 rounded-3xl border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none rounded-3xl"></div>
        
        <div className="grid md:grid-cols-4 gap-6 items-end relative z-10">
          <div>
            <label className="text-[10px] text-slate-400 mb-2 block tracking-widest uppercase font-bold">Document Title</label>
            <input name="title" required placeholder="e.g. Master Proposal v1" className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600" />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 mb-2 block tracking-widest uppercase font-bold">Format Category</label>
            <input name="type" required placeholder="PDF / Brand / Scope" className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600" />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 mb-2 block tracking-widest uppercase font-bold">Iteration Version</label>
            <input name="version" type="number" required min="1" defaultValue="1" className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all" />
          </div>
          <div className="md:col-span-3">
            <label className="text-[10px] text-slate-400 mb-2 block tracking-widest uppercase font-bold">Secure File Attachment (Drag or Click)</label>
            <div className="relative group cursor-pointer">
              <input type="file" name="file" required className="w-full bg-slate-950/30 border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-2xl p-4 text-sm text-slate-300 outline-none transition-all file:mr-6 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 file:transition-all cursor-pointer shadow-inner" />
            </div>
          </div>
          <div className="md:col-span-1">
             <button disabled={isUploading} className="w-full bg-cyan-600 hover:bg-cyan-400 hover:text-slate-950 hover:-translate-y-1 text-white text-sm tracking-widest uppercase font-bold py-4 rounded-2xl disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
               {isUploading ? 'Encrypting...' : 'Upload Asset'}
             </button>
          </div>
        </div>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
            <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full">
              {successMsg}
            </span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
