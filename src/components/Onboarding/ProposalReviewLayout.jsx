'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { addCollaboratorNoteAction, approveDeliverableAction, addPinCommentAction } from '@/app/[lang]/onboarding/portal/actions';
import DeliverablesGallery from '@/app/[lang]/onboarding/portal/DeliverablesGallery';

export default function ProposalReviewLayout({ lang, token, projectInfo }) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setIsSubmitting(true);
    setSuccess(false);
    try {
      await addCollaboratorNoteAction(token, { content: note });
      setSuccess(true);
      setNote('');
    } catch (err) {
      alert(err.message || 'Error submitting note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const schemaData = projectInfo?.snapshot?.dataJson || [];
  const deliverables = projectInfo?.deliverables || [];

  return (
    <div className="relative mx-auto mt-4 max-w-7xl px-4 pb-20 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        
        {/* Left Panel: Proposal Overview */}
        <div className="space-y-8">
          <div className="rounded-[2.5rem] border border-indigo-500/20 bg-slate-950/80 p-8 shadow-[0_30px_90px_rgba(79,70,229,0.15)] backdrop-blur-xl">
            <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-indigo-400">Collaborator Draft</p>
            <h2 className="mt-3 font-cairo text-3xl font-bold text-white">Workshop Agenda & Technical Proposal</h2>
            <p className="mt-3 text-slate-400 leading-7">Review the blueprint below and leave your technical commands or scope feedback to sync with the main dashboard.</p>
          </div>

          {deliverables.length > 0 && (
            <div className="rounded-[2.5rem] border border-cyan-500/20 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
              <DeliverablesGallery 
                deliverables={deliverables} 
                onApprove={async (id) => await approveDeliverableAction(token, id)} 
                onComment={async (id, comment, x, y) => await addPinCommentAction(token, { deliverableId: id, comment, pinX: x, pinY: y })} 
              />
            </div>
          )}

          <div className="space-y-6">
            {Array.isArray(schemaData) && schemaData.map((field, idx) => (
              <motion.div 
                key={field.key || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-inner"
              >
                <h4 className="font-cairo text-xl font-semibold text-indigo-300">{field.label}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 border-l border-indigo-500/30 pl-4">
                  {field.hint || "Review and confirm this technical requirement."}
                </p>
              </motion.div>
            ))}
            {(!schemaData || schemaData.length === 0) && (
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 text-center text-sm font-mono text-slate-500">
                [NO ACTIVE AGENDA BLOCKS DETECTED]
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Command Console */}
        <div className="relative">
          <div className="sticky top-8 rounded-[2.5rem] border border-indigo-500/20 bg-slate-950/90 p-8 shadow-[0_40px_100px_rgba(79,70,229,0.2)] backdrop-blur-2xl">
            <h3 className="mb-6 font-cairo text-2xl font-bold text-white">Command Console</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-4 block text-xs uppercase tracking-widest text-slate-400">Add Collaborator Note</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Please revise the timeline for Phase 2..."
                  className="min-h-[200px] w-full resize-none rounded-2xl border border-white/10 bg-slate-900 p-5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !note.trim()}
                className="w-full rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:hover:shadow-none"
              >
                {isSubmitting ? 'Transmitting...' : 'Dispatch Note'}
              </button>
              {success && (
                <p className="mt-4 animate-pulse text-center text-sm text-emerald-400">
                  Command sequence transmitted successfully!
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
