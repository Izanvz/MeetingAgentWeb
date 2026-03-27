import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 shadow-2xl", className)}>
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-zinc-500 font-mono mx-auto">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm text-zinc-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
