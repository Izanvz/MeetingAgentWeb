"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/shared/pricing-card";
import { PRICING_PLANS } from "@/lib/constants";
import { ArrowRight as ArrowRightIcon } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Pricing</h2>
          <p className="text-zinc-400">
            En desarrollo — los botones llevan a la waitlist.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/pricing">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-300 gap-1 text-sm">
              Ver comparativa completa
              <ArrowRightIcon className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
