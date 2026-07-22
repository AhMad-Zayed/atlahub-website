'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/images/AtlaHub_Tech_Logo.png';

/**
 * LegalLayout – Shared wrapper for Terms of Service and Privacy Policy pages.
 * Matches the site's dark slate-950 theme.
 */
export default function LegalLayout({ title, subtitle, lastUpdated, sections = [], children, lang = 'en' }) {
  const pathname = usePathname();
  const isTerms = pathname?.includes('/terms');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: 'var(--font-cairo)' }}>
      {/* Dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#60a5fa 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
      />

      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center group">
            <div className="relative h-10 w-40 md:h-12 md:w-48">
              <Image src={logo} alt="Atla Hub Tech Logo" fill className="object-contain object-left" priority />
            </div>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            <Link href={`/${lang}/terms`} className={`transition-colors ${isTerms ? 'text-blue-400 font-semibold border-b border-blue-400 pb-0.5' : 'text-slate-400 hover:text-blue-400'}`}>
              Terms of Service
            </Link>
            <Link href={`/${lang}/privacy`} className={`transition-colors ${!isTerms ? 'text-blue-400 font-semibold border-b border-blue-400 pb-0.5' : 'text-slate-400 hover:text-blue-400'}`}>
              Privacy Policy
            </Link>
            <Link href={`/${lang}`} className="px-4 py-1.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md font-semibold hover:shadow-md hover:shadow-blue-500/30 transition-all">
              ← Back to Home
            </Link>
          </nav>
          <Link href={`/${lang}`} className="sm:hidden px-3 py-1.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded text-sm font-semibold">
            ← Home
          </Link>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <div className="relative z-10 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-14 px-4 text-center overflow-hidden border-b border-slate-800">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-400 rounded-full opacity-10 blur-2xl" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight text-white">{title}</h1>
          {subtitle && <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">{subtitle}</p>}
          <p className="mt-4 text-slate-400 text-sm">
            Last Updated: <span className="font-semibold text-white">{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          {/* Sidebar TOC */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">On This Page</p>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md px-3 py-1.5 transition-colors">
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-4 bg-blue-950/40 border border-blue-900/40 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Also See</p>
                  <Link href={`/${lang}${isTerms ? '/privacy' : '/terms'}`} className="text-sm text-blue-400 font-semibold hover:underline">
                    {isTerms ? '→ Privacy Policy' : '→ Terms of Service'}
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* Prose content */}
          <main>
            <article className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
              <div className="prose prose-invert prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-white
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-800
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-blue-400
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-li:text-slate-300
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-100
                prose-hr:border-slate-800">
                {children}
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Atla Hub Tech. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}/terms`} className="text-slate-500 hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href={`/${lang}/privacy`} className="text-slate-500 hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href={`/${lang}`} className="text-slate-500 hover:text-blue-400 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
