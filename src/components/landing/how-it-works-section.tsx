"use client";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/constants";

// Each step a different accent - matches semantic meaning
const STEP_STYLES = [
  { ring: "border-cyan-500/50 bg-cyan-950/30",   text: "text-cyan-400",    glow: "shadow-cyan-500/10",   line: "from-cyan-500/40" },
  { ring: "border-violet-500/50 bg-violet-950/30", text: "text-violet-400", glow: "shadow-violet-500/10", line: "from-violet-500/40" },
  { ring: "border-emerald-500/50 bg-emerald-950/30", text: "text-emerald-400", glow: "shadow-emerald-500/10", line: "from-emerald-500/40" },
  { ring: "border-amber-500/50 bg-amber-950/30",  text: "text-amber-400",   glow: "shadow-amber-500/10",  line: "from-amber-500/40" },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Cómo funciona</h2>
          <p className="text-zinc-400">
            4 nodos LangGraph.{" "}
            <span className="text-zinc-300 font-mono text-sm bg-zinc-800/60 px-2 py-0.5 rounded">Un pipeline.</span>{" "}
            Cero configuración.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line: gradient through all step colors */}
          <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 via-emerald-500/30 to-amber-500/30 hidden md:block" />

          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, i) => {
              const style = STEP_STYLES[i % STEP_STYLES.length];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 items-start group"
                >
                  {/* Step circle */}
                  <div className={`shrink-0 w-11 h-11 rounded-full border ${style.ring} flex items-center justify-center shadow-lg ${style.glow} transition-all group-hover:scale-110 duration-200`}>
                    <span className={`text-xs font-bold ${style.text}`} style={{ fontFamily: "var(--font-code)" }}>{item.step}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
