import { Hero } from '@/components/Hero';
import { BestServiceSection } from '@/components/BestServiceSection';
import { MostSearchedCars } from '@/components/MostSearchedCars';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CustomerExperienceSection } from '@/components/CustomerExperienceSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <MostSearchedCars />
      <BestServiceSection />
      <HowItWorksSection />
      <CustomerExperienceSection />
      <Footer />
    </main>
  );
}

