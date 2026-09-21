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

const siteUrl = 'https://www.atlahub.tech';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  if (isAr) {
    return {
      title: 'أتلا هاب تك | برمجيات، أمن سيبراني، وتسويق رقمي — القدس',
      description:
        'أتلا هاب تك تقدم خدمات تطوير برمجيات، أمن سيبراني وأدلة رقمية، تسويق رقمي، إنتاج إعلامي، وتدريب احترافي. بقيادة أحمد زايد من القدس.',
      alternates: {
        canonical: `${siteUrl}/ar`,
        languages: { 'en': `${siteUrl}/en`, 'ar': `${siteUrl}/ar` },
      },
      openGraph: {
        locale: 'ar_PS',
        alternateLocale: 'en_US',
        url: `${siteUrl}/ar`,
        title: 'أتلا هاب تك | برمجيات، أمن سيبراني، وتسويق رقمي',
        description: 'حلول تقنية متكاملة من القدس: برمجيات، أمن سيبراني، تسويق رقمي، إنتاج إعلامي، وتدريب. بقيادة أحمد زايد.',
      },
    };
  }

  return {
    title: 'Atla Hub Tech | Software, Cybersecurity & Digital Marketing — Jerusalem',
    description:
      'Atla Hub Tech delivers elite software development, cybersecurity & forensics, digital marketing, media production, and professional training from Jerusalem. Led by Ahmad Zayed.',
    alternates: {
      canonical: `${siteUrl}/en`,
      languages: { 'en': `${siteUrl}/en`, 'ar': `${siteUrl}/ar` },
    },
    openGraph: {
      locale: 'en_US',
      alternateLocale: 'ar_PS',
      url: `${siteUrl}/en`,
      title: 'Atla Hub Tech | Software, Cybersecurity & Digital Marketing',
      description: 'Elite tech from Jerusalem: software, cybersecurity, marketing, media & training. Led by Ahmad Zayed.',
    },
  };
}

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

