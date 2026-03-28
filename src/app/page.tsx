import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { DemoPreview } from "@/components/landing/demo-preview";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { WaitlistCTA } from "@/components/landing/waitlist-cta";

export const metadata: Metadata = {
  title: "MeetingAgent | Tus reuniones → acción en 2 minutos",
  description: "Pipeline de IA 100% local: transcribe con Whisper, extrae action items con LangGraph y genera un report en Markdown. Sin APIs de pago ni nube. Open source.",
  alternates: { canonical: "https://meetingagent.dev" },
  openGraph: {
    title: "MeetingAgent | Tus reuniones → acción en 2 minutos",
    description: "Pipeline de IA 100% local. Whisper + LangGraph + ChromaDB. $0, open source.",
    url: "https://meetingagent.dev",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

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
