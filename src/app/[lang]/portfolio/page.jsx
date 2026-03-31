import content from '@/data/content.json';
import PortfolioCard from '@/components/Portfolio/PortfolioCard';

function StaticPortfolioCard(props) {
  return <PortfolioCard {...props} mounted={false} />;
}

export default async function PortfolioIndexPage({ params }) {
  const { lang } = await params;
  const pageContent = content[lang] || content.en;
  const portfolio = pageContent.portfolio;

  return (
    <section className="relative overflow-hidden bg-[#08111d] py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_58%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.42em] text-white/55">
            {portfolio.headline}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic tracking-tight text-white md:text-6xl">
            {portfolio.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            {portfolio.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
