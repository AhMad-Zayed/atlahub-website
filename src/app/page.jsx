import Hero from '@/components/Sections/Hero';
import Services from '@/components/Sections/Services';
import Process from '@/components/Sections/Process';
import Portfolio from '@/components/Sections/Portfolio';
import Founder from '@/components/Sections/Founder';
import Clients from '@/components/Sections/Clients';
import Academy from '@/components/Sections/Academy';
import WhyUs from '@/components/Sections/WhyUs';
import Contact from '@/components/Sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Founder />
      <Clients />
      <Academy />
      <WhyUs />
      <Contact />
    </>
  );
}