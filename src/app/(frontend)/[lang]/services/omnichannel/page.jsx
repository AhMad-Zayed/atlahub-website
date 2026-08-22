import React from 'react';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  return {
    title: isAr ? 'منصة الدعم الموحدة | أتلا هاب تك' : 'Omnichannel Customer Support Platform | AtlaHub Tech',
    description: isAr 
      ? 'اربط WhatsApp، Messenger، والبريد الإلكتروني وغيرها في صندوق وارد واحد. فريقك في مكان واحد، ومحادثات عملائك في سياقها الصحيح.' 
      : 'Connect WhatsApp, Messenger, Email, and more in a single unified shared inbox. Empower your team with context and collaboration.',
  };
}

export default async function OmnichannelLandingPage({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    features: isAr ? 'الميزات' : 'Features',
    contact: isAr ? 'اتصل بنا' : 'Contact',
    login: isAr ? 'تسجيل الدخول' : 'Login',
    heroHeadline: isAr ? 'صندوق وارد واحد لجميع محادثات عملائك.' : 'One Shared Inbox for Every Customer Conversation.',
    heroSub: isAr 
      ? 'توقف عن التنقل بين النوافذ. اجمع محادثات WhatsApp، Messenger، البريد الإلكتروني، وغيرها في منصة واحدة. ادعم فريقك بميزات التعاون والملاحظات الخاصة والأتمتة الذكية لتقديم خدمة عملاء استثنائية.' 
      : 'Stop switching tabs. Unify WhatsApp, Messenger, Email, and social platforms in a single powerful dashboard. Empower your team with private notes, smart automations, and full customer context.',
    getStarted: isAr ? 'ابدأ الآن' : 'Get Started',
    feat1Title: isAr ? 'صندوق وارد متكامل (Omnichannel)' : 'The Unified Omnichannel Inbox',
    feat1Desc: isAr 
      ? 'اربط جميع قنوات التواصل الخاصة بك (واتساب بيزنس، ماسنجر، انستغرام، تيك توك، وغيرها) في شاشة واحدة. لا تفقد سياق أي محادثة بعد اليوم، وقم بالرد على جميع عملائك من واجهة عمل موحدة.' 
      : 'Connect all your communication channels (WhatsApp Business, Messenger, Instagram, TikTok & more) into one screen. Never lose context again, and respond to all your customers from a single, unified interface.',
    feat2Title: isAr ? 'صُممت لتعاون فرق العمل' : 'Built for Team Collaboration',
    feat2Desc: isAr 
      ? 'لا تعمل في جزر معزولة. استخدم المنشن (@mentions) للإشارة لزملائك، أضف ملاحظات خاصة لا يراها العميل، وتجنب تضارب الردود (Agent Collision) لضمان تجربة عميل سلسة واحترافية.' 
      : 'Don\'t work in silos. Use @mentions to tag teammates, add private notes that the customer can\'t see, and avoid agent collision to ensure a seamless, professional customer experience.',
    feat3Title: isAr ? 'سياق العميل وإدارة جهات الاتصال (CRM)' : 'Customer Context & Mini-CRM',
    feat3Desc: isAr 
      ? 'اعرف من تحدث. تعرض المنصة سجل المحادثات السابقة، وبيانات العميل، وسمات مخصصة (Custom Attributes) بجانب شاشة الدردشة مباشرة، مما يتيح لفريقك تقديم دعم شخصي ودقيق.' 
      : 'Know who you are talking to. The platform displays past conversation history, customer data, and custom attributes right next to the chat screen, allowing your team to provide personalized and precise support.',
    feat4Title: isAr ? 'الأتمتة، القواعد الذكية والمقروءات' : 'Smart Automations & Macros',
    feat4Desc: isAr 
      ? 'وفر مئات الساعات شهرياً. استخدم الأتمتة (Automations) لتوجيه المحادثات للقسم المختص بناءً على الكلمات المفتاحية، واستخدم الردود الجاهزة (Macros) للإجابة على الأسئلة الشائعة بضغطة زر.' 
      : 'Save hundreds of hours monthly. Use Automations to route conversations to the right department based on keywords, and use canned responses (Macros) to answer FAQs with a single click.',
    advTitle: isAr ? 'ميزات الدعم المتقدمة' : 'Advanced Support Features',
    advSub: isAr ? 'صُممت للشركات التي تبحث عن أداء عالٍ وإنتاجية قصوى' : 'Built for businesses looking for high performance and maximum productivity',
    advLiveChat: isAr ? 'أداة المحادثة المباشرة (Live Web Chat)' : 'Live Web Chat Widget',
    advLiveChatDesc: isAr ? 'تفاعل مع زوار موقعك في الوقت الفعلي من خلال أداة دردشة قابلة للتخصيص والدمج.' : 'Engage website visitors in real-time with a customizable, embeddable chat widget.',
    advInstaBot: isAr ? 'تكامل انستغرام والروبوتات الذكية' : 'Instagram & Bot Integration',
    advInstaBotDesc: isAr ? 'اربط رسائل انستغرام مباشرة وادمج روبوتات الذكاء الاصطناعي (مثل Dialogflow) للدعم الآلي من المستوى الأول.' : 'Seamlessly connect Instagram Direct and integrate AI chatbots (like Dialogflow) for tier-1 automated support.',
    advProductivity: isAr ? 'أدوات إنتاجية الوكلاء' : 'Agent Productivity Tools',
    advProductivityDesc: isAr ? 'ادعم فريقك بملاحظات داخلية خاصة، وردود سريعة، واكتشاف تضارب الردود في الوقت الفعلي لمنع التكرار.' : 'Empower agents with Private Internal Notes, Canned Responses, and real-time Collision Detection to prevent duplicate replies.',
    advCsat: isAr ? 'استبيانات رضا العملاء (CSAT) الآلية' : 'Automated CSAT Surveys',
    advCsatDesc: isAr ? 'قم بقياس أداء الفريق فوراً عبر إرسال استبيانات رضا العملاء التلقائية بعد حل كل محادثة.' : 'Measure team performance instantly by sending automated Customer Satisfaction surveys right after a conversation is resolved.',
    advAnalytics: isAr ? 'تحليلات وتقارير متقدمة' : 'Advanced Analytics & Reporting',
    advAnalyticsDesc: isAr ? 'تتبع مؤشرات الأداء الرئيسية مثل وقت الاستجابة الأول (FRT)، ووقت الحل، وأعباء عمل الوكلاء من لوحة تحكم موحدة.' : 'Track key performance metrics like First Response Time (FRT), Resolution Time, and agent workloads from a unified dashboard.',
    builtFor: isAr ? 'منصة دعم عملاء شاملة' : 'Omnichannel Customer Support',
    rights: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    privacy: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    terms: isAr ? 'شروط الخدمة' : 'Terms of Service',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link href={`/${lang}`} className="flex items-center gap-2">
                <img src="/atlahub-chat-logo.png" alt="AtlaHub Tech Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm" />
                <span className="font-bold text-xl tracking-tight text-indigo-900">AtlaHub Tech</span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <a href="#features" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">{t.features}</a>
              <a href="mailto:support@atlahub.tech" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">{t.contact}</a>
            </nav>

            {/* Login CTA */}
            <div className="flex items-center">
              <a 
                href="https://app.atlahub.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all"
              >
                {t.login}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <main className="flex-grow">
        <section className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-32 bg-white">
          <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
              <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              {t.builtFor}
            </div>

            <h1 className="max-w-5xl mx-auto text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-8">
              {t.heroHeadline}
            </h1>
            
            <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-600 mb-12 leading-relaxed">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="https://app.atlahub.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
              >
                {t.getStarted}
              </a>
            </div>

            {/* Dashboard Mockup Image - Uncropped Natural Height */}
            <div className="mt-20 relative max-w-6xl mx-auto px-4 sm:px-0">
               <img 
                 src="/pics/dashboard.jpg" 
                 alt="AtlaHub Dashboard" 
                 className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200/60 object-contain bg-slate-50"
               />
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION ── */}
        <section id="features" className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">{t.features}</h2>
            </div>

            <div className="space-y-32">
              {/* Feature 1 - Unified Inbox */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
                  <img src="/pics/inboxes.jpg" alt="Inbox Integration" className="w-full h-auto rounded-2xl shadow-xl border border-slate-200" />
                </div>
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.feat1Title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed">{t.feat1Desc}</p>
                </div>
              </div>

              {/* Feature 2 - Collaboration */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-1'}`}>
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.feat2Title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed">{t.feat2Desc}</p>
                </div>
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-2'}`}>
                  <img src="/pics/chat.jpg" alt="Team Collaboration" className="w-full h-auto rounded-2xl shadow-xl border border-slate-200" />
                </div>
              </div>

              {/* Feature 3 - CRM & Context */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
                  <img src="/pics/integration.jpg" alt="Customer CRM Context" className="w-full h-auto rounded-2xl shadow-xl border border-slate-200" />
                </div>
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.feat3Title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed">{t.feat3Desc}</p>
                </div>
              </div>

              {/* Feature 4 - Automations & Macros */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-1'}`}>
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.feat4Title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed">{t.feat4Desc}</p>
                </div>
                <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-2'} grid grid-cols-1 sm:grid-cols-2 gap-6`}>
                   <img src="/pics/automations.jpg" alt="Automations" className="w-full h-auto rounded-2xl shadow-lg border border-slate-200" />
                   <img src="/pics/Macros.jpg" alt="Macros" className="w-full h-auto rounded-2xl shadow-lg border border-slate-200" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── ADVANCED FEATURES SECTION ── */}
        <section id="advanced" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">{t.advTitle}</h2>
              <p className="mt-4 text-xl text-slate-600">{t.advSub}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.advLiveChat}</h3>
                <p className="text-slate-600 leading-relaxed">{t.advLiveChatDesc}</p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.advInstaBot}</h3>
                <p className="text-slate-600 leading-relaxed">{t.advInstaBotDesc}</p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.advProductivity}</h3>
                <p className="text-slate-600 leading-relaxed">{t.advProductivityDesc}</p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.advCsat}</h3>
                <p className="text-slate-600 leading-relaxed">{t.advCsatDesc}</p>
              </div>

              {/* Card 5 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.advAnalytics}</h3>
                <p className="text-slate-600 leading-relaxed">{t.advAnalyticsDesc}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER (COMPLIANCE REQUIRED) ── */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-col items-center md:items-start">
              <span className="text-white text-lg font-bold mb-1">AtlaHub Tech - AhMad Zayed</span>
              <p className="text-sm">© {new Date().getFullYear()} AtlaHub Tech. {t.rights}</p>
            </div>

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
