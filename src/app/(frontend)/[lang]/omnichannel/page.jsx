import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  return {
    title: isAr ? 'منصة الدعم الموحدة | أتلا هاب تك' : 'Omnichannel Customer Support Platform | AtlaHub Tech',
    description: isAr 
      ? 'اربط WhatsApp Business API و Messenger وغيرها في صندوق وارد واحد لدعم عملائك.' 
      : 'Connect WhatsApp Business API, Messenger API, and other channels in a single unified dashboard to manage customer conversations.',
  };
}

export default async function OmnichannelLandingPage({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    features: isAr ? 'الميزات' : 'Features',
    contact: isAr ? 'اتصل بنا' : 'Contact',
    login: isAr ? 'تسجيل الدخول' : 'Login',
    heroHeadline: isAr ? 'أقوى صندوق وارد شامل للشركات الحديثة.' : 'The Ultimate Omnichannel Inbox for Modern Businesses.',
    heroSub: isAr 
      ? 'قم بربط WhatsApp، Messenger، والبريد الإلكتروني في لوحة تحكم واحدة موحدة. مكّن فريقك من تقديم دعم استثنائي للعملاء نيابة عن عملائك.' 
      : 'Connect WhatsApp, Messenger, and Email in one unified dashboard. Empower your team to deliver exceptional customer support on behalf of your clients.',
    getStarted: isAr ? 'ابدأ الآن' : 'Get Started',
    feat1Title: isAr ? 'تكامل WhatsApp و Messenger' : 'WhatsApp & Messenger Integration',
    feat1Desc: isAr 
      ? 'استفد من قوة منصات Meta مثل WhatsApp Business Cloud API و Messenger API للرد على عملائك بسرعة وكفاءة.' 
      : 'Leverage the power of Meta platforms like WhatsApp Business Cloud API and Messenger API to respond to your customers quickly and efficiently.',
    feat2Title: isAr ? 'أتمتة ذكية وردود سريعة' : 'Smart Automations & Macros',
    feat2Desc: isAr 
      ? 'وفر وقت فريقك باستخدام الردود الآلية، والقواعد الذكية، والمقروءات السريعة (Macros) للتعامل مع الأسئلة المتكررة.' 
      : 'Save your team\'s time using automated replies, smart rules, and Macros to handle frequently asked questions.',
    builtFor: isAr ? 'مبني لمزودي تقنيات ميتا' : 'Built for Meta Tech Providers',
    rights: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    privacy: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    terms: isAr ? 'شروط الخدمة' : 'Terms of Service',
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link href={`/${lang}`} className="flex items-center gap-2">
                <Image 
                  src="/atlahub-chat-logo.png" 
                  alt="AtlaHub Tech Logo" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10 object-contain rounded-xl shadow-sm"
                />
                <span className="font-bold text-xl tracking-tight text-blue-900">AtlaHub Tech</span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">{t.features}</a>
              <a href="mailto:support@atlahub.tech" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">{t.contact}</a>
            </nav>

            {/* Login CTA */}
            <div className="flex items-center">
              <a 
                href="https://app.atlahub.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30 transition-all"
              >
                {t.login}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold mb-8 shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              {t.builtFor}
            </div>

            <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {t.heroHeadline}
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="https://app.atlahub.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
              >
                {t.getStarted}
              </a>
              <a 
                href="https://app.atlahub.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                {t.login}
              </a>
            </div>

            {/* Dashboard Mockup Image */}
            <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white">
              {/* Note: User must ensure /pics/dashboard.jpg or chat.jpg exists in public/pics/ */}
              <div className="aspect-w-16 aspect-h-9 bg-slate-100 flex items-center justify-center relative h-[300px] md:h-[600px]">
                 <Image 
                   src="/pics/dashboard.jpg" 
                   alt="AtlaHub Dashboard" 
                   fill
                   className="object-cover object-top"
                   // Fallback visual if image doesn't exist yet
                   onError={(e) => { e.currentTarget.style.display = 'none'; }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium z-[-1]">
                    [ Dashboard Interface Preview ]
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION ── */}
        <section id="features" className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t.features}</h2>
            </div>

            <div className="space-y-24">
              {/* Feature 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-1'} bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-lg relative h-[300px] sm:h-[400px]`}>
                  <Image src="/pics/inboxes.jpg" alt="Inbox Integration" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium z-[-1]">[ Inbox Image: /pics/inboxes.jpg ]</div>
                </div>
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.feat1Title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{t.feat1Desc}</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-1'}`}>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.feat2Title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{t.feat2Desc}</p>
                </div>
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-2'} bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-lg relative h-[300px] sm:h-[400px] grid grid-cols-2 gap-2 p-2`}>
                  <div className="relative h-full rounded-2xl overflow-hidden bg-slate-200">
                     <Image src="/pics/automations.jpg" alt="Automations" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm text-center font-medium z-[-1]">[ automations.jpg ]</div>
                  </div>
                  <div className="relative h-full rounded-2xl overflow-hidden bg-slate-200">
                     <Image src="/pics/Macros.jpg" alt="Macros" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm text-center font-medium z-[-1]">[ Macros.jpg ]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER (COMPLIANCE REQUIRED) ── */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Exact Company Name Required by Meta */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-white text-lg font-bold mb-1">AtlaHub Tech - AhMad Zayed</span>
              <p className="text-sm">© {new Date().getFullYear()} AtlaHub Tech. {t.rights}</p>
            </div>

            {/* Compliance Links Required by Meta */}
            <div className="flex gap-6 text-sm font-medium">
              <a href="https://atlahub.tech/en/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {t.privacy}
              </a>
              <a href="https://atlahub.tech/en/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {t.terms}
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
