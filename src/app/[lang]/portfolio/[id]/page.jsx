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
    role: lang === 'ar' ? 'الدور' : 'Role',
    action: lang === 'ar' ? 'التنفيذ' : 'Action',
    result: lang === 'ar' ? 'النتيجة' : 'Result',
    references: lang === 'ar' ? 'المراجع' : 'References',
    playVideo: lang === 'ar' ? 'تشغيل' : 'Play',
    screenings: lang === 'ar' ? 'العروض المرئية' : 'Screenings',
    videoPreview: lang === 'ar' ? 'معاينة الفيديو' : 'Video Preview',
  };

  return <PortfolioDetailClient lang={lang} item={item} detail={detail} labels={labels} />;
}
