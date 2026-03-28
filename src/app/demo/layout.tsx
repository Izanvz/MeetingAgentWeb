import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo del pipeline en acción | MeetingAgent",
  description: "Pipeline completo de MeetingAgent en vivo: Whisper local, LLM y 5 action items en 41 segundos para una reunión de 30 minutos. Sin APIs de pago.",
  alternates: { canonical: "https://meetingagent.dev/demo" },
  openGraph: {
    title: "Demo | MeetingAgent",
    description: "Pipeline completo: Whisper → LangGraph → Markdown. 41 segundos para 30 min de reunión.",
    url: "https://meetingagent.dev/demo",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
