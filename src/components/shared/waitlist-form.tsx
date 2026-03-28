"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SITE } from "@/lib/constants";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (!SITE.formspreeId) {
      toast.error("Formulario no configurado", { description: "Contacta al administrador." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setDone(true);
        toast.success("Apuntado!", { description: "Te avisaremos cuando lancemos." });
      } else {
        throw new Error("Error");
      }
    } catch {
      toast.error("Error", { description: "Intentalo de nuevo." });
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="text-violet-400 font-medium text-center">
        Estás en la lista. Te avisamos pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 max-w-md ${className ?? ""}`}>
      <label htmlFor="waitlist-email" className="sr-only">
        Correo electrónico
      </label>
      <Input
        id="waitlist-email"
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-violet-500 hover:bg-violet-600 text-white shrink-0"
      >
        {loading ? "..." : "Unirme"}
      </Button>
    </form>
  );
}
