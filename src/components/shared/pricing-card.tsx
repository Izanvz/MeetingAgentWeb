import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export function PricingCard({ name, price, period, description, features, cta, highlighted }: PricingCardProps) {
  return (
    <div className={cn(
      "relative rounded-xl border p-6 flex flex-col gap-6 transition-all duration-200",
      highlighted
        ? "border-violet-500/50 bg-violet-950/20 shadow-xl shadow-violet-500/10 scale-[1.02]"
        : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
    )}>
      {/* Gradient top edge for highlighted */}
      {highlighted && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent rounded-t-xl" />
      )}

      {/* Popular badge */}
      {highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs font-semibold bg-violet-500 text-white px-3 py-1 rounded-full shadow-lg shadow-violet-500/30">
          <Sparkles className="w-3 h-3" />
          Más popular
        </span>
      )}

      <div>
        <p className={cn(
          "text-sm font-medium mb-1",
          highlighted ? "text-violet-400" : "text-zinc-400"
        )}>
          {name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-zinc-100">{price}</span>
          <span className="text-zinc-500 text-sm">{period}</span>
        </div>
        <p className="text-sm text-zinc-500 mt-2">{description}</p>
      </div>

      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
            <Check className={cn(
              "w-4 h-4 mt-0.5 shrink-0",
              highlighted ? "text-violet-400" : "text-emerald-500"
            )} />
            {f}
          </li>
        ))}
      </ul>

      <Link href="/waitlist">
        <Button
          className={cn(
            "w-full",
            highlighted
              ? "bg-violet-500 hover:bg-violet-600 text-white shadow-lg shadow-violet-500/20"
              : "border-zinc-700 hover:bg-zinc-800"
          )}
          variant={highlighted ? "default" : "outline"}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
