"use client";
import dynamic from "next/dynamic";

const PipelineDemo = dynamic(
  () => import("@/components/demo/pipeline-demo").then((m) => m.PipelineDemo),
  { ssr: false }
);

export default function DemoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Demo interactiva</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Simula el pipeline completo. Los datos son de ejemplo — en producción procesaría tu audio real.
        </p>
      </div>
      <PipelineDemo />
    </div>
  );
}
