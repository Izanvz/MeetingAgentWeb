"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Demo", href: "/demo" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Integraciones", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
];

export function NavBar() {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="font-mono text-lg transition-transform group-hover:scale-110 duration-200"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #C084FC, #22D3EE, #8B5CF6)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              ▶
            </span>
            <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors">{SITE.name}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger>
                <button disabled className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-500 cursor-not-allowed opacity-60 select-none">
                  Login
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 border-zinc-700 text-zinc-300">
                En desarrollo, únete a la waitlist
              </TooltipContent>
            </Tooltip>
            <Link href="/waitlist">
              <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white">
                Waitlist
              </Button>
            </Link>
          </div>
        </nav>
      </header>
    </TooltipProvider>
  );
}
