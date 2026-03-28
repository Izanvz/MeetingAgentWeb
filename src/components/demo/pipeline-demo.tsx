"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { PIPELINE_STEPS, DEMO_TERMINAL_LINES } from "@/lib/constants";
import {
  Play, RotateCcw, CheckCircle, Loader2,
  Mic2, FileText, ListChecks, SearchCode,
  FileAudio, Clock, HardDrive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEP_ICONS: Record<string, LucideIcon> = {
  transcribe: Mic2,
  summarize: FileText,
  actions: ListChecks,
  search: SearchCode,
};

const TABS = ["Resumen", "Action Items", "Report .md"] as const;
type Tab = typeof TABS[number];

const ACTION_ITEMS = [
  { owner: "Izan",   task: "Implementar /demo page interactiva",      deadline: "Hoy" },
  { owner: "Carlos", task: "Review y merge de PR #42",                 deadline: "Mañana" },
  { owner: "Ana",    task: "Actualizar README con setup instructions", deadline: "Viernes" },
  { owner: "Miguel", task: "Configurar entorno de staging",            deadline: "Semana que viene" },
  { owner: "Equipo", task: "Retrospectiva Q1",                         deadline: "Próximo lunes" },
];

const SUMMARY_BLOCKS = [
  {
    heading: "Resumen ejecutivo",
    body: "Standup del 27 de marzo. Se discutió el roadmap Q2, los bloqueantes del sprint actual y los próximos pasos del proyecto MeetingAgent.",
  },
  {
    heading: "Temas principales",
    items: [
      "Roadmap Q2: priorización - demo interactiva, integración Zoom, mejoras de UX",
      "Sprint actual: PR #42 pendiente de review, bloqueante para el deploy",
      "README desactualizado: necesario antes de publicar la demo pública",
    ],
  },
  {
    heading: "Decisiones tomadas",
    items: [
      "Mergear PR #42 antes del viernes como requisito para el deploy",
      "README update obligatorio antes de la demo pública",
      "Retro Q1 pospuesta al lunes próximo",
    ],
  },
];

const REPORT_MD = `# Meeting Report - 2026-03-27
**Duración**: 30:41 min · **Participantes**: Izan, Carlos, Ana, Miguel

---

## Resumen ejecutivo

Standup del 27 de marzo. Roadmap Q2, sprint bloqueantes y próximos pasos.

## Action Items

- [ ] Izan: Implementar /demo page interactiva - **Hoy**
- [ ] Carlos: Review PR #42 - **Mañana**
- [ ] Ana: Actualizar README - **Viernes**
- [ ] Miguel: Setup staging - **Semana que viene**
- [ ] Equipo: Retro Q1 - **Próximo lunes**

---
*Generado por MeetingAgent v0.4.2 · 00:41s · whisper-base + mistral:7b*`;

export function PipelineDemo() {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Resumen");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  async function runPipeline() {
    setRunning(true);
    setDone(false);
    setTerminalLines([]);
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 1800));
    }
    setCurrentStep(PIPELINE_STEPS.length);
    setRunning(false);
    setDone(true);
  }

  function reset() {
    setCurrentStep(-1);
    setDone(false);
    setRunning(false);
    setTerminalLines([]);
  }

  // Stream terminal lines in sync with the pipeline duration
  useEffect(() => {
    if (!running) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < DEMO_TERMINAL_LINES.length) {
        setTerminalLines((prev) => [...prev, DEMO_TERMINAL_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 310);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="space-y-5">
      {/* Input file card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center gap-4">
        <div className="p-2.5 rounded-lg bg-violet-950/50 border border-violet-500/20 shrink-0">
          <FileAudio className="w-5 h-5 text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-200" style={{ fontFamily: "var(--font-code)" }}>
            standup-2026-03-27.mp3
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Español · 847 palabras estimadas</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-600 shrink-0">
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 30:41</span>
          <span className="flex items-center gap-1.5"><HardDrive className="w-3 h-3" /> 2.4 MB</span>
        </div>
      </div>

      {/* Pipeline nodes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PIPELINE_STEPS.map((step, i) => {
          const state =
            currentStep > i ? "done" :
            currentStep === i ? "running" : "idle";
          const Icon = STEP_ICONS[step.id] ?? FileText;
          return (
            <motion.div
              key={step.id}
              className={`rounded-xl border p-4 transition-colors ${
                state === "done"    ? "border-violet-500/40 bg-violet-950/20" :
                state === "running" ? "border-violet-500/70 bg-violet-950/30 shadow-lg shadow-violet-500/10" :
                                      "border-zinc-800 bg-zinc-900/50"
              }`}
              animate={state === "running" ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ repeat: state === "running" ? Infinity : 0, duration: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`p-1.5 rounded-lg ${
                  state === "done"    ? "bg-violet-950/60 text-violet-400" :
                  state === "running" ? "bg-violet-950/60 text-violet-300" :
                                        "bg-zinc-800 text-zinc-500"
                }`}>
                  <Icon className="w-4 h-4" />
                </span>
                {state === "running" && <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />}
                {state === "done"    && <CheckCircle className="w-4 h-4 text-violet-400" />}
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${state === "idle" ? "text-zinc-500" : "text-zinc-100"}`}>
                {step.label}
              </h3>
              <p className={`text-xs leading-relaxed ${state === "idle" ? "text-zinc-600" : "text-zinc-400"}`}>
                {state === "done" ? step.output : step.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={runPipeline}
          disabled={running}
          className="bg-violet-500 hover:bg-violet-600 text-white gap-2"
        >
          <Play className="w-4 h-4" />
          {running ? "Procesando..." : done ? "Ejecutar de nuevo" : "Ejecutar pipeline"}
        </Button>
        {(done || currentStep >= 0) && (
          <Button onClick={reset} variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
            <RotateCcw className="w-4 h-4" />
            Resetear
          </Button>
        )}
      </div>

      {/* Animated terminal */}
      <AnimatePresence>
        {(running || done) && terminalLines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TerminalWindow title="meeting-agent - pipeline output">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed ${
                    line?.startsWith("✓")      ? "text-emerald-400" :
                    line?.startsWith("▶")      ? "text-violet-400" :
                    line?.startsWith("[node:") ? "text-cyan-400/80" :
                    line?.startsWith("  →")   ? "text-zinc-300" :
                    line?.startsWith("$")      ? "text-zinc-100" :
                    "text-zinc-500"
                  }`}
                >
                  {line ?? "\u00A0"}
                </div>
              ))}
              {running && (
                <span className="inline-block w-1.5 h-3.5 bg-violet-400 animate-pulse ml-0.5 align-middle" />
              )}
            </TerminalWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabbed output */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-zinc-800 overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex border-b border-zinc-800 bg-zinc-900/60">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "text-violet-300 border-b border-violet-400 bg-violet-950/20"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  style={{ fontFamily: "var(--font-label)" }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5 bg-zinc-900/30">
              {/* Resumen */}
              {activeTab === "Resumen" && (
                <div className="space-y-4">
                  {SUMMARY_BLOCKS.map((block, i) => (
                    <div key={i}>
                      <p
                        className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-label)" }}
                      >
                        {block.heading}
                      </p>
                      {"body" in block ? (
                        <p className="text-sm text-zinc-300 leading-relaxed">{block.body}</p>
                      ) : (
                        <ul className="space-y-1">
                          {block.items!.map((item, j) => (
                            <li key={j} className="text-xs text-zinc-400 flex gap-2">
                              <span className="text-zinc-600 shrink-0">·</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Items */}
              {activeTab === "Action Items" && (
                <ul className="space-y-2.5">
                  {ACTION_ITEMS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-0.5 w-3.5 h-3.5 rounded border border-zinc-600 shrink-0" />
                      <div>
                        <span className="text-sm text-zinc-200">{item.task}</span>
                        <span
                          className="text-xs text-zinc-500 ml-1.5"
                          style={{ fontFamily: "var(--font-code)" }}
                        >
                          · {item.owner} · {item.deadline}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* Report .md */}
              {activeTab === "Report .md" && (
                <pre
                  className="text-xs text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap"
                  style={{ fontFamily: "var(--font-code)" }}
                >
                  {REPORT_MD}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
