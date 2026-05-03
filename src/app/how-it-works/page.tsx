import type { Metadata } from "next";
import Link from "next/link";
import { PIPELINE_STEPS, SITE } from "@/lib/constants";
import { CopyBlock } from "@/components/shared/copy-block";

export const metadata: Metadata = {
  title: "Arquitectura técnica | MeetingAgent",
  description: "Arquitectura de MeetingAgent: LangGraph v0.4 con 4 nodos, faster-whisper local, Mistral 7b vía Ollama, ChromaDB y SQLite. 37 tests pasando. Open source.",
  alternates: { canonical: "https://meetingagent.dev/how-it-works" },
  openGraph: {
    title: "Arquitectura técnica | MeetingAgent",
    description: "LangGraph + faster-whisper + Mistral 7b + ChromaDB. Todo local, auditable y modificable.",
    url: "https://meetingagent.dev/how-it-works",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};
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
          Diseñado para desarrolladores. Sin magia negra: todo es auditable y modificable.
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
      <section className="mb-16">
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

      {/* Run it yourself */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-100 mb-2 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-emerald-500 inline-block" />
          Pruébalo tú mismo
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Requisitos: Docker · Compose ·{" "}
          <a
            href="https://ollama.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
          >
            Ollama
          </a>{" "}
          con <code className="text-violet-400 bg-violet-950/30 px-1.5 py-0.5 rounded text-xs" style={{ fontFamily: "var(--font-code)" }}>mistral:7b</code>
        </p>

        <div className="space-y-3">
          <CopyBlock
            title="bash"
            code={`# 1. Clona el repositorio
$ git clone https://github.com/Izanvz/MeetingAgent.git
$ cd MeetingAgent

# 2. Levanta los servicios (Ollama + ChromaDB + API)
$ docker-compose up

# 3. Procesa tu primera reunión
$ meeting-agent process --input tu-reunion.mp3`}
          />
        </div>

        {/* Requirements checklist */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { label: "Docker + Compose", note: "Para los servicios" },
            { label: "Ollama + mistral:7b", note: "ollama pull mistral:7b" },
            { label: "Python 3.12+", note: "Para el CLI local" },
          ].map(({ label, note }) => (
            <div
              key={label}
              className="flex items-start gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3"
            >
              <span className="mt-0.5 w-4 h-4 rounded-full border border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm text-zinc-200 font-medium">{label}</p>
                <p className="text-xs text-zinc-500 mt-0.5" style={{ fontFamily: "var(--font-code)" }}>{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-800/60 px-4 py-2.5 text-sm text-zinc-300 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Ver código en GitHub
          </a>
          <Link
            href="/demo"
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1.5"
          >
            ← Ver la demo interactiva
          </Link>
        </div>
      </section>
    </div>
  );
}
