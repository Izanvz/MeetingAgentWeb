import type { Metadata } from "next";
import { PricingCard } from "@/components/shared/pricing-card";

export const metadata: Metadata = {
  title: "Pricing: Free, Pro y Enterprise | MeetingAgent",
  description: "MeetingAgent es open source y gratuito para siempre. Plan Pro con integraciones avanzadas a €9/mes. Enterprise con on-premise, SLA y API access a €49/mes.",
  alternates: { canonical: "https://meetingagent.dev/pricing" },
  openGraph: {
    title: "Pricing | MeetingAgent",
    description: "Free para siempre · Pro €9/mes · Enterprise €49/mes. Simple, transparente, sin sorpresas.",
    url: "https://meetingagent.dev/pricing",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};
import { PRICING_PLANS } from "@/lib/constants";

const COMPARISON = [
  { feature: "Reuniones por mes",              free: "5",          pro: "Ilimitadas",  enterprise: "Ilimitadas" },
  { feature: "Transcripción local (Whisper)",  free: "✓",          pro: "✓",           enterprise: "✓" },
  { feature: "Action items con IA",            free: "✓",          pro: "✓",           enterprise: "✓" },
  { feature: "Integración Zoom / Recall.ai",   free: "✗",          pro: "✓",           enterprise: "✓" },
  { feature: "Export a Notion / Obsidian",     free: "✗",          pro: "✓",           enterprise: "✓" },
  { feature: "LLM a tu elección",              free: "✗",          pro: "✓",           enterprise: "✓" },
  { feature: "On-premise deploy",              free: "✗",          pro: "✗",           enterprise: "✓" },
  { feature: "API access",                     free: "✗",          pro: "✗",           enterprise: "✓" },
  { feature: "SLA garantizado",                free: "✗",          pro: "✗",           enterprise: "✓" },
];

function CellValue({ val }: { val: string }) {
  if (val === "✓") return <span className="text-emerald-400 font-bold">✓</span>;
  if (val === "✗") return <span className="text-zinc-700">-</span>;
  return <span className="text-zinc-300 text-sm">{val}</span>;
}

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-violet-500/8 rounded-full blur-[80px] -z-10" />
        <div className="inline-flex items-center gap-2 text-xs text-violet-400 font-mono bg-violet-950/20 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
          💳 pricing
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">
          Simple.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            Transparente.
          </span>
        </h1>
        <p className="text-zinc-400">En desarrollo. Todos los planes llevan a la waitlist por ahora.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16 items-start">
        {PRICING_PLANS.map((plan) => <PricingCard key={plan.name} {...plan} />)}
      </div>

      {/* Comparison table */}
      <h2 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-cyan-500 inline-block" />
        Comparativa completa
      </h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-0 bg-zinc-900/80 p-4 border-b border-zinc-800">
          <span className="text-sm font-semibold text-zinc-500">Feature</span>
          <span className="text-sm font-semibold text-zinc-300 text-center">Free</span>
          <span className="text-sm font-semibold text-violet-400 text-center">Pro</span>
          <span className="text-sm font-semibold text-zinc-300 text-center">Enterprise</span>
        </div>
        {COMPARISON.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-4 gap-0 p-4 border-b border-zinc-800/50 last:border-0 ${
              i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/30"
            }`}
          >
            <span className="text-sm text-zinc-400">{row.feature}</span>
            {[row.free, row.pro, row.enterprise].map((val, j) => (
              <div key={j} className="text-center flex items-center justify-center">
                <CellValue val={val} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
