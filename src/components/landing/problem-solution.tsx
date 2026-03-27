"use client";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, ArrowRight, Clock } from "lucide-react";

const BEFORE = [
  "30 min de reunión",
  "Notas dispersas, sin estructura",
  "Action items olvidados al día siguiente",
  "\"¿Quién iba a hacer eso?\"",
];

const AFTER = [
  "30 min de reunión",
  "Report estructurado en Markdown",
  "5 action items con responsable y deadline",
  "Todo en tu carpeta en 2 minutos",
];

export function ProblemSolution() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            El problema que todos ignoran
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Las reuniones generan valor. El seguimiento lo materializa.{" "}
            <span className="text-zinc-300">Sin seguimiento, la reunión no existió.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-red-500/25 bg-red-950/10 p-6 relative overflow-hidden"
          >
            {/* Subtle top glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <p className="text-xs font-semibold text-red-400/80 mb-4 uppercase tracking-widest flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              Sin MeetingAgent
            </p>
            <ul className="space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                  <XCircle className="w-4 h-4 text-red-500/70 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow + time badge */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full border border-violet-500/30 bg-violet-950/20 flex items-center justify-center shadow-lg shadow-violet-500/10">
                <ArrowRight className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex items-center gap-1 text-xs text-cyan-400 font-mono bg-cyan-950/20 border border-cyan-500/20 rounded-full px-2.5 py-1">
                <Clock className="w-3 h-3" />
                2 min
              </div>
            </motion.div>
          </div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-emerald-500/25 bg-emerald-950/10 p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <p className="text-xs font-semibold text-emerald-400/80 mb-4 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Con MeetingAgent
            </p>
            <ul className="space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
