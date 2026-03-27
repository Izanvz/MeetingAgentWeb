import { IntegrationCard } from "@/components/shared/integration-card";
import { INTEGRATIONS } from "@/lib/constants";

export default function IntegrationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Integraciones</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Conecta MeetingAgent con tu stack actual. Las marcadas como &quot;Disponible&quot; funcionan hoy.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {INTEGRATIONS.map((integration) => (
          <div key={integration.name} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <IntegrationCard {...integration} />
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 font-mono">
                {integration.status === "available"
                  ? "▶ Disponible en el repositorio Python"
                  : "⏳ En desarrollo — únete a la waitlist para acceso anticipado"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
