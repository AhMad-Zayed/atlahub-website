import React from 'react';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  return {
    title: isAr ? 'منصة أتلاهاب الشاملة | Omnichannel' : 'AtlaHub Omnichannel Platform',
    description: isAr 
      ? 'قدم دعماً استثنائياً لعملائك من مساحة عمل واحدة متكاملة. توقف عن التنقل بين التبويبات واجمع كل القنوات في مكان واحد.' 
      : 'Deliver Exceptional Customer Support from One Unified Workspace. Connect WhatsApp, Instagram, Messenger, and Email into a single collaborative inbox.',
  };
}

export default async function OmnichannelLandingPage({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    // Navigation
    features: isAr ? 'الميزات' : 'Features',
    contact: isAr ? 'اتصل بنا' : 'Contact',
    login: isAr ? 'تسجيل الدخول' : 'Login',
    
    // Hero Section
    tagline: isAr ? 'منصة أتلاهاب الشاملة (Omnichannel)' : 'AtlaHub Omnichannel Platform',
    headline: isAr ? 'قدم دعماً استثنائياً لعملائك من مساحة عمل واحدة متكاملة.' : 'Deliver Exceptional Customer Support from One Unified Workspace.',
    subHeadline: isAr 
      ? 'توقف عن التنقل بين التبويبات. اجمع واتساب، انستغرام، ماسنجر، البريد الإلكتروني، والمحادثة المباشرة في صندوق وارد تعاوني واحد. ادعم فريقك بأدوات الأتمتة، الذكاء الاصطناعي، وأدوات بمستوى المؤسسات الكبرى.'
      : 'Stop switching tabs. Connect WhatsApp, Instagram, Messenger, Email, and Live Web Chat into a single collaborative inbox. Empower your team with automation, AI, and enterprise-grade tools.',
    btnStart: isAr ? 'ابدأ الآن' : 'Get Started Now',
    btnDemo: isAr ? 'احجز عرضاً توضيحياً' : 'Book a Demo',
    trustBadge: isAr ? 'مزود تقنيات معتمد من ميتا - آمن وممتثل 100%' : 'Verified Meta Tech Provider - 100% Secure & Compliant',

    // Channels (Bento)
    chHeadline: isAr ? 'كن متواجداً أينما كان عملاؤك.' : 'Be wherever your customers are.',
    chWebChat: isAr ? 'المحادثة المباشرة للموقع' : 'Website Live Chat',
    chWebChatDesc: isAr ? 'أضف أداة دردشة سريعة ومخصصة بهويتك مباشرة على موقعك لجمع العملاء المحتملين ودعم الزوار في الوقت الفعلي.' : 'Embed a fast, fully branded live chat widget directly on your website to capture leads and support visitors in real-time.',
    chWa: isAr ? 'واتساب للأعمال (API)' : 'WhatsApp Business API',
    chWaDesc: isAr ? 'طور دعمك عبر واتساب باستخدام الربط الرسمي للـ API. أرسل القوالب وتعامل مع أحجام هائلة من الرسائل.' : 'Scale your WhatsApp support with official API integration. Send templates and handle massive message volumes.',
    chMeta: isAr ? 'حزمة ميتا (ماسنجر وانستغرام)' : 'Meta Suite (Messenger & Instagram)',
    chMetaDesc: isAr ? 'رد على رسائل انستغرام الخاصة، الردود على القصص، وفيسبوك ماسنجر مباشرة من أتلاهاب.' : 'Reply to Instagram DMs, story replies, and Facebook Messenger directly from AtlaHub.',
    chEmail: isAr ? 'دعم البريد الإلكتروني' : 'Email Support',
    chEmailDesc: isAr ? 'قم بتوجيه رسائل الدعم (support@) إلى أتلاهاب وحوّل الرسائل الفوضوية إلى تذاكر منظمة.' : 'Forward your support@ emails into AtlaHub and turn chaotic threads into organized tickets.',
    chMore: isAr ? 'قنوات إضافية' : 'More Channels',
    chMoreDesc: isAr ? 'تيليجرام، لاين (Line)، رسائل SMS (عبر Twilio)، وتويتر.' : 'Telegram, Line, SMS (via Twilio), and Twitter.',

    // Core Products (Alternating)
    cp1Title: isAr ? 'صندوق وارد تعاوني صُمم للفرق، وليس للأفراد.' : 'A collaborative inbox built for teams, not individuals.',
    cp1Desc: isAr ? 'اجمع فرق الدعم، المبيعات، والتسويق معاً. استخدم "الملاحظات الخاصة" لمناقشة المشاكل داخلياً دون أن يراها العميل. استخدم "الإشارات (@)" لإشراك الخبراء. وتضمن ميزة "اكتشاف التضارب" ألا يقوم وكيلان بالرد على نفس العميل في نفس الوقت.' : 'Bring your support, sales, and marketing teams together. Use Private Notes to discuss issues internally without the customer seeing. Use @mentions to loop in experts. Our Collision Detection ensures two agents never reply to the same customer at the same time.',
    cp2Title: isAr ? 'اجعل مهامك المتكررة تعمل تلقائياً.' : 'Put your repetitive tasks on autopilot.',
    cp2Desc: isAr ? 'وفر مئات الساعات. استخدم الردود الجاهزة (Macros) للإجابة على الأسئلة الشائعة بضغطة زر (/). ابنِ قواعد أتمتة قوية لتوجيه المحادثات للقسم المناسب بناءً على الكلمات المفتاحية، وتحديد اتفاقيات مستوى الخدمة (SLAs)، وتعيين التذاكر تلقائياً.' : 'Save hundreds of hours. Use Macros (Canned Responses) to answer FAQs with a single keystroke (/). Build powerful Automation Rules to route conversations to the right department based on keywords, set SLAs, and auto-assign tickets.',
    cp3Title: isAr ? 'اعرف عميلك قبل أن تقول مرحباً.' : 'Know your customer before you say hello.',
    cp3Desc: isAr ? 'تأتي كل محادثة مع سياق غني بالمعلومات. اعرض سجل المحادثات السابقة، والسمات المخصصة، وشرائح المستخدمين بجانب نافذة الدردشة مباشرة. لن تضطر أبداً لسؤال "ما هو رقم طلبك؟" مرة أخرى.' : 'Every conversation comes with rich context. View past conversation history, custom contact attributes, and user segments right beside the chat window. Never ask "What is your order number?" again.',
    cp4Title: isAr ? 'قاعدة معرفة متعددة اللغات.' : 'Multilingual Knowledge Base.',
    cp4Desc: isAr ? 'قلل من عدد تذاكر الدعم عبر بناء مركز مساعدة شامل. أنشئ مقالات بلغات متعددة ودع عملاءك يجدون الإجابات بأنفسهم قبل التواصل مع فريقك.' : 'Deflect support tickets by building a comprehensive Help Center. Create articles in multiple languages and let your customers find answers themselves before reaching out to your team.',

    // Advanced Features
    advTitle: isAr ? 'ميزات تقنية متقدمة' : 'Advanced Technical Features',
    advAi: isAr ? 'المساعد الذكي (AI Copilot) والروبوتات' : 'AI Copilot & Bots',
    advAiDesc: isAr ? 'ادمج Dialogflow أو روبوتات الذكاء الاصطناعي المخصصة للتعامل مع الدعم من المستوى الأول واكتشاف نية العميل.' : 'Integrate Dialogflow or custom AI bots to handle Tier-1 support and intent detection.',
    advCsat: isAr ? 'استبيانات رضا العملاء (CSAT)' : 'CSAT Surveys',
    advCsatDesc: isAr ? 'أرسل استبيانات رضا العملاء تلقائياً (⭐) بمجرد حل المحادثة.' : 'Automatically send Customer Satisfaction surveys (⭐) when a conversation is resolved.',
    advAnalytics: isAr ? 'تحليلات متقدمة' : 'Advanced Analytics',
    advAnalyticsDesc: isAr ? 'تقارير فورية حول وقت الاستجابة الأول (FRT)، وقت الحل، وحجم عمل وأداء الوكلاء.' : 'Real-time reporting on First Response Time (FRT), Resolution Time, and agent performance workloads.',
    advMobile: isAr ? 'تطبيقات الهاتف المحمول' : 'Mobile Apps',
    advMobileDesc: isAr ? 'ادعم عملاءك أثناء التنقل باستخدام تطبيقات مخصصة لنظامي iOS و Android.' : 'Support customers on the go with dedicated iOS and Android apps.',
    advApi: isAr ? 'خطافات الويب (Webhooks) و APIs' : 'Custom Webhooks & APIs',
    advApiDesc: isAr ? 'اربط أتلاهاب بنظام تخطيط موارد المؤسسات (ERP) أو أنظمتك الخلفية بسلاسة تامة.' : 'Connect AtlaHub to your existing ERP or backend systems seamlessly.',

    // Security & Footer
    secTitle: isAr ? 'أمان بمستوى المؤسسات وامتثال معتمد.' : 'Enterprise-Grade Security & Verified Compliance.',
    secDesc: isAr ? 'أتلاهاب تك مزود تقنيات معتمد رسمياً من ميتا. نضمن لك الامتثال بنسبة 100% لسياسات واتساب وماسنجر. بياناتك مشفرة، وآمنة، ومستضافة وفق ضوابط وصول صارمة.' : 'AtlaHub Tech is an officially verified Meta Tech Provider. We guarantee 100% compliance with WhatsApp and Messenger policies. Your data is encrypted, secure, and hosted with strict access controls.',
    rights: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    privacy: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    terms: isAr ? 'شروط الخدمة' : 'Terms of Service',
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link href={`/${lang}`} className="flex items-center gap-2">
                <img src="/atlahub-chat-logo.png" alt="AtlaHub Tech Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm border border-slate-100" />
                <span className="font-bold text-xl tracking-tight text-slate-900">AtlaHub Tech</span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <a href="#channels" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">{t.features}</a>
              <a href="mailto:support@atlahub.tech" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">{t.contact}</a>
            </nav>

            {/* Login CTA */}
            <div className="flex items-center gap-4">
              <a href="https://app.atlahub.tech" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-slate-600 hover:text-blue-600 font-semibold transition-colors">
                {t.login}
              </a>
              <a href="https://app.atlahub.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all">
                {t.btnStart}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* ── 1. HERO SECTION ── */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-slate-50">
          <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold mb-8 shadow-sm">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              {t.trustBadge}
            </div>

            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">{t.tagline}</p>
            
            <h1 className="max-w-5xl text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              {t.headline}
            </h1>
            
            <p className="max-w-3xl text-lg sm:text-xl lg:text-2xl text-slate-600 mb-10 leading-relaxed">
              {t.subHeadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="https://app.atlahub.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all">
                {t.btnStart}
              </a>
              <a href="mailto:sales@atlahub.tech" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                {t.btnDemo}
              </a>
            </div>

            <div className="mt-16 w-full max-w-6xl mx-auto rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden bg-white ring-1 ring-slate-900/5">
               {/* macOS window top bar mockup */}
               <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
               </div>
               <img src="/pics/dashboard.jpg" alt="AtlaHub Dashboard" className="w-full h-auto object-contain" />
            </div>
          </div>
        </section>

        {/* ── 2. THE CHANNELS SECTION (BENTO GRID) ── */}
        <section id="channels" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">{t.chHeadline}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {/* Card 1: WA */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full lg:col-span-2">
                 <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.658.85 5.228 2.476 7.37L.58 24l4.78-1.254A11.914 11.914 0 0012.031 24c6.645 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.016a9.92 9.92 0 01-5.06-1.381l-.36-.214-3.553.931.948-3.464-.236-.376a9.905 9.905 0 01-1.517-5.281c0-5.467 4.453-9.921 9.921-9.921s9.921 4.454 9.921 9.921-4.453 9.921-9.921 9.921z"/></svg>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.chWa}</h3>
                 <p className="text-slate-600 text-lg leading-relaxed flex-grow">{t.chWaDesc}</p>
              </div>

              {/* Card 2: Web Chat */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                 <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">{t.chWebChat}</h3>
                 <p className="text-slate-600 leading-relaxed flex-grow">{t.chWebChatDesc}</p>
              </div>

              {/* Card 3: Meta Suite */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                 <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">{t.chMeta}</h3>
                 <p className="text-slate-600 leading-relaxed flex-grow">{t.chMetaDesc}</p>
              </div>

              {/* Card 4: Email */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                 <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">{t.chEmail}</h3>
                 <p className="text-slate-600 leading-relaxed flex-grow">{t.chEmailDesc}</p>
              </div>

              {/* Card 5: More Channels */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                 <div className="w-14 h-14 bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">{t.chMore}</h3>
                 <p className="text-slate-600 leading-relaxed flex-grow">{t.chMoreDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CORE PRODUCTS (ALTERNATING ROWS) ── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            
            {/* Row 1: Inbox & Collab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
                <img src="/pics/inboxes.jpg" alt="Shared Inbox" className="w-full h-auto rounded-3xl shadow-xl border border-slate-200" />
              </div>
              <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'} lg:px-8`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.cp1Title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed">{t.cp1Desc}</p>
              </div>
            </div>

            {/* Row 2: Automations & Macros */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-1'} lg:px-8`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.cp2Title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed">{t.cp2Desc}</p>
              </div>
              <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-2'} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                <img src="/pics/automations.jpg" alt="Automations" className="w-full h-auto rounded-3xl shadow-lg border border-slate-200" />
                <img src="/pics/Macros.jpg" alt="Macros" className="w-full h-auto rounded-3xl shadow-lg border border-slate-200" />
              </div>
            </div>

            {/* Row 3: CRM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
                <img src="/pics/integration.jpg" alt="Contact Intelligence CRM" className="w-full h-auto rounded-3xl shadow-xl border border-slate-200" />
              </div>
              <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-2'} lg:px-8`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.cp3Title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed">{t.cp3Desc}</p>
              </div>
            </div>

            {/* Row 4: Help Center */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`order-1 ${isAr ? 'lg:order-1' : 'lg:order-1'} lg:px-8`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.cp4Title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed">{t.cp4Desc}</p>
              </div>
              <div className={`order-2 ${isAr ? 'lg:order-2' : 'lg:order-2'} bg-blue-50 rounded-3xl p-12 border border-blue-100 flex items-center justify-center min-h-[300px]`}>
                 <svg className="w-32 h-32 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. ADVANCED FEATURES GRID ── */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-slate-900 mb-16">{t.advTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: t.advAi, desc: t.advAiDesc, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /> },
                { title: t.advCsat, desc: t.advCsatDesc, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
                { title: t.advAnalytics, desc: t.advAnalyticsDesc, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /> },
                { title: t.advMobile, desc: t.advMobileDesc, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
                { title: t.advApi, desc: t.advApiDesc, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. SECURITY & META COMPLIANCE BANNER ── */}
        <section className="py-20 bg-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-8">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">{t.secTitle}</h2>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {t.secDesc}
            </p>
          </div>
        </section>
      </main>

      {/* ── 6. FOOTER ── */}
      <footer className="bg-slate-950 py-12 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-col items-center md:items-start">
              <span className="text-white text-lg font-bold mb-1">AtlaHub Tech - AhMad Zayed</span>
              <p className="text-sm">© {new Date().getFullYear()} AtlaHub Tech. {t.rights}</p>
            </div>

            <div className="flex gap-6 text-sm font-medium">
              <a href="https://atlahub.tech/en/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
                {t.privacy}
              </a>
              <a href="https://atlahub.tech/en/terms" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
                {t.terms}
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
