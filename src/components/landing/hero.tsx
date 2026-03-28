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
        {/* Cyan accent: top left */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[100px]" />
        {/* Indigo accent: bottom right */}
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
          En desarrollo activo, únete a la waitlist
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
          action items automáticamente, sin APIs de pago ni nube.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
          <Link href={SITE.github} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="ghost" className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 gap-2 text-base px-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Source
            </Button>
          </Link>
        </div>

        {/* Proof line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="flex items-center gap-1.5 text-xs text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% local
          </span>
          <span className="text-zinc-800">·</span>
          <span className="text-xs text-zinc-600">0 APIs de pago</span>
          <span className="text-zinc-800">·</span>
          <span className="text-xs text-zinc-600">open source</span>
          <span className="text-zinc-800">·</span>
          <span className="text-xs font-mono text-zinc-600" style={{ fontFamily: "var(--font-code)" }}>v0.4.2 Local Runtime</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
