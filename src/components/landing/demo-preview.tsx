"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { DEMO_TERMINAL_LINES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function DemoPreview() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= DEMO_TERMINAL_LINES.length) return;
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), 80);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <section className="py-24 px-4 bg-zinc-900/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Míralo en acción
          </h2>
          <p className="text-zinc-400">Pipeline completo de 41 segundos para una reunión de 30 minutos.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow title="meeting-agent — bash">
            {DEMO_TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={
                line.startsWith("✓") ? "text-green-400" :
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
              <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-0.5" />
            )}
          </TerminalWindow>
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/demo">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2">
              Ver demo completa
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
