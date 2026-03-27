"use client";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";

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
            Las reuniones generan valor. El seguimiento lo materializa. Sin seguimiento, la reunión no existió.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-red-500/20 bg-red-950/10 p-6"
          >
            <p className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wider">Sin MeetingAgent</p>
            <ul className="space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-violet-400" />
          </div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-violet-500/20 bg-violet-950/10 p-6"
          >
            <p className="text-sm font-semibold text-violet-400 mb-4 uppercase tracking-wider">Con MeetingAgent</p>
            <ul className="space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
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
