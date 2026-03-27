import { PIPELINE_STEPS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const TECH_STACK = [
  { layer: "Orchestration", tech: "LangGraph v0.4",       note: "Grafo de nodos con estado compartido", color: "border-violet-500/30 text-violet-400" },
  { layer: "Transcription", tech: "faster-whisper",       note: "100% local, sin enviar datos a la nube",  color: "border-cyan-500/30 text-cyan-400" },
  { layer: "LLM",           tech: "Mistral 7b / Ollama",  note: "Configurable: OpenAI, Anthropic, local",  color: "border-fuchsia-500/30 text-fuchsia-400" },
  { layer: "Vector DB",     tech: "ChromaDB",             note: "Búsqueda semántica sobre reuniones pasadas", color: "border-amber-500/30 text-amber-400" },
  { layer: "SQL",           tech: "SQLite",               note: "Persistencia ligera, sin servidor",          color: "border-emerald-500/30 text-emerald-400" },
  { layer: "Testing",       tech: "pytest + asyncio",     note: "37 tests, asyncio_mode=auto",               color: "border-violet-500/30 text-violet-400" },
];

// Each pipeline node gets a color
const NODE_COLORS = [
  "border-cyan-500/40 bg-cyan-950/20 text-cyan-400",
  "border-violet-500/40 bg-violet-950/20 text-violet-400",
  "border-emerald-500/40 bg-emerald-950/20 text-emerald-400",
  "border-amber-500/40 bg-amber-950/20 text-amber-400",
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-violet-500/8 rounded-full blur-[80px] -z-10" />
        <div className="inline-flex items-center gap-2 text-xs text-violet-400 font-mono bg-violet-950/20 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
          🏗️ arquitectura
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Arquitectura técnica</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Diseñado para desarrolladores. Sin magia negra — todo es auditable y modificable.
        </p>
      </div>

      {/* Pipeline graph */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-violet-500 inline-block" />
          Grafo LangGraph
        </h2>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`rounded-xl border p-4 text-center min-w-[120px] transition-all hover:scale-105 duration-200 ${NODE_COLORS[i % NODE_COLORS.length]}`}>
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-sm font-semibold text-zinc-200">{step.label}</div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="text-zinc-500 hidden md:block text-lg">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack table */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-cyan-500 inline-block" />
          Stack técnico
        </h2>
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          {TECH_STACK.map((row, i) => (
            <div key={row.layer} className={`flex items-start gap-4 p-4 ${i % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-950"}`}>
              <span className="text-xs text-zinc-500 w-28 shrink-0 pt-0.5 font-mono uppercase tracking-wide">{row.layer}</span>
              <Badge variant="outline" className={`shrink-0 font-mono text-xs ${row.color}`}>
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
