"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        {/* Main violet glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/12 rounded-full blur-[120px]" />
        {/* Cyan accent — top left */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[100px]" />
        {/* Indigo accent — bottom right */}
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/8 px-4 py-1.5 text-sm text-cyan-400 mb-8"
        >
          <Zap className="w-3.5 h-3.5 fill-cyan-400" />
          En desarrollo activo — únete a la waitlist
        </motion.div>

        {/* H1 */}
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 leading-tight tracking-tight mb-6">
          Tus reuniones{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            → acción
          </span>
          <br />
          en 2 minutos
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cada reunión sin seguimiento es conocimiento perdido.{" "}
          <span className="text-zinc-200 font-medium">MeetingAgent</span> transcribe, resume y genera
          action items automáticamente — sin APIs de pago ni nube.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/demo">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white gap-2 text-base px-8 shadow-lg shadow-violet-500/25">
              <Play className="w-4 h-4 fill-white" />
              Ver demo
            </Button>
          </Link>
          <Link href="/waitlist">
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-600 gap-2 text-base px-8">
              Unirme a la waitlist
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-zinc-600 mt-8 flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          100% local · 0 APIs de pago · open source
        </motion.p>
      </motion.div>
    </section>
  );
}
