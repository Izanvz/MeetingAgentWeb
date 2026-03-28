import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | MeetingAgent",
  description: "MeetingAgent procesa tu información 100% local. No recopilamos ni transmitimos datos de tus reuniones. Solo guardamos tu email si te unes a la waitlist.",
  alternates: { canonical: "https://meetingagent.dev/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Política de Privacidad</h1>
      <p className="text-xs text-zinc-500 mb-10 font-mono">Última actualización: marzo 2026</p>

      <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-sm text-zinc-400 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">1. Principio fundamental: procesamiento local</h2>
          <p>
            MeetingAgent es una herramienta de procesamiento de audio <strong className="text-zinc-300">100% local</strong>.
            Todo el procesamiento (transcripción con Whisper, análisis con LLM y almacenamiento en ChromaDB/SQLite)
            ocurre exclusivamente en tu máquina. Ningún dato de audio, transcripción ni action item es enviado a
            servidores externos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">2. Datos que recopilamos en esta web</h2>
          <p>
            Esta landing page (<strong className="text-zinc-300">meetingagent.dev</strong>) solo recopila:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>
              <strong className="text-zinc-300">Dirección de email</strong>: únicamente si te suscribes a la waitlist,
              procesado vía <a href="https://formspree.io" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Formspree</a>.
            </li>
            <li>
              <strong className="text-zinc-300">Datos analíticos anónimos</strong>: si se implementan en el futuro,
              nunca con identificadores personales.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">3. Uso de los datos</h2>
          <p>
            Tu email de waitlist se usa exclusivamente para notificarte del lanzamiento de MeetingAgent.
            No se comparte con terceros ni se usa para publicidad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">4. Tus derechos</h2>
          <p>
            Puedes solicitar la eliminación de tu email de la waitlist en cualquier momento contactando
            a través de <a href="https://www.linkedin.com/in/izan-villarejo-ai/" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a> o
            abriendo un issue en el <a href="https://github.com/Izanvz/MeetingAgent" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">repositorio de GitHub</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">5. Cookies</h2>
          <p>
            Esta web no utiliza cookies de seguimiento ni de publicidad. Solo se pueden generar cookies
            técnicas esenciales para el funcionamiento de la aplicación.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-3">6. Contacto</h2>
          <p>
            Para cualquier consulta sobre privacidad: <a href="https://www.linkedin.com/in/izan-villarejo-ai/" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Izan Villarejo en LinkedIn</a>
          </p>
        </section>
      </div>
    </div>
  );
}
