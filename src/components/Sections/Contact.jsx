'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gray-900 text-white font-tajawal overflow-hidden">
      {/* Tech Pattern & Gradients */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-cairo text-brand-blue-light mb-4">Let's Build Your Reality</h2>
          <p className="text-xl text-gray-400">Stop waiting. Start scaling. Reach out to our elite team today.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700/50 relative"
        >
          {status === 'success' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/95 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold font-cairo text-white mb-2">Transmission Secured</h3>
              <p className="text-gray-400">Our team will contact you shortly to initiate the protocol.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Full Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-white placeholder-gray-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-white placeholder-gray-500" placeholder="john@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Requested Capability</label>
              <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-white appearance-none">
                <option value="" disabled>Select a core integration...</option>
                <option value="Programming">Programming & Web Development</option>
                <option value="Marketing">Strategic Digital Marketing</option>
                <option value="Cybersecurity">Elite Cybersecurity & Response</option>
                <option value="Media">Field Media Production</option>
                <option value="Other">Other Integration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Project Details / Challenge</label>
              <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="4" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-y" placeholder="Describe the outcome you are looking to achieve..."></textarea>
            </div>

            {status === 'error' && <p className="text-red-400 text-sm font-bold">Failed to send transmission. Please try again or use direct contact methods.</p>}

            <button disabled={status === 'loading'} type="submit" className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-bold font-cairo text-lg rounded-lg shadow-[0_0_20px_rgba(0,86,179,0.3)] hover:shadow-[0_0_30px_rgba(0,170,255,0.5)] hover:-translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
              {status === 'loading' ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>Initiate Project <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}