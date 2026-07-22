import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Sections/Hero';

export const metadata = {
  title: 'Atla Hub Tech – Expert Tech & Media Solutions',
  description:
    'Led by Ahmed Zayed and a team of 6 specialists. We build high-converting systems, bulletproof cybersecurity, and impactful digital marketing.',
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
