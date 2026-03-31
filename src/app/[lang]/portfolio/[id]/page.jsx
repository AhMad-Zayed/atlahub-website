import { notFound } from 'next/navigation';
import content from '@/data/content.json';
import PortfolioDetailClient from '@/components/Portfolio/PortfolioDetailClient';

export default async function PortfolioDetailPage({ params }) {
  const { lang, id } = await params;
  const pageContent = content[lang] || content.en;
  const portfolio = pageContent.portfolio;
  const item = portfolio?.list?.find((entry) => entry.id === id);
  const detail = portfolio?.details?.[id];

  if (!item || !detail) {
    notFound();
  }

  const labels = {
    backToPortfolio: lang === 'ar' ? 'العودة إلى الأعمال' : 'Back to Portfolio',
    portfolioLabel: portfolio.headline,
    projectsLabel: portfolio.projectsLabel,
    caseStudyLabel: lang === 'ar' ? 'دراسة حالة' : 'Case Study',
    sectorLabel: lang === 'ar' ? 'القطاع' : 'Sector',
    role: lang === 'ar' ? 'الدور' : 'Role',
    action: lang === 'ar' ? 'التنفيذ' : 'Action',
    result: lang === 'ar' ? 'النتيجة' : 'Result',
    references: lang === 'ar' ? 'المراجع' : 'References',
    playVideo: lang === 'ar' ? 'تشغيل' : 'Play',
    screenings: lang === 'ar' ? 'الإطارات المرئية' : 'Studio Frames',
    visualStack: lang === 'ar' ? 'التسلسل البصري' : 'Visual Stack',
    visualReview: lang === 'ar' ? 'استعراض كامل بدون قص' : 'Full image review with zero crop',
    imageFrames: lang === 'ar' ? 'إطارات' : 'Frames',
    videoLabel: portfolio.videoLabel,
    openMedia: lang === 'ar' ? 'فتح الوسيط' : 'Open media',
    closeGallery: lang === 'ar' ? 'إغلاق المعرض' : 'Close gallery',
    nextMedia: lang === 'ar' ? 'التالي' : 'Next',
    previousMedia: lang === 'ar' ? 'السابق' : 'Previous',
  };

  return <PortfolioDetailClient lang={lang} item={item} detail={detail} labels={labels} />;
}
