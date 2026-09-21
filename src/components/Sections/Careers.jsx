'use client';

import { useState } from 'react';

// ============================================================
// CareersSection Component — AtlaHub Tech
// ============================================================

const content = {
  ar: {
    badge: 'فرص العمل',
    sectionTitle: 'انضم إلى فريق AtlaHub Tech',
    sectionSubtitle: 'نبحث عن مواهب استثنائية تؤمن بالتميز وتعمل بشغف حقيقي.',
    jobTitle: 'مطلوب موظفة تسويق رقمي وإدارة محتوى',
    jobSubtitle: 'Digital Marketing & Content Coordinator',
    jobIntro:
      'تعلن AtlaHub Tech عن حاجتها لتوظيف موظفة بدوام كامل من مقر الشركة، لديها خبرة عملية مثبتة في التسويق الرقمي وإدارة حسابات التواصل الاجتماعي، للعمل على تنسيق وإدارة الأنشطة التسويقية لعدد من الشركات والعملاء.',
    detailsButton: 'عرض التفاصيل الكاملة',
    hideButton: 'إخفاء التفاصيل',
    applyButton: 'تقدّمي الآن',
    applyEmail: 'career@atlahub.tech',
    workType: 'دوام كامل',
    location: 'رام الله - الشرفا',
    experience: '2 - 3 سنوات',
    salary: 'حسب الخبرة',
    workTypeLabel: 'نوع العمل',
    locationLabel: 'مكان العمل',
    experienceLabel: 'الخبرة المطلوبة',
    salaryLabel: 'الراتب',
    sections: [
      {
        title: 'المهام والمسؤوليات',
        icon: '📋',
        items: [
          'التنسيق المباشر مع الشركات والعملاء، ومتابعة طلباتهم واحتياجاتهم التسويقية.',
          'التنسيق مع قسم التصميم ومتابعة تنفيذ وتسليم المواد الإعلانية والمحتوى ضمن المواعيد المحددة.',
          'إعداد وتنظيم خطط المحتوى الشهرية (Content Calendar) وإدارة جدول النشر.',
          'إدارة صفحات التواصل الاجتماعي ومتابعة النشر والتفاعل.',
          'إعداد وكتابة المحتوى التسويقي والإعلاني بما يتناسب مع طبيعة كل شركة وجمهورها.',
          'إنشاء وإدارة الحملات الإعلانية الممولة عبر Meta Ads (Facebook & Instagram) وTikTok Ads.',
          'تحديد الميزانيات الإعلانية وتوزيعها ومتابعة الإنفاق وتحليل نتائج الحملات.',
          'إعداد تقارير دورية عن أداء الحملات وصفحات التواصل الاجتماعي، مع تقديم توصيات للتحسين.',
          'تصميم وتحرير الريلز والستوريات والبوستات البسيطة عند الحاجة، خصوصاً في أوقات ضغط العمل أو التغطيات الميدانية.',
          'تنظيم ومتابعة المهام والمواعيد باستخدام منصة Trello، وضمان سير العمل بين العملاء وفريق التصميم.',
        ],
      },
      {
        title: 'المؤهلات والخبرات المطلوبة',
        icon: '🎯',
        items: [
          'شهادة جامعية في التسويق الرقمي، التسويق، الإعلام أو أي تخصص ذي صلة.',
          'خبرة عملية مثبتة من سنتين إلى 3 سنوات على الأقل في التسويق الرقمي وإدارة حسابات التواصل الاجتماعي.',
          'خبرة فعلية في إعداد وإدارة الحملات الإعلانية الممولة على Meta وTikTok.',
          'القدرة على إعداد خطط المحتوى وكتابة النصوص التسويقية والإعلانية.',
          'معرفة جيدة بأدوات التصميم والمونتاج المتعارف بها.',
          'إجادة استخدام Trello أو منصات مشابهة لإدارة المهام والمشاريع.',
          'مهارات عالية في التواصل والتنظيم وإدارة الوقت والعمل على عدة مشاريع بالتوازي.',
          'القدرة على العمل ضمن فريق وتحمل ضغط العمل والالتزام بالمواعيد.',
        ],
      },
      {
        title: 'يُفضّل توفر',
        icon: '⭐',
        items: [
          'خبرة سابقة في العمل ضمن شركة تسويق رقمي أو وكالة إعلانية.',
          'القدرة على قراءة وتحليل مؤشرات الأداء الإعلاني مثل CPC وCTR وROAS.',
          'امتلاك نماذج أعمال أو حملات إعلانية سابقة يمكن عرضها خلال المقابلة.',
        ],
      },
    ],
    applyInstructions:
      'على الراغبات في التقدم للوظيفة إرسال السيرة الذاتية (CV)، مع نماذج من الأعمال السابقة أو الحملات الإعلانية التي تمت إدارتها، إلى:',
    closingNote:
      'نرحب بالمواهب الطموحة التي تسعى للنمو والتطور ضمن بيئة عمل احترافية ومحفزة.',
    nowOpen: 'متاح الآن',
    viewGallery: 'عرض التفاصيل',
    howToApply: 'طريقة التقديم',
  },
  en: {
    badge: "We're Hiring",
    sectionTitle: 'Join the AtlaHub Tech Team',
    sectionSubtitle:
      "We're looking for exceptional talent who believe in excellence and work with real passion.",
    jobTitle: 'Digital Marketing & Content Coordinator',
    jobSubtitle: 'مطلوب موظفة تسويق رقمي وإدارة محتوى',
    jobIntro:
      'AtlaHub Tech is seeking a full-time, on-site Digital Marketing & Content Coordinator with proven experience in digital marketing and social media management, to coordinate and manage marketing activities for multiple companies and clients.',
    detailsButton: 'View Full Details',
    hideButton: 'Hide Details',
    applyButton: 'Apply Now',
    applyEmail: 'career@atlahub.tech',
    workType: 'Full-Time',
    location: 'Ramallah - Al-Shurafa',
    experience: '2 - 3 Years',
    salary: 'Based on Experience',
    workTypeLabel: 'Work Type',
    locationLabel: 'Location',
    experienceLabel: 'Experience',
    salaryLabel: 'Salary',
    sections: [
      {
        title: 'Responsibilities',
        icon: '📋',
        items: [
          'Direct coordination with companies and clients, following up on their marketing requests and needs.',
          'Coordination with the design department and tracking the execution and delivery of advertising materials and content within deadlines.',
          'Preparing and organizing monthly content plans (Content Calendar) and managing the publishing schedule.',
          'Managing social media pages and following up on publishing and engagement.',
          'Preparing and writing marketing and advertising content tailored to each company and its audience.',
          'Creating and managing paid advertising campaigns via Meta Ads (Facebook & Instagram) and TikTok Ads.',
          'Setting advertising budgets, distributing them, monitoring spending, and analyzing campaign results.',
          'Preparing periodic reports on campaign performance and social media pages, with recommendations for improvement.',
          'Designing and editing Reels, Stories, and simple posts when needed.',
          'Organizing and tracking tasks and deadlines using Trello.',
        ],
      },
      {
        title: 'Required Qualifications',
        icon: '🎯',
        items: [
          "Bachelor's degree in Digital Marketing, Marketing, Media, or a related field.",
          'Proven work experience of at least 2 to 3 years in digital marketing and social media account management.',
          'Actual experience in creating and managing paid advertising campaigns on Meta and TikTok.',
          'Ability to prepare content plans and write marketing and advertising copy.',
          'Good knowledge of widely-used design and editing tools.',
          'Proficiency in using Trello or similar project management platforms.',
          'Strong communication, organizational, time management, and multi-tasking skills.',
          'Ability to work within a team, handle work pressure, and meet deadlines.',
        ],
      },
      {
        title: 'Preferred',
        icon: '⭐',
        items: [
          'Previous experience working within a digital marketing company or advertising agency.',
          'Ability to read and analyze advertising performance metrics such as CPC, CTR, and ROAS.',
          'Having portfolio samples or past advertising campaigns that can be presented during the interview.',
        ],
      },
    ],
    applyInstructions:
      'Interested candidates should send their CV along with samples of previous work or advertising campaigns managed to:',
    closingNote:
      'We welcome ambitious talents who seek growth and development in a professional and motivating work environment.',
    nowOpen: 'Now Open',
    viewGallery: 'View Details',
    howToApply: 'How to Apply',
  },
};

