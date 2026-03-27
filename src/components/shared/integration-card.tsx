import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  name: string;
  description: string;
  status: "available" | "coming-soon";
  className?: string;
}

export function IntegrationCard({ name, description, status, className }: IntegrationCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors",
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-zinc-100">{name}</span>
        <Badge
          variant={status === "available" ? "default" : "secondary"}
          className={cn(
            "text-xs",
            status === "available"
              ? "bg-violet-500/20 text-violet-400 border-violet-500/30"
              : "bg-zinc-800 text-zinc-400 border-zinc-700"
          )}
        >
          {status === "available" ? "Disponible" : "Coming soon"}
        </Badge>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
