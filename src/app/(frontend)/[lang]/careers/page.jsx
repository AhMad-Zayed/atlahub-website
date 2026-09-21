import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import content from '@/data/content.json';
import Link from 'next/link';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr
      ? 'فرص العمل | أتلا هاب تك'
      : 'Careers | Atla Hub Tech',
    description: isAr
      ? 'انضم إلى فريق أتلا هاب تك — نبحث عن موظفة تسويق رقمي وإدارة محتوى للعمل من رام الله.'
      : 'Join the Atla Hub Tech team — we are hiring a Digital Marketing & Content Coordinator based in Ramallah.',
    alternates: {
      canonical: `https://www.atlahub.tech/${lang}/careers`,
    },
  };
}

const job = {
  ar: {
    pageTitle: 'فرص العمل',
    pageSubtitle: 'أتلا هاب تك — رام الله، فلسطين',
    postedLabel: 'تاريخ النشر',
    postedDate: 'سبتمبر 2026',
    departmentLabel: 'القسم',
    department: 'التسويق والمحتوى',
    typeLabel: 'نوع الدوام',
    type: 'دوام كامل',
    locationLabel: 'مكان العمل',
    location: 'رام الله — الشرفا',
    experienceLabel: 'الخبرة',
    experience: 'سنتان إلى ثلاث سنوات',
    salaryLabel: 'الراتب',
    salary: 'يُحدد بناءً على الخبرة والكفاءة',
    title: 'موظفة تسويق رقمي وإدارة محتوى',
    subtitle: 'Digital Marketing & Content Coordinator',
    intro: 'تعلن أتلا هاب تك عن حاجتها لتوظيف موظفة بدوام كامل من مقر الشركة في رام الله، لديها خبرة عملية مثبتة في التسويق الرقمي وإدارة حسابات التواصل الاجتماعي، للعمل على تنسيق وإدارة الأنشطة التسويقية لعدد من الشركات والعملاء.',
    applyTitle: 'طريقة التقديم',
    applyBody: 'يُرجى إرسال السيرة الذاتية مع نماذج من الأعمال السابقة أو الحملات الإعلانية التي تمت إدارتها إلى:',
    applyBtn: 'أرسلي طلبك الآن',
    applyEmail: 'career@atlahub.tech',
    backLabel: 'العودة للرئيسية',
    sections: [
      {
        title: 'المهام والمسؤوليات',
        items: [
          'التنسيق المباشر مع الشركات والعملاء، ومتابعة طلباتهم واحتياجاتهم التسويقية.',
          'التنسيق مع قسم التصميم ومتابعة تنفيذ وتسليم المواد الإعلانية والمحتوى ضمن المواعيد المحددة.',
          'إعداد وتنظيم خطط المحتوى الشهرية وإدارة جدول النشر.',
          'إدارة صفحات التواصل الاجتماعي ومتابعة النشر والتفاعل.',
          'إعداد وكتابة المحتوى التسويقي والإعلاني بما يتناسب مع طبيعة كل شركة وجمهورها.',
          'إنشاء وإدارة الحملات الإعلانية الممولة عبر Meta Ads (Facebook وInstagram) وTikTok Ads.',
          'تحديد الميزانيات الإعلانية وتوزيعها ومتابعة الإنفاق وتحليل نتائج الحملات.',
          'إعداد تقارير دورية عن أداء الحملات وصفحات التواصل الاجتماعي، مع تقديم توصيات للتحسين.',
          'تصميم وتحرير الريلز والستوريات والبوستات البسيطة عند الحاجة، خصوصاً في أوقات ضغط العمل أو التغطيات الميدانية.',
          'تنظيم ومتابعة المهام والمواعيد باستخدام منصة Trello، وضمان سير العمل بين العملاء وفريق التصميم.',
        ],
      },
      {
        title: 'المؤهلات والخبرات المطلوبة',
        items: [
          'شهادة جامعية في التسويق الرقمي، التسويق، الإعلام، أو أي تخصص ذي صلة.',
          'خبرة عملية مثبتة لا تقل عن سنتين إلى ثلاث سنوات في التسويق الرقمي وإدارة حسابات التواصل الاجتماعي.',
          'خبرة فعلية في إعداد وإدارة الحملات الإعلانية الممولة على Meta وTikTok.',
          'القدرة على إعداد خطط المحتوى وكتابة النصوص التسويقية والإعلانية.',
          'معرفة جيدة بأدوات التصميم والمونتاج المتعارف عليها.',
          'إجادة استخدام Trello أو منصات مشابهة لإدارة المهام والمشاريع.',
          'مهارات عالية في التواصل والتنظيم وإدارة الوقت والعمل على عدة مشاريع بالتوازي.',
          'القدرة على العمل ضمن فريق والالتزام بالمواعيد في بيئة عمل متسارعة.',
        ],
      },
      {
        title: 'يُفضّل توفر',
        items: [
          'خبرة سابقة في العمل ضمن شركة تسويق رقمي أو وكالة إعلانية.',
          'القدرة على قراءة وتحليل مؤشرات الأداء الإعلاني مثل CPC وCTR وROAS.',
          'نماذج أعمال أو حملات إعلانية سابقة يمكن عرضها خلال المقابلة.',
        ],
      },
    ],
  },
  en: {
    pageTitle: 'Careers',
    pageSubtitle: 'Atla Hub Tech — Ramallah, Palestine',
    postedLabel: 'Posted',
    postedDate: 'September 2026',
    departmentLabel: 'Department',
    department: 'Marketing & Content',
    typeLabel: 'Employment Type',
    type: 'Full-Time',
    locationLabel: 'Location',
    location: 'Ramallah — Al-Shurafa',
    experienceLabel: 'Experience',
    experience: '2 to 3 Years',
    salaryLabel: 'Salary',
    salary: 'Based on experience and competency',
    title: 'Digital Marketing & Content Coordinator',
    subtitle: 'موظفة تسويق رقمي وإدارة محتوى',
    intro: 'Atla Hub Tech is seeking a full-time, on-site Digital Marketing & Content Coordinator with proven experience in digital marketing and social media account management. The role involves coordinating and managing marketing activities for multiple companies and clients.',
    applyTitle: 'How to Apply',
    applyBody: 'Please send your CV along with samples of previous work or advertising campaigns you have managed to:',
    applyBtn: 'Submit Your Application',
    applyEmail: 'career@atlahub.tech',
    backLabel: 'Back to Home',
    sections: [
      {
        title: 'Responsibilities',
        items: [
          'Direct coordination with companies and clients, following up on their marketing requests and needs.',
          'Coordination with the design department and tracking the execution and delivery of advertising materials and content within deadlines.',
          'Preparing and organizing monthly content plans and managing the publishing schedule.',
          'Managing social media pages and following up on publishing and engagement.',
          'Preparing and writing marketing and advertising content tailored to each company and its audience.',
          'Creating and managing paid advertising campaigns via Meta Ads (Facebook and Instagram) and TikTok Ads.',
          'Setting advertising budgets, distributing them, monitoring spending, and analyzing campaign results.',
          'Preparing periodic performance reports with actionable recommendations for improvement.',
          'Designing and editing Reels, Stories, and simple posts when needed, especially during peak workloads or field coverage.',
          'Organizing and tracking tasks and deadlines using Trello, ensuring smooth workflow between clients and the design team.',
        ],
      },
      {
        title: 'Required Qualifications',
        items: [
          "Bachelor's degree in Digital Marketing, Marketing, Media, or a related field.",
          'At least 2 to 3 years of proven experience in digital marketing and social media account management.',
          'Demonstrated experience creating and managing paid advertising campaigns on Meta and TikTok.',
          'Ability to prepare content plans and write marketing and advertising copy.',
          'Good knowledge of widely-used design and video editing tools.',
          'Proficiency in Trello or similar project management platforms.',
          'Strong communication, organizational, time management, and multitasking skills.',
          'Ability to work within a team and meet deadlines in a fast-paced environment.',
        ],
      },
      {
        title: 'Preferred',
        items: [
          'Prior experience within a digital marketing agency or advertising company.',
          'Ability to interpret advertising performance metrics including CPC, CTR, and ROAS.',
          'A portfolio of past campaigns or creative work available for review during the interview.',
        ],
      },
    ],
  },
};

