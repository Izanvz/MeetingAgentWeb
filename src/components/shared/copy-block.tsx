"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyBlockProps {
  code: string;
  title?: string;
}

export function CopyBlock({ code, title }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-zinc-700" />
          <span className="w-3 h-3 rounded-full bg-zinc-700" />
          <span className="w-3 h-3 rounded-full bg-zinc-700" />
          {title && (
            <span
              className="text-xs text-zinc-500 ml-2"
              style={{ fontFamily: "var(--font-code)" }}
            >
              {title}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-0.5 px-2 rounded hover:bg-zinc-800"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre
        className="p-4 text-xs leading-relaxed overflow-x-auto text-zinc-300 bg-zinc-950/60"
        style={{ fontFamily: "var(--font-code)" }}
      >
        {code.trim().split("\n").map((line, i) => {
          const isComment = line.trimStart().startsWith("#");
          const isCommand = line.trimStart().startsWith("$") || line.trimStart().startsWith("meeting-agent");
          return (
            <div key={i} className={isComment ? "text-zinc-600" : isCommand ? "text-emerald-400" : "text-zinc-300"}>
              {line || " "}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
