import content from '@/data/content.json';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Sections/HeroSlider';
import Services from '@/components/Sections/Services';
import Process from '@/components/Sections/Process';
import Portfolio from '@/components/Sections/Portfolio';
import Founder from '@/components/Sections/Founder';
import Clients from '@/components/Sections/Clients';
import Academy from '@/components/Sections/Academy';
import WhyUs from '@/components/Sections/WhyUs';
import Contact from '@/components/Sections/Contact';
import { getMergedPortfolio } from '@/lib/portfolio-content';

export default async function Home({ params }) {
  const { lang } = await params;
  const pageContent = content[lang] || content.en;
  const portfolio = await getMergedPortfolio(pageContent.portfolio);

  return (
    <>
      <Navbar lang={lang} navData={pageContent.nav} brandData={pageContent.brand} />
      <Hero data={pageContent.hero} />
      <Services data={pageContent.services} lang={lang} />
      <Process data={pageContent.process} />
      <Portfolio data={portfolio} lang={lang} />
      <Founder data={pageContent.founder} />
      <Clients data={pageContent.clients} lang={lang} />
      <Academy data={pageContent.training} />
      <WhyUs data={pageContent.whyUs} />
      <Contact data={pageContent.contact} />
      <Footer lang={lang} navData={pageContent.nav} brandData={pageContent.brand} footerData={pageContent.footer} />
    </>
  );
}
