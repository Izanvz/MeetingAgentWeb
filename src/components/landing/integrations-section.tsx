"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IntegrationCard } from "@/components/shared/integration-card";
import { INTEGRATIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function IntegrationsSection() {
  return (
    <section className="py-24 px-4 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Integraciones</h2>
          <p className="text-zinc-400">Conecta con tu workflow actual o usa la carga manual.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {INTEGRATIONS.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <IntegrationCard {...integration} />
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/integrations">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2">
              Ver todas las integraciones
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
