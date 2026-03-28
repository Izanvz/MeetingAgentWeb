"use client";
import { motion } from "framer-motion";
import {
  XCircle, CheckCircle, Clock, DollarSign,
  CloudUpload, Timer, PenLine, CreditCard,
  ShieldCheck, Zap, FileText, Infinity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const OLD_WAY: { icon: LucideIcon; text: string; detail: string }[] = [
  { icon: CloudUpload, text: "Subes el audio a un servidor externo", detail: "¿Quién más lo lee?" },
  { icon: Timer,       text: "Esperas. A veces un día entero.",       detail: "Nadie te avisa cuando está listo" },
  { icon: PenLine,     text: "Editas el borrador a mano",             detail: "40 minutos de trabajo de transcriptor" },
  { icon: CreditCard,  text: "$49 al mes",                            detail: "Por básicamente un Word con IA" },
];

const NEW_WAY: { icon: LucideIcon; text: string; detail: string }[] = [
  { icon: ShieldCheck, text: "Todo ocurre en tu máquina",              detail: "Whisper corre local. Tu audio no sale." },
  { icon: Zap,         text: "41 segundos para 30 min de reunión",     detail: "4 nodos LangGraph en paralelo" },
  { icon: FileText,    text: "Markdown con todos los action items",     detail: "Con quién, qué y cuándo. Listo." },
  { icon: Infinity,    text: "$0. Para siempre.",                       detail: "Open source en GitHub" },
];

export function ProblemSolution() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/4 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
            Lo que pagas sin darte cuenta
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm">
            Cada mes: dinero, tiempo y los datos de tus reuniones en servidores de otro.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-zinc-800">
          {/* The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 p-6 relative"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-semibold text-red-400/80 uppercase tracking-[0.12em] flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-label)" }}
              >
                <XCircle className="w-3.5 h-3.5" />
                El método actual
              </p>
              <div className="flex items-center gap-1 bg-red-950/40 border border-red-500/20 rounded-full px-2.5 py-0.5">
                <DollarSign className="w-3 h-3 text-red-400" />
                <span className="text-xs font-bold text-red-300" style={{ fontFamily: "var(--font-code)" }}>
                  $49/mo + 2h
                </span>
              </div>
            </div>

            <ul className="space-y-2.5">
              {OLD_WAY.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="shrink-0 mt-0.5 p-1 rounded bg-red-950/40 text-red-400/70">
                    <item.icon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-sm text-zinc-400">{item.text}</span>
                    <span className="text-xs text-zinc-600 ml-1.5" style={{ fontFamily: "var(--font-code)" }}>
                      · {item.detail}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider badge */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
            <div className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-xl">
              <span className="text-zinc-500 text-xs font-bold">vs</span>
            </div>
          </div>

          {/* MeetingAgent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 p-6 relative border-l border-zinc-800"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-semibold text-emerald-400/80 uppercase tracking-[0.12em] flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-label)" }}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                MeetingAgent
              </p>
              <div className="flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300" style={{ fontFamily: "var(--font-code)" }}>
                  $0 · 41s
                </span>
              </div>
            </div>

            <ul className="space-y-2.5">
              {NEW_WAY.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="shrink-0 mt-0.5 p-1 rounded bg-emerald-950/40 text-emerald-400/80">
                    <item.icon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-sm text-zinc-200">{item.text}</span>
                    <span className="text-xs text-emerald-400/60 ml-1.5" style={{ fontFamily: "var(--font-code)" }}>
                      · {item.detail}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-zinc-500 text-sm"
          style={{ fontFamily: "var(--font-label)" }}
        >
          Privacidad total.{" "}
          <span className="text-zinc-300 font-semibold">Productividad absoluta.</span>
        </motion.p>
      </div>
    </section>
  );
}
