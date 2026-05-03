"use client";
import { motion } from "framer-motion";
import { FileAudio, Clock, HardDrive } from "lucide-react";
import type { DemoAudio } from "@/lib/constants";

interface AudioCardProps {
  audio: DemoAudio;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function AudioCard({ audio, selected, disabled, onClick }: AudioCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? "border-violet-500/60 bg-violet-950/30 shadow-lg shadow-violet-500/10"
          : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg shrink-0 transition-colors ${
            selected
              ? "bg-violet-950/60 border border-violet-500/30"
              : "bg-zinc-800 border border-zinc-700"
          }`}
        >
          <FileAudio
            className={`w-4 h-4 transition-colors ${selected ? "text-violet-400" : "text-zinc-500"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate transition-colors ${selected ? "text-zinc-100" : "text-zinc-300"}`}>
            {audio.title}
          </p>
          <p
            className="text-[11px] text-zinc-600 truncate mt-0.5"
            style={{ fontFamily: "var(--font-code)" }}
          >
            {audio.filename}
          </p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {audio.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                  selected
                    ? "border-violet-500/30 text-violet-400 bg-violet-950/40"
                    : "border-zinc-700 text-zinc-500 bg-zinc-800/50"
                }`}
                style={{ fontFamily: "var(--font-label)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-zinc-600 shrink-0 mt-0.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {audio.duration}
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            {audio.size}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
