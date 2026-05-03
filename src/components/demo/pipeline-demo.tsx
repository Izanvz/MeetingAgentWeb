"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { AudioCard } from "@/components/demo/audio-card";
import { PIPELINE_STEPS, DEMO_AUDIOS } from "@/lib/constants";
import type { PipelineStepId } from "@/lib/constants";
import {
  Play, RotateCcw, CheckCircle, Loader2,
  Mic2, FileText, ListChecks, SearchCode,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEP_ICONS: Record<string, LucideIcon> = {
  transcribe: Mic2,
  summarize: FileText,
  actions: ListChecks,
  search: SearchCode,
};

const TABS = ["Resumen", "Action Items", "Report .md"] as const;
type Tab = (typeof TABS)[number];

export function PipelineDemo() {
  const [selectedAudioId, setSelectedAudioId] = useState<string>("standup");
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Resumen");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const selectedAudio = DEMO_AUDIOS.find((a) => a.id === selectedAudioId) ?? DEMO_AUDIOS[0];

  function selectAudio(id: string) {
    if (running) return;
    setSelectedAudioId(id);
    setCurrentStep(-1);
    setDone(false);
    setTerminalLines([]);
    setActiveTab("Resumen");
  }

  async function runPipeline() {
    const audio = selectedAudio;
    setRunning(true);
    setDone(false);
    setTerminalLines([]);
    setCurrentStep(-1);

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setCurrentStep(i);
      const ms = audio.pipelineTimings[PIPELINE_STEPS[i].id as PipelineStepId] ?? 1800;
      await new Promise((r) => setTimeout(r, ms));
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

  // Stream terminal lines proportionally to total pipeline duration
  useEffect(() => {
    if (!running) return;
    const lines = selectedAudio.terminalLines;
    const totalMs = Object.values(selectedAudio.pipelineTimings).reduce((a, b) => a + b, 0);
    const intervalMs = Math.floor(totalMs / lines.length);
    let i = 0;
    const id = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(id);
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [running, selectedAudio]);

  return (
    <div className="space-y-5">
      {/* Audio selector */}
      <div className="grid sm:grid-cols-3 gap-3">
        {DEMO_AUDIOS.map((audio) => (
          <AudioCard
            key={audio.id}
            audio={audio}
            selected={selectedAudioId === audio.id}
            disabled={running}
            onClick={() => selectAudio(audio.id)}
          />
        ))}
      </div>

      {/* Pipeline nodes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PIPELINE_STEPS.map((step, i) => {
          const state =
            currentStep > i ? "done" : currentStep === i ? "running" : "idle";
          const Icon = STEP_ICONS[step.id] ?? FileText;
          const outputText = selectedAudio.nodeOutputs[step.id as PipelineStepId];

          return (
            <motion.div
              key={step.id}
              className={`rounded-xl border p-4 transition-colors ${
                state === "done"
                  ? "border-violet-500/40 bg-violet-950/20"
                  : state === "running"
                    ? "border-violet-500/70 bg-violet-950/30 shadow-lg shadow-violet-500/10"
                    : "border-zinc-800 bg-zinc-900/50"
              }`}
              animate={state === "running" ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ repeat: state === "running" ? Infinity : 0, duration: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`p-1.5 rounded-lg ${
                    state === "done"
                      ? "bg-violet-950/60 text-violet-400"
                      : state === "running"
                        ? "bg-violet-950/60 text-violet-300"
                        : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                {state === "running" && (
                  <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                )}
                {state === "done" && (
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                )}
              </div>
              <h3
                className={`font-semibold text-sm mb-1 ${state === "idle" ? "text-zinc-500" : "text-zinc-100"}`}
              >
                {step.label}
              </h3>
              <p
                className={`text-xs leading-relaxed ${state === "idle" ? "text-zinc-600" : "text-zinc-400"}`}
              >
                {state === "done" ? outputText : step.description}
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
          <Button
            onClick={reset}
            variant="outline"
            className="border-zinc-700 text-zinc-300 gap-2"
          >
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
            <TerminalWindow title={`meeting-agent — ${selectedAudio.filename}`}>
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed ${
                    line?.startsWith("✓")
                      ? "text-emerald-400"
                      : line?.startsWith("▶")
                        ? "text-violet-400"
                        : line?.startsWith("[node:")
                          ? "text-cyan-400/80"
                          : line?.startsWith("  →")
                            ? "text-zinc-300"
                            : line?.startsWith("$")
                              ? "text-zinc-100"
                              : "text-zinc-500"
                  }`}
                >
                  {line ?? " "}
                </div>
              ))}
              {running && (
                <span className="inline-block w-1.5 h-3.5 bg-violet-400 animate-pulse ml-0.5 align-middle" />
              )}
            </TerminalWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabbed output — keyed to re-animate when audio changes */}
      <AnimatePresence mode="wait">
        {done && (
          <motion.div
            key={selectedAudioId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-zinc-800 overflow-hidden"
          >
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
              {activeTab === "Resumen" && (
                <div className="space-y-4">
                  {selectedAudio.summaryBlocks.map((block, i) => (
                    <div key={i}>
                      <p
                        className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-label)" }}
                      >
                        {block.heading}
                      </p>
                      {block.body ? (
                        <p className="text-sm text-zinc-300 leading-relaxed">{block.body}</p>
                      ) : (
                        <ul className="space-y-1">
                          {block.items?.map((item, j) => (
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

              {activeTab === "Action Items" && (
                <ul className="space-y-2.5">
                  {selectedAudio.actionItems.map((item, i) => (
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

              {activeTab === "Report .md" && (
                <pre
                  className="text-xs text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap"
                  style={{ fontFamily: "var(--font-code)" }}
                >
                  {selectedAudio.reportMarkdown}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
