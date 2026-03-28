"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

const PipelineDemo = dynamic(
  () => import("@/components/demo/pipeline-demo").then((m) => m.PipelineDemo),
  { ssr: false }
);

export default function DemoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p
          className="text-xs font-semibold text-violet-400/70 uppercase tracking-[0.14em] mb-4"
          style={{ fontFamily: "var(--font-label)" }}
        >
          ▶ Demo interactiva
        </p>
        <h1 className="text-4xl font-bold text-zinc-100 mb-3">
          Ve MeetingAgent en acción
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
          Datos de ejemplo. En producción procesaría tu audio real en{" "}
          <span className="text-zinc-200 font-medium">41 segundos</span>, sin salir de tu máquina.
        </p>
      </div>

      {/* Demo */}
      <PipelineDemo />

      {/* Bottom CTA */}
      <div className="mt-16 pt-12 border-t border-zinc-800/60 text-center">
        <p className="text-zinc-400 text-sm mb-5">
          ¿Listo para procesar tus propias reuniones?
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/waitlist">
            <Button className="bg-violet-500 hover:bg-violet-600 text-white gap-2">
              Únete a la waitlist <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-zinc-700 text-zinc-300">
              Ver en GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
