'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * LegalLayout – Shared wrapper for Terms of Service and Privacy Policy pages.
 * Provides a sticky top bar, a clean centered prose container, a desktop
 * table-of-contents sidebar, and a consistent footer.
 *
 * @param {{ title: string, subtitle: string, lastUpdated: string, sections: Array<{id:string,label:string}>, children: React.ReactNode }} props
 */
export default function LegalLayout({ title, subtitle, lastUpdated, sections = [], children }) {
  const pathname = usePathname();
  const isTerms = pathname === '/terms';

  return (
    <div className="min-h-screen bg-slate-50 font-inter" style={{ fontFamily: "'Inter', 'Cairo', sans-serif" }}>
      {/* ── Dot-grid background texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#1e3a8a 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ────────────────────────────────
          TOP NAV BAR
      ──────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-900 to-blue-500 rounded flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-blue-300 transition-shadow">
              A
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Atla Hub Tech</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/terms"
              className={`transition-colors ${
                isTerms
                  ? 'text-blue-700 font-semibold border-b-2 border-blue-700 pb-0.5'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className={`transition-colors ${
                !isTerms
                  ? 'text-blue-700 font-semibold border-b-2 border-blue-700 pb-0.5'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-600 text-white rounded-md text-sm font-semibold hover:shadow-md transition-all"
            >
              ← Back to Home
            </Link>
          </nav>

          {/* Mobile back button */}
          <Link
            href="/"
            className="sm:hidden px-3 py-1.5 bg-gradient-to-r from-blue-900 to-blue-600 text-white rounded text-sm font-semibold"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ────────────────────────────────
          PAGE HERO BANNER
      ──────────────────────────────── */}
      <div className="relative z-10 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-14 px-4 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-300 rounded-full opacity-10 blur-2xl" />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-400/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-widest mb-4">
            Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-blue-200 text-base sm:text-lg max-w-xl mx-auto">{subtitle}</p>
          )}
          <p className="mt-4 text-blue-300 text-sm">
            Last Updated: <span className="font-semibold text-white">{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* ────────────────────────────────
          MAIN CONTENT AREA
      ──────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 xl:gap-16">

          {/* ── SIDEBAR TABLE OF CONTENTS (Desktop only) ── */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    On This Page
                  </p>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md px-3 py-1.5 transition-colors leading-snug"
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick links to the other page */}
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                    Also See
                  </p>
                  <Link
                    href={isTerms ? '/privacy' : '/terms'}
                    className="text-sm text-blue-700 font-semibold hover:underline"
                  >
                    {isTerms ? '→ Privacy Policy' : '→ Terms of Service'}
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* ── PROSE CONTENT ── */}
          <main>
            <article className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 lg:p-12">
              <div className="prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-blue-800
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600 prose-li:leading-relaxed
                prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800
                prose-hr:border-slate-100">
                {children}
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* ────────────────────────────────
          FOOTER
      ──────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Atla Hub Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="text-slate-500 hover:text-blue-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-slate-500 hover:text-blue-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-slate-500 hover:text-blue-700 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
