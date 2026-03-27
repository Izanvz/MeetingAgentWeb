import { WaitlistForm } from "@/components/shared/waitlist-form";

export default function WaitlistPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">▶</div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">Únete a la waitlist</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          MeetingAgent está en desarrollo activo. Déjanos tu email y serás el primero en saber cuándo lanzamos.
        </p>
        <div className="flex justify-center mb-6">
          <WaitlistForm />
        </div>
        <p className="text-xs text-zinc-600">
          Sin spam. Sin compromisos. Solo un aviso cuando esté listo.
        </p>
      </div>
    </div>
  );
}
