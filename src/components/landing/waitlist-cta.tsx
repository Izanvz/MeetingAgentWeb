"use client";
import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/shared/waitlist-form";
import { Shield, Zap, Lock } from "lucide-react";

const PERKS = [
  { icon: Zap,    text: "Acceso prioritario" },
  { icon: Shield, text: "Sin spam" },
  { icon: Lock,   text: "Sin compromisos" },
];

export function WaitlistCTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Multi-color mesh glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/12 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/8 rounded-full blur-[100px]" />
      </div>
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs text-fuchsia-400 font-mono bg-fuchsia-950/20 border border-fuchsia-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            Lanzamiento próximo
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
            Sé el primero{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              en acceder
            </span>
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Una reunión bien documentada puede cambiar el rumbo de un proyecto.
          </p>

          <div className="flex justify-center mb-8">
            <WaitlistForm />
          </div>

          {/* Perk pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Icon className="w-3 h-3 text-zinc-600" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
