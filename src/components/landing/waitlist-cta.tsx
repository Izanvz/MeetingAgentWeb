"use client";
import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/shared/waitlist-form";

export function WaitlistCTA() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-zinc-950 via-violet-950/10 to-zinc-950">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
            Sé el primero en acceder
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Lanzamiento próximamente. Sin spam, sin compromisos.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Ya tienes tu lugar reservado en cuanto lancemos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
