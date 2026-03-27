"use client";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/constants";

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
          <p className="text-zinc-400">4 nodos LangGraph. Un pipeline. Cero configuración.</p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-11 h-11 rounded-full border border-violet-500/40 bg-violet-950/30 flex items-center justify-center">
                  <span className="font-mono text-xs text-violet-400 font-bold">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-zinc-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
