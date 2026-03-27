import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
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
      "relative rounded-xl border p-6 flex flex-col gap-6 transition-all",
      highlighted
        ? "border-violet-500/50 bg-violet-950/20 shadow-lg shadow-violet-500/10"
        : "border-zinc-800 bg-zinc-900/50"
    )}>
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-violet-500 text-white px-3 py-1 rounded-full">
          Mas popular
        </span>
      )}
      <div>
        <p className="text-sm text-zinc-400 mb-1">{name}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-zinc-100">{price}</span>
          <span className="text-zinc-400 text-sm">{period}</span>
        </div>
        <p className="text-sm text-zinc-500 mt-2">{description}</p>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
            <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/waitlist">
        <Button
          className={cn(
            "w-full",
            highlighted
              ? "bg-violet-500 hover:bg-violet-600 text-white"
              : ""
          )}
          variant={highlighted ? "default" : "outline"}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
