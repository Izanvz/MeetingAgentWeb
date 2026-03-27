"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

// Each stat gets its own semantic color
const STAT_COLORS = [
  { text: "text-emerald-400", glow: "from-emerald-500/20" },   // tests pasando
  { text: "text-violet-400",  glow: "from-violet-500/20" },    // nodos LangGraph
  { text: "text-cyan-400",    glow: "from-cyan-500/20" },      // APIs de pago
  { text: "text-amber-400",   glow: "from-amber-500/20" },     // ejecutable local
];

function CountUp({ value, suffix, colorClass }: { value: number; suffix: string; colorClass: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className={`tabular-nums ${colorClass}`}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="border-y border-zinc-800/60 py-12 px-4 relative overflow-hidden">
      {/* Subtle glow strip */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const color = STAT_COLORS[i % STAT_COLORS.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                {/* Glow behind number on hover */}
                <div className={`text-3xl md:text-4xl font-bold font-mono mb-1 transition-all duration-300`}>
                  <CountUp value={stat.value} suffix={stat.suffix} colorClass={color.text} />
                </div>
                <div className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
