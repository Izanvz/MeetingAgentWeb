"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { DEMO_TERMINAL_LINES } from "@/lib/constants";
import { ArrowRight, Terminal } from "lucide-react";

export function DemoPreview() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= DEMO_TERMINAL_LINES.length) return;
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), 80);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Section background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-mono bg-cyan-950/30 border border-cyan-500/20 rounded-full px-3 py-1 mb-4">
            <Terminal className="w-3 h-3" />
            live output
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Míralo en acción
          </h2>
          <p className="text-zinc-400">
            Pipeline completo de{" "}
            <span className="text-cyan-400 font-mono">00:41</span>{" "}
            para una reunión de 30 minutos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow ring around terminal */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 blur-sm -z-10" />
          <TerminalWindow title="meeting-agent — bash">
            {DEMO_TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={
                line.startsWith("✓") ? "text-emerald-400" :
                line.startsWith("▶") ? "text-violet-400" :
                line.startsWith("[") ? "text-cyan-400" :
                line.startsWith("$") ? "text-zinc-200" :
                line.startsWith("  →") ? "text-zinc-500 text-xs" :
                "text-zinc-400"
              }>
                {line || "\u00A0"}
              </div>
            ))}
            {visibleLines < DEMO_TERMINAL_LINES.length && (
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
            )}
          </TerminalWindow>
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/demo">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-violet-500/40 gap-2 transition-all">
              Ver demo completa
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