export default function CareersSection({ data, lang = 'ar' }) {
  const [expanded, setExpanded] = useState(false);
  const t = content[lang] || content.ar;
  const isRtl = lang === 'ar';
  const emailSubject = encodeURIComponent(
    lang === 'ar'
      ? 'التقدم لوظيفة: مسوقة رقمية وإدارة محتوى'
      : 'Application: Digital Marketing & Content Coordinator'
  );

  return (
    <section
      id="careers"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative py-24 md:py-32 bg-gray-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-blue-light animate-pulse" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-cairo text-white mt-3 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-400 text-lg font-tajawal max-w-2xl mx-auto">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Job Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue" />

          {/* Job Header */}
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-2xl">
                    📣
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-bold tracking-wider uppercase">
                    {t.nowOpen}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-cairo text-white leading-tight">
                  {t.jobTitle}
                </h3>
                <p className="text-brand-blue-light font-tajawal mt-1 text-sm">
                  {t.jobSubtitle}
                </p>
              </div>

              {/* Apply CTA — Desktop */}
              <a
                href={`mailto:${t.applyEmail}?subject=${emailSubject}`}
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap font-cairo"
              >
                <span>{t.applyButton}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Quick Info Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: t.workTypeLabel, value: t.workType, icon: '💼' },
                { label: t.locationLabel, value: t.location, icon: '📍' },
                { label: t.experienceLabel, value: t.experience, icon: '📅' },
                { label: t.salaryLabel, value: t.salary, icon: '💰' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/5 border border-white/8 p-4 text-center"
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-500 font-tajawal mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-white font-cairo">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Job Intro */}
            <p className="text-gray-300 font-tajawal leading-relaxed text-base border-s-2 border-brand-blue/50 ps-4 mb-6">
              {t.jobIntro}
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-brand-blue-light hover:text-white font-semibold font-cairo transition-colors duration-200"
            >
              <span>{expanded ? t.hideButton : t.detailsButton}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Expandable Details */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              expanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-8 md:px-10 pb-10 border-t border-white/8 pt-8 space-y-8">
              {t.sections.map((section) => (
                <div key={section.title}>
                  <h4 className="flex items-center gap-2 text-lg font-bold font-cairo text-white mb-4">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300 font-tajawal text-sm leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue-light flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Apply Section */}
              <div className="rounded-2xl bg-brand-blue/8 border border-brand-blue/20 p-6 mt-6">
                <h4 className="font-bold font-cairo text-white text-lg mb-3">{t.howToApply}</h4>
                <p className="text-gray-300 font-tajawal text-sm leading-relaxed mb-4">
                  {t.applyInstructions}
                </p>
                <a
                  href={`mailto:${t.applyEmail}?subject=${emailSubject}`}
                  className="inline-flex items-center gap-2 font-bold text-brand-blue-light hover:text-white transition-colors duration-200 font-cairo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{t.applyEmail}</span>
                </a>
                <p className="text-gray-500 font-tajawal text-xs mt-4 italic">{t.closingNote}</p>
              </div>
            </div>
          </div>

          {/* Apply CTA — Mobile */}
          <div className="md:hidden px-8 pb-8">
            <a
              href={`mailto:${t.applyEmail}?subject=${emailSubject}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 font-cairo"
            >
              <span>{t.applyButton}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
