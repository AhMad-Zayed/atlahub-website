import content from '@/data/content.json';
import PortfolioCard from '@/components/Portfolio/PortfolioCard';
import { getMergedPortfolio } from '@/lib/portfolio-content';

function StaticPortfolioCard(props) {
  return <PortfolioCard {...props} mounted={false} />;
}

export default async function PortfolioIndexPage({ params }) {
  const { lang } = await params;
  const pageContent = content[lang] || content.en;
  const portfolio = await getMergedPortfolio(pageContent.portfolio);

  return (
    <section className="relative overflow-hidden bg-[#09111e] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(249,115,22,0.22),transparent_22%),radial-gradient(circle_at_84%_10%,rgba(236,72,153,0.18),transparent_18%),radial-gradient(circle_at_76%_76%,rgba(16,185,129,0.18),transparent_18%),radial-gradient(circle_at_18%_80%,rgba(56,189,248,0.18),transparent_20%),linear-gradient(180deg,#09111e_0%,#10203b_52%,#09111e_100%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 font-tajawal text-[0.78rem] uppercase tracking-[0.42em] text-slate-200/75">
            {portfolio.headline}
          </p>
          <h1 className="font-cairo text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {portfolio.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-tajawal text-lg leading-8 text-slate-200 md:text-lg">
            {portfolio.subheadline}
          </p>
        </div>

        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {portfolio.list.map((item, index) => (
            <StaticPortfolioCard
              key={item.id}
              item={item}
              href={`/${lang}/portfolio/${item.id}`}
              projectsLabel={portfolio.projectsLabel}
              viewCategory={portfolio.viewCategory}
              videoLabel={portfolio.videoLabel}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
