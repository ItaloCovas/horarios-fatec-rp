import { AboutUsSection } from './AboutUsSection';
import { Footer } from './Footer';
import { IntroductionSection } from './IntroductionSection';

export function MainContentWrapper() {
  return (
    <main className="bg-[#F9F9F9]">
      <IntroductionSection />
      <AboutUsSection />
      <Footer />
    </main>
  );
}
