"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { PIPELINE_STEPS } from "@/lib/constants";
import { Play, RotateCcw, CheckCircle, Loader } from "lucide-react";

export function PipelineDemo() {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  async function runPipeline() {
    setRunning(true);
    setDone(false);
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
  }

  return (
    <div className="space-y-8">
      {/* Pipeline nodes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PIPELINE_STEPS.map((step, i) => {
          const state =
            currentStep > i ? "done" :
            currentStep === i ? "running" : "idle";
          return (
            <motion.div
              key={step.id}
              className={`rounded-xl border p-4 transition-all ${
                state === "done" ? "border-violet-500/40 bg-violet-950/20" :
                state === "running" ? "border-violet-500/70 bg-violet-950/30 shadow-lg shadow-violet-500/10" :
                "border-zinc-800 bg-zinc-900/50"
              }`}
              animate={state === "running" ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{step.icon}</span>
                {state === "running" && <Loader className="w-4 h-4 text-violet-400 animate-spin" />}
                {state === "done" && <CheckCircle className="w-4 h-4 text-violet-400" />}
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
          {running ? "Procesando..." : "Ejecutar pipeline"}
        </Button>
        {(done || currentStep >= 0) && (
          <Button onClick={reset} variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
            <RotateCcw className="w-4 h-4" />
            Resetear
          </Button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TerminalWindow title="meeting-2026-03-27.md — output">
              <div className="text-green-400">✓ Pipeline completado en 00:41</div>
              <div className="text-zinc-500 mt-2">## Resumen</div>
              <div className="text-zinc-300 text-xs mt-1">Standup del 27 de marzo. Se discutió el roadmap Q2, bloqueantes del sprint actual y próximos pasos del proyecto MeetingAgent.</div>
              <div className="text-zinc-500 mt-3">## Action Items</div>
              {["Izan: Implementar /demo page (deadline: hoy)", "Equipo: Review de PR #42 (deadline: mañana)", "Izan: Actualizar README con setup instructions"].map((item, i) => (
                <div key={i} className="text-zinc-300 text-xs mt-1">- [ ] {item}</div>
              ))}
              <div className="text-zinc-500 mt-3">## Referencias</div>
              <div className="text-zinc-400 text-xs mt-1">- LangGraph v0.4 docs: https://langchain-ai.github.io/langgraph/</div>
            </TerminalWindow>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
