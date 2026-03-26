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

export default function Home({ params }) {
  const { lang } = params;
  const pageContent = content[lang] || content.en;

  return (
    <>
      <Navbar lang={lang} navData={pageContent.nav} brandData={pageContent.brand} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Process lang={lang} />
      <Portfolio lang={lang} />
      <Founder lang={lang} />
      <Clients lang={lang} />
      <Academy lang={lang} />
      <WhyUs lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} navData={pageContent.nav} brandData={pageContent.brand} footerData={pageContent.footer} />
    </>
  );
}
