import { AboutUsSection } from './AboutUsSection';
import { IntroductionSection } from './IntroductionSection';

export function MainContentWrapper() {
  return (
    <main className="bg-[#F9F9F9]">
      <IntroductionSection />
      <AboutUsSection />
    </main>
  );
}
