'use client';

import content from '@/data/content.json';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const { hero } = content;

  return (
    <section id="hero" className="relative pt-48 pb-20 lg:pt-0 overflow-hidden bg-gray-900 text-white flex items-center min-h-screen">
      {/* Tech Pattern Overlay - Assumes a tech-pattern.svg is in /public/assets/ */}
      <div className="absolute inset-0 bg-[url('/assets/tech-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue to-brand-blue-light z-20"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-block px-5 py-2 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-light rounded-full font-bold text-sm tracking-wide backdrop-blur-sm animate-pulse">
            {hero.team_text}
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold font-cairo leading-tight drop-shadow-xl">
            {hero.headline.split(' ').map((word, i) => (
              <span key={i} className={i > 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-cyan-400' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="text-xl text-gray-300 max-w-xl leading-relaxed font-tajawal mx-auto lg:mx-0">
            {hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <Link href="#contact" className="px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,86,179,0.4)] hover:shadow-[0_0_30px_rgba(0,170,255,0.6)] hover:-translate-y-1 transition-all text-center text-lg font-cairo">
              {hero.cta_primary}
            </Link>
            <Link href="#portfolio" className="px-8 py-4 bg-transparent border-2 border-gray-600 text-white font-bold rounded-lg hover:border-gray-300 hover:bg-white/5 transition-all text-center text-lg font-cairo backdrop-blur-sm">
              {hero.cta_secondary}
            </Link>
          </div>
        </motion.div>
        
        {/* Visual: The Team Representation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex justify-end relative"
        >
          <div className="w-[500px] h-[500px] bg-gradient-to-tr from-brand-blue to-brand-blue-light rounded-full opacity-20 blur-3xl absolute top-10 right-10"></div>
          
          <div className="relative z-10 w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform duration-700">
             <div className="text-center p-8">
               <div className="w-28 h-28 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold font-cairo shadow-[0_0_40px_rgba(0,170,255,0.3)]">AZ</div>
               <h3 className="text-3xl font-bold font-cairo text-white">Ahmed Zayed</h3>
               <p className="text-brand-blue-light font-semibold mb-8 tracking-wide uppercase text-sm">Founder & Technical Lead</p>
               <div className="flex justify-center gap-2">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center -ml-3 first:ml-0 z-10 relative" title="Elite Specialist">
                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                   </div>
                 ))}
               </div>
               <p className="text-gray-400 text-xs mt-3">+ 6 Elite Specialists</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}