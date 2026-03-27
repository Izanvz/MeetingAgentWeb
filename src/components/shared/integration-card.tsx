import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  name: string;
  description: string;
  status: "available" | "coming-soon";
  className?: string;
}

// Map integration names to emoji icons
const ICONS: Record<string, string> = {
  Zoom: "🎥",
  "Recall.ai": "🤖",
  "Folder Watcher": "📁",
  "Manual Upload": "⬆️",
  Jira: "🔷",
  Linear: "🟣",
};

export function IntegrationCard({ name, description, status, className }: IntegrationCardProps) {
  const isAvailable = status === "available";
  return (
    <div className={cn(
      "rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200 group",
      isAvailable
        ? "border-emerald-500/25 bg-emerald-950/10 hover:border-emerald-500/50 hover:bg-emerald-950/20 hover:shadow-lg hover:shadow-emerald-500/5"
        : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{ICONS[name] ?? "🔌"}</span>
          <span className="font-semibold text-zinc-100">{name}</span>
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "text-xs border",
            isAvailable
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-zinc-800/80 text-zinc-500 border-zinc-700/50"
          )}
        >
          {isAvailable ? "✓ Disponible" : "Pronto"}
        </Badge>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {description}
      </p>
    </div>
  );
}
