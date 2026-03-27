import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { DemoPreview } from "@/components/landing/demo-preview";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { WaitlistCTA } from "@/components/landing/waitlist-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <DemoPreview />
      <ProblemSolution />
      <HowItWorksSection />
      <IntegrationsSection />
      <PricingSection />
      <WaitlistCTA />
    </>
  );
}