export default async function CareersPage({ params }) {
  const { lang } = await params;
  const pageContent = content[lang] || content.en;
  const t = job[lang] || job.ar;
  const isAr = lang === 'ar';
  const emailSubject = encodeURIComponent(
    isAr
      ? 'التقدم لوظيفة: موظفة تسويق رقمي وإدارة محتوى'
      : 'Application: Digital Marketing & Content Coordinator'
  );

  return (
    <>
      <Navbar lang={lang} navData={pageContent.nav} brandData={pageContent.brand} />

      <main
        dir={isAr ? 'rtl' : 'ltr'}
        className="min-h-screen bg-white pt-24 pb-20 font-cairo"
      >
        {/* ── Page header ── */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-6 py-10 md:py-14">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 font-tajawal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isAr ? 'rotate-180' : ''}
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              {t.backLabel}
            </Link>

            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue mb-2 font-tajawal">
              {t.pageSubtitle}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {t.pageTitle}
            </h1>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Left: Job details ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Job title block */}
              <div className="pb-8 border-b border-gray-200">
                <div className="inline-block px-3 py-1 rounded-sm bg-green-50 border border-green-200 text-green-700 text-xs font-semibold uppercase tracking-wider mb-4 font-tajawal">
                  {isAr ? 'الوظيفة متاحة الآن' : 'Position Open'}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                  {t.title}
                </h2>
                <p className="text-brand-blue font-tajawal mt-1.5 text-sm font-medium">
                  {t.subtitle}
                </p>
                <p className="mt-5 text-gray-600 font-tajawal leading-relaxed text-base">
                  {t.intro}
                </p>
              </div>

              {/* Sections */}
              {t.sections.map((section) => (
                <div key={section.title} className="pb-8 border-b border-gray-100 last:border-0">
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-5">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600 font-tajawal text-sm leading-relaxed"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Apply block */}
              <div className="bg-gray-950 rounded-xl p-8 text-white">
                <h3 className="text-lg font-bold mb-3">{t.applyTitle}</h3>
                <p className="text-gray-300 font-tajawal text-sm leading-relaxed mb-5">
                  {t.applyBody}
                </p>
                <a
                  href={`mailto:${t.applyEmail}?subject=${emailSubject}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-light text-white font-bold rounded-lg transition-colors duration-200 text-sm"
                >
                  {t.applyBtn}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isAr ? 'rotate-180' : ''}
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <p className="text-gray-400 text-xs mt-4 font-tajawal">{t.applyEmail}</p>
              </div>
            </div>

            {/* ── Right: Meta sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-1 rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-tajawal">
                    {isAr ? 'تفاصيل الوظيفة' : 'Job Details'}
                  </p>
                </div>
                {[
                  { label: t.postedLabel,     value: t.postedDate },
                  { label: t.departmentLabel, value: t.department },
                  { label: t.typeLabel,       value: t.type },
                  { label: t.locationLabel,   value: t.location },
                  { label: t.experienceLabel, value: t.experience },
                  { label: t.salaryLabel,     value: t.salary },
                ].map((row) => (
                  <div key={row.label} className="px-5 py-4 border-b border-gray-100 last:border-0 bg-white">
                    <p className="text-xs text-gray-400 font-tajawal mb-0.5">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-800 font-cairo">{row.value}</p>
                  </div>
                ))}
                <div className="px-5 py-5 bg-gray-50">
                  <a
                    href={`mailto:${t.applyEmail}?subject=${emailSubject}`}
                    className="block w-full text-center px-4 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold rounded-lg transition-colors duration-200 text-sm"
                  >
                    {t.applyBtn}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer lang={lang} navData={pageContent.nav} brandData={pageContent.brand} footerData={pageContent.footer} />
    </>
  );
}
