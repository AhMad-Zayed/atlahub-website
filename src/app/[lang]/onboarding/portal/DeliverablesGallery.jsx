'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeliverablesGallery({ deliverables, onApprove, onComment }) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [pinMode, setPinMode] = useState(false);
  const [currentPin, setCurrentPin] = useState(null);

  const handleImageClick = (e) => {
    if (!pinMode) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentPin({ x, y });
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;
    await onComment(selectedAsset.id, commentText, currentPin?.x, currentPin?.y);
    setCommentText('');
    setCurrentPin(null);
    setPinMode(false);
  };

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url || '');
  const isPdf = (url) => /\.(pdf)$/i.test(url || '');

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white font-cairo">Deliverables Vault</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliverables.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50"
            onClick={() => {
              setSelectedAsset(item);
              if (!isImage(item.fileUrl)) {
                // Instantly open the comment box for docs
                setCurrentPin({ x: null, y: null }); 
              }
            }}
          >
            {isImage(item.fileUrl) ? (
              <img src={item.fileUrl?.startsWith('/uploads/') ? `/api${item.fileUrl}` : item.fileUrl} alt={item.title || 'Deliverable'} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : isPdf(item.fileUrl) ? (
               <div className="w-full h-48 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-red-500/10 flex flex-col relative items-center justify-center overflow-hidden transition-all duration-300 group-hover:from-slate-700 group-hover:to-slate-800 group-hover:shadow-[inset_0_0_50px_rgba(239,68,68,0.15)]">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                 <span className="text-5xl drop-shadow-2xl transition-transform group-hover:-translate-y-2 duration-300">📑</span>
                 <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-4 bg-red-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.2)] backdrop-blur-md transition-all group-hover:bg-red-500/30">PDF Document</span>
               </div>
            ) : (
               <div className="w-full h-48 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-indigo-500/10 flex flex-col relative items-center justify-center overflow-hidden transition-all duration-300 group-hover:from-slate-700 group-hover:to-slate-800 group-hover:shadow-[inset_0_0_50px_rgba(99,102,241,0.15)]">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                 <span className="text-5xl drop-shadow-2xl transition-transform group-hover:-translate-y-2 duration-300">📄</span>
                 <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-4 bg-indigo-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)] backdrop-blur-md transition-all group-hover:bg-indigo-500/30">Generic File</span>
               </div>
            )}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-5 pt-12 transition-transform duration-300 group-hover:translate-y-full">
              <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.2)]">{item.type} v{item.version}</span>
              <p className="text-white font-cairo font-bold mt-2 text-lg truncate">{item.title}</p>
            </div>

            {/* Premium Hover Overlay Quick-Actions */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
               <span className="text-white font-cairo font-bold text-lg mb-6 tracking-wide drop-shadow-md">{item.title}</span>
               
               <a 
                 href={item.fileUrl?.startsWith('/uploads/') ? `/api${item.fileUrl}` : item.fileUrl}
                 download
                 target="_blank"
                 rel="noreferrer"
                 onClick={(e) => e.stopPropagation()} 
                 className="bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:scale-105 text-white font-bold tracking-widest uppercase text-xs py-3 px-6 rounded-xl shadow-[0_0_25px_rgba(79,70,229,0.6)] transition-all duration-300 mb-4 w-full flex items-center justify-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 Quick Download
               </a>

               <button 
                 className="bg-white/5 hover:bg-white/15 text-white border border-white/10 font-bold tracking-widest uppercase text-[10px] py-3 px-6 rounded-xl transition-all duration-300 w-full hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                 onClick={(e) => {
                    // Let it propagate perfectly to the parent onClick to trigger the Modal
                 }}
               >
                 {isImage(item.fileUrl) || isPdf(item.fileUrl) ? 'Open Full Preview' : 'Leave Feedback'}
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAsset && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4"
          >
            <div className="absolute top-6 right-6 flex gap-4">
               {isImage(selectedAsset.fileUrl) && (
                 <button 
                  onClick={() => setPinMode(!pinMode)}
                  className={`px-4 py-2 rounded-full font-semibold text-xs tracking-widest uppercase transition ${pinMode ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                 >
                   {pinMode ? 'Cancel Pin' : 'Drop Pin Comment'}
                 </button>
               )}
               <button 
                onClick={() => onApprove(selectedAsset.id)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.5)]"
               >
                 Approve Version
               </button>
               <button onClick={() => { setSelectedAsset(null); setCurrentPin(null); setPinMode(false); }} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-bold text-xs uppercase">Close</button>
            </div>

            <div className="relative max-w-4xl max-h-[80vh] flex flex-col md:flex-row items-center gap-8">
              <div className="relative flex-1 flex justify-center items-center">
                {isImage(selectedAsset.fileUrl) ? (
                  <>
                    <img 
                      src={selectedAsset.fileUrl} 
                      alt="Review" 
                      className={`max-h-[80vh] object-contain rounded-lg border border-white/10 ${pinMode ? 'cursor-crosshair' : 'cursor-default'}`} 
                      onClick={handleImageClick}
                    />
                    {(selectedAsset.comments || []).map((c, i) => c.pinX != null && (
                      <div key={i} className="absolute w-4 h-4 rounded-full bg-cyan-400 border border-white shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ left: `calc(${c.pinX}% - 8px)`, top: `calc(${c.pinY}% - 8px)` }}>
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-xs p-2 rounded-lg w-max max-w-[200px] pointer-events-none z-10 hidden group-hover:block">
                          {c.comment}
                        </div>
                      </div>
                    ))}
                    {currentPin && (
                      <div className="absolute w-4 h-4 rounded-full bg-fuchsia-500 border border-white" style={{ left: `calc(${currentPin.x}% - 8px)`, top: `calc(${currentPin.y}% - 8px)` }} />
                    )}
                  </>
                ) : isPdf(selectedAsset.fileUrl) ? (
                  <div className="w-[80vw] max-w-4xl h-[75vh] bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.8)] relative ring-1 ring-white/5">
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-slate-950 to-slate-900 backdrop-blur-md border-b border-white/10 shrink-0">
                      <div>
                        <h3 className="font-cairo font-bold text-white tracking-widest text-lg">{selectedAsset.title || 'Document Preview'}</h3>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Version {selectedAsset.version} &bull; Native Viewer</p>
                      </div>
                      <a href={selectedAsset.fileUrl?.startsWith('/uploads/') ? `/api${selectedAsset.fileUrl}` : selectedAsset.fileUrl} download target="_blank" rel="noreferrer" className="text-xs tracking-widest uppercase font-bold bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] text-white px-6 py-3 rounded-xl transition-all">
                        Download PDF File
                      </a>
                    </div>
                    <iframe src={selectedAsset.fileUrl?.startsWith('/uploads/') ? `/api${selectedAsset.fileUrl}` : selectedAsset.fileUrl} className="w-full flex-1 bg-white" title={selectedAsset.title} />
                  </div>
                ) : (
                  <div className="w-[80vw] max-w-2xl h-[50vh] bg-slate-900/80 rounded-3xl border border-indigo-500/20 flex flex-col items-center justify-center p-10 backdrop-blur-2xl shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay pointer-events-none"></div>
                    <span className="text-8xl mb-8 drop-shadow-2xl animate-pulse">📄</span>
                    <h3 className="text-3xl text-white font-cairo font-bold mb-3 text-center tracking-wide">{selectedAsset.title}</h3>
                    <p className="text-slate-400 text-sm tracking-widest uppercase mb-10 text-center">Version {selectedAsset.version} &bull; High Integrity Vault</p>
                    <a 
                      href={selectedAsset.fileUrl?.startsWith('/uploads/') ? `/api${selectedAsset.fileUrl}` : selectedAsset.fileUrl} 
                      download 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-widest uppercase text-sm py-4 px-12 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all hover:scale-105 hover:-translate-y-1 relative group overflow-hidden"
                    >
                      <span className="relative z-10">Download Document Securely</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                  </div>
                )}
              </div>
              
              {currentPin && (
                <div className="relative md:absolute md:top-1/2 md:right-0 md:translate-x-[110%] md:-translate-y-1/2 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full md:w-80">
                  <p className="text-sm text-cyan-300 font-semibold mb-3 uppercase tracking-widest">Add Comment</p>
                  <textarea 
                    className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 mb-4 resize-none" 
                    rows={4} 
                    placeholder="Provide document feedback..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button onClick={submitComment} className="w-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 text-white rounded-xl py-3 text-sm font-bold transition-all uppercase tracking-wider">Submit Feedback</button>
                </div>
              )}
            </div>
          </motion.div>
        , document.body)}
      </AnimatePresence>
    </div>
  );
}
