import { PricingCard } from "@/components/shared/pricing-card";
import { PRICING_PLANS } from "@/lib/constants";

const COMPARISON = [
  { feature: "Reuniones por mes", free: "5", pro: "Ilimitadas", enterprise: "Ilimitadas" },
  { feature: "Transcripción local (Whisper)", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Action items con IA", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Integración Zoom / Recall.ai", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "Export a Notion / Obsidian", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "LLM a tu elección", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "On-premise deploy", free: "✗", pro: "✗", enterprise: "✓" },
  { feature: "API access", free: "✗", pro: "✗", enterprise: "✓" },
  { feature: "SLA garantizado", free: "✗", pro: "✗", enterprise: "✓" },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Pricing</h1>
        <p className="text-zinc-400">En desarrollo. Todos los planes llevan a la waitlist por ahora.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {PRICING_PLANS.map((plan) => <PricingCard key={plan.name} {...plan} />)}
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="grid grid-cols-4 gap-0 bg-zinc-900 p-4 border-b border-zinc-800">
          <span className="text-sm font-semibold text-zinc-400">Feature</span>
          {["Free", "Pro", "Enterprise"].map((p) => (
            <span key={p} className="text-sm font-semibold text-zinc-300 text-center">{p}</span>
          ))}
        </div>
        {COMPARISON.map((row, i) => (
          <div key={row.feature} className={`grid grid-cols-4 gap-0 p-4 ${i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/30"}`}>
            <span className="text-sm text-zinc-400">{row.feature}</span>
            {[row.free, row.pro, row.enterprise].map((val, j) => (
              <span key={j} className={`text-sm text-center ${val === "✓" ? "text-violet-400" : val === "✗" ? "text-zinc-700" : "text-zinc-300"}`}>
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
