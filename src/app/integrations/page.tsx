import type { Metadata } from "next";
import { IntegrationCard } from "@/components/shared/integration-card";

export const metadata: Metadata = {
  title: "Integraciones disponibles y próximas | MeetingAgent",
  description: "Conecta MeetingAgent con tu stack: Folder Watcher y subida manual ya disponibles. Zoom, Recall.ai, Notion, Obsidian, Jira y Linear próximamente.",
  alternates: { canonical: "https://meetingagent.dev/integrations" },
  openGraph: {
    title: "Integraciones | MeetingAgent",
    description: "Zoom, Recall.ai, Notion, Obsidian, Jira, Linear. Folder Watcher disponible hoy.",
    url: "https://meetingagent.dev/integrations",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};
import { INTEGRATIONS } from "@/lib/constants";

export default function IntegrationsPage() {
  const available = INTEGRATIONS.filter((i) => i.status === "available");
  const comingSoon = INTEGRATIONS.filter((i) => i.status === "coming-soon");

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-emerald-500/6 rounded-full blur-[80px] -z-10" />
        <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
          🔌 integraciones
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Integraciones</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Conecta MeetingAgent con tu stack actual. Las disponibles funcionan hoy mismo.
        </p>
      </div>

      {/* Available now */}
      {available.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponibles ahora
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {available.map((integration) => (
              <div key={integration.name}>
                <IntegrationCard {...integration} />
                <p className="text-xs text-emerald-400/60 font-mono mt-2 px-1">
                  ▶ Disponible en el repositorio Python
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coming soon */}
      {comingSoon.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Próximamente
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {comingSoon.map((integration) => (
              <div key={integration.name}>
                <IntegrationCard {...integration} />
                <p className="text-xs text-zinc-600 font-mono mt-2 px-1">
                  ⏳ Únete a la waitlist para acceso anticipado
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
