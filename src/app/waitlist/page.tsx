import { WaitlistForm } from "@/components/shared/waitlist-form";
import { Shield, Zap, Lock } from "lucide-react";

export default function WaitlistPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-cyan-500/6 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[250px] h-[250px] bg-fuchsia-600/6 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-md w-full text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs text-fuchsia-400 font-mono bg-fuchsia-950/20 border border-fuchsia-500/20 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          En desarrollo activo
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3 leading-tight">
          Únete a la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            waitlist
          </span>
        </h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          MeetingAgent está en desarrollo activo. Déjanos tu email y serás el primero en saber cuándo lanzamos.
        </p>

        <div className="flex justify-center mb-6">
          <WaitlistForm />
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-4 text-xs text-zinc-600">
          <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acceso prioritario</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Sin spam</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Sin compromisos</span>
        </div>
      </div>
    </div>
  );
}
