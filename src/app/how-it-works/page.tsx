import { PIPELINE_STEPS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const TECH_STACK = [
  { layer: "Orchestration", tech: "LangGraph v0.4", note: "Grafo de nodos con estado compartido" },
  { layer: "Transcription", tech: "OpenAI Whisper", note: "Modelo base, 100% local" },
  { layer: "LLM", tech: "GPT-4o-mini", note: "Resumen y extracción de action items" },
  { layer: "Search", tech: "DuckDuckGo API", note: "Sin API key requerida" },
  { layer: "Framework", tech: "Python 3.11+", note: "Async, type hints, Pydantic" },
  { layer: "Testing", tech: "pytest + unittest.mock", note: "30 tests, 100% de cobertura del pipeline" },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Arquitectura técnica</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Diseñado para desarrolladores. Sin magia negra — todo es auditable y modificable.
        </p>
      </div>

      {/* Pipeline graph */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">Grafo LangGraph</h2>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 text-center min-w-[120px]">
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-sm font-semibold text-zinc-200">{step.label}</div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="text-zinc-600 hidden md:block">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack table */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">Stack técnico</h2>
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          {TECH_STACK.map((row, i) => (
            <div key={row.layer} className={`flex items-start gap-4 p-4 ${i % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-950"}`}>
              <span className="text-xs text-zinc-500 w-28 shrink-0 pt-0.5 font-mono uppercase">{row.layer}</span>
              <Badge variant="outline" className="border-violet-500/30 text-violet-400 shrink-0 font-mono">
                {row.tech}
              </Badge>
              <span className="text-sm text-zinc-400">{row.note}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
