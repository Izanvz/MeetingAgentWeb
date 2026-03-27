"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IntegrationCard } from "@/components/shared/integration-card";
import { INTEGRATIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function IntegrationsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Emerald glow — "available/success" section */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
            🔌 integraciones
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Integraciones</h2>
          <p className="text-zinc-400">Conecta con tu workflow actual o usa la carga manual.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {INTEGRATIONS.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <IntegrationCard {...integration} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/integrations">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-emerald-500/30 gap-2 transition-all">
              Ver todas las integraciones
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
