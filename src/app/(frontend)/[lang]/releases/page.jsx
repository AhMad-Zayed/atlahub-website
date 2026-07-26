import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'أحدث الإصدارات | أتلا هاب تك' : 'Latest Releases | Atla Hub Tech',
    description: isAr
      ? 'تعرف على أحدث الميزات والتحسينات في منصة AtlaHub.'
      : 'Discover the latest features and improvements in the AtlaHub platform.',
  };
}

// 1. Loading State Component
function ReleasesLoading({ isAr }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-medium animate-pulse">
        {isAr ? 'جاري تحميل أحدث الإصدارات...' : 'Loading latest releases...'}
      </p>
    </div>
  );
}

// 2. Fetch Function
async function getLatestRelease() {
  // If the environment variable is missing, we use a placeholder absolute URL as requested by the Backend
  const apiUrl = process.env.RELEASES_API_URL || 'https://app.atlahub.tech/api/v1/atlahub/releases/latest';


  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch release: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest release:', error);
    throw error;
  }
}

// 3. Main Data Component
async function ReleaseContent({ lang }) {
  const isAr = lang === 'ar';
  let releaseData;

  try {
    releaseData = await getLatestRelease();
  } catch (error) {
    // Error Handling State
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {isAr ? 'عذراً، حدث خطأ في النظام' : 'System Error Occurred'}
        </h2>
        <p className="text-slate-400 max-w-md">
          {isAr 
            ? 'لم نتمكن من جلب بيانات الإصدار في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.' 
            : 'We could not fetch the release data at this moment. Please try again later.'}
        </p>
      </div>
    );
  }

  if (!releaseData) {
    return notFound();
  }

  const { version, title, description_en, description_ar, release_notes_url, date } = releaseData;
  const description = isAr ? description_ar : description_en;

  return (
    <>
      {/* ── HERO SECTION ── */}
      <div className="relative z-10 bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 py-20 px-4 text-center overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto flex flex-col items-center">
          {/* Version Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide mb-6 shadow-lg shadow-blue-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            {isAr ? `إصدار ${version || ''}` : `Version ${version || ''}`}
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
            {title || (isAr ? 'تحديث جديد' : 'New Update')}
          </h1>
          
          {date && (
            <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>{isAr ? 'تاريخ الإصدار: ' : 'Release Date: '} {new Date(date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT (MARKDOWN) ── */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <article className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12 mb-10">
          <div className="prose prose-invert prose-slate prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h1:text-3xl prose-h1:mb-6 prose-h1:border-b prose-h1:border-slate-800/50 prose-h1:pb-4
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-blue-400
            prose-h3:text-xl prose-h3:text-slate-200
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-ul:text-slate-300 prose-ul:my-6
            prose-li:marker:text-blue-500
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-hr:border-slate-800">
            {description ? (
              <ReactMarkdown>{description}</ReactMarkdown>
            ) : (
              <p className="text-center text-slate-500 italic">
                {isAr ? 'لا يوجد تفاصيل إضافية لهذا الإصدار.' : 'No additional details provided for this release.'}
              </p>
            )}
          </div>
        </article>

        {/* ── ACTION FOOTER ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800 pt-8">
          <Link 
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors"
          >
            {isAr ? '← العودة للرئيسية' : '← Back to Home'}
          </Link>

          {release_notes_url && (
            <a 
              href={release_notes_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white rounded-xl font-bold shadow-[0_4px_15px_rgba(0,86,179,0.3)] transition-all flex items-center gap-2"
            >
              {isAr ? 'التفاصيل الكاملة للإصدار' : 'Full Release Notes'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          )}
        </div>
      </main>
    </>
  );
}

// 4. Page Shell
export default async function ReleasesPage({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo selection:bg-blue-500/30" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Texture Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#60a5fa 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
      />
      
      {/* Suspense Boundary for Loading State */}
      <Suspense fallback={<ReleasesLoading isAr={isAr} />}>
        <ReleaseContent lang={lang} />
      </Suspense>
    </div>
  );
}
