# MeetingAgentWeb Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static marketing site for MeetingAgent — AI meeting pipeline — that impresses technical recruiters, demonstrates product thinking, and captures waitlist signups.

**Architecture:** Next.js 16.1 App Router, fully static (SSG/SSG), zero backend. All content lives in `lib/constants.ts`. Section components are assembled into each route's `page.tsx`. Animations via Framer Motion. Email capture via Formspree (no backend).

**Tech Stack:** Next.js 16.1, React 19.2, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion 11, Geist fonts, Formspree

**Psychology principles baked in:**
- Hero: Jobs to Be Done framing + Loss Aversion subheadline
- Social proof: specific numbers (Availability Heuristic)
- Demo BEFORE waitlist ask (Reciprocity)
- Pricing: Anchoring (Enterprise shown first in layout) + Decoy Effect (Pro highlighted)
- Waitlist: Mimetic Desire ("sé el primero en acceder")

---

## File Map

```
MeetingAgentWeb/
  src/
    app/
      layout.tsx                      # Root layout: NavBar + children + Footer
      page.tsx                        # Landing: all sections assembled
      globals.css                     # Tailwind v4 + zinc/violet theme tokens
      demo/page.tsx                   # Interactive pipeline demo
      how-it-works/page.tsx           # LangGraph diagram + tech stack
      integrations/page.tsx           # Connectors (Zoom, Recall.ai, etc.)
      pricing/page.tsx                # Full pricing page
      waitlist/page.tsx               # Email capture + confirmation
    components/
      layout/
        navbar.tsx                    # Logo + nav links + Login (disabled)
        footer.tsx                    # GitHub, LinkedIn, portfolio links
      landing/
        hero.tsx                      # H1 + subtitle + dual CTA + pipeline bg
        social-proof.tsx              # 4 stat counters with count-up animation
        demo-preview.tsx              # Terminal animation (teaser)
        problem-solution.tsx          # Before/after comparison cards
        integrations-section.tsx      # 4 integration cards + badges
        how-it-works-section.tsx      # 4 animated steps
        pricing-section.tsx           # 3 pricing cards (Free/Pro/Enterprise)
        waitlist-cta.tsx              # Big email capture CTA
      demo/
        pipeline-demo.tsx             # Full step-by-step interactive demo
        pipeline-node.tsx             # Individual animated node
      shared/
        terminal-window.tsx           # Reusable terminal UI chrome
        integration-card.tsx          # Icon + name + status badge
        pricing-card.tsx              # Plan + features list + CTA button
        waitlist-form.tsx             # Email input → Formspree → success toast
    lib/
      constants.ts                    # ALL copy, data, and content (single source of truth)
      utils.ts                        # cn() utility
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `MeetingAgentWeb/` (entire project)

- [ ] **Step 1: Scaffold Next.js 16 project**

Run from `C:/Users/Izan/Documents/Claude`:
```bash
npx create-next-app@latest MeetingAgentWeb --yes --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm
```
Expected: Project created at `MeetingAgentWeb/`

- [ ] **Step 2: Init shadcn/ui**

```bash
cd MeetingAgentWeb
npx shadcn@latest init -d
```
When prompted for style: select `new-york`. When prompted for base color: select `zinc`.
Expected: `components/ui/` created, `globals.css` updated.

- [ ] **Step 3: Install remaining dependencies**

```bash
npm install framer-motion
npm install @formspree/react
```

- [ ] **Step 4: Add shadcn components needed**

```bash
npx shadcn@latest add button badge card separator toast input
```

- [ ] **Step 5: Move plan to project docs**

```bash
mkdir -p docs/superpowers/plans
cp ../plans/2026-03-27-meeting-agent-web.md docs/superpowers/plans/
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Server at http://localhost:3000 with default Next.js page.

---

## Task 2: Theme & Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css with zinc/violet theme**

`src/app/globals.css`:
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: oklch(0.09 0.005 240);
  --color-foreground: oklch(0.97 0.002 240);
  --color-card: oklch(0.12 0.005 240);
  --color-card-foreground: oklch(0.97 0.002 240);
  --color-primary: oklch(0.65 0.22 293);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-secondary: oklch(0.17 0.005 240);
  --color-secondary-foreground: oklch(0.97 0.002 240);
  --color-muted: oklch(0.17 0.005 240);
  --color-muted-foreground: oklch(0.55 0.01 240);
  --color-accent: oklch(0.65 0.22 293);
  --color-accent-foreground: oklch(0.99 0 0);
  --color-border: oklch(0.22 0.005 240);
  --color-ring: oklch(0.65 0.22 293);
  --color-destructive: oklch(0.60 0.22 25);
  --radius: 0.5rem;

  /* Geist font literals — required for Tailwind v4 @theme */
  --font-sans: "Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", "Geist Mono Fallback", ui-monospace, monospace;
}

* {
  border-color: var(--color-border);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: oklch(0.30 0.005 240); border-radius: 3px; }
```

- [ ] **Step 2: Fix layout.tsx — Geist variables on `<html>`, not `<body>`**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "MeetingAgent — Tus reuniones, en acción",
  description: "Pipeline de IA que transcribe, resume y genera action items de tus reuniones. Automáticamente. Sin APIs de pago.",
  openGraph: {
    title: "MeetingAgent",
    description: "Tus reuniones → acción en 2 minutos",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts render correctly**

Run `npm run dev` and check that text uses Geist Sans (not Times/serif).

---

## Task 3: lib/constants.ts — Content Layer

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create utils.ts**

`src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create constants.ts with all content**

`src/lib/constants.ts`:
```ts
export const SITE = {
  name: "MeetingAgent",
  tagline: "Tus reuniones → acción en 2 minutos",
  description:
    "Cada reunión sin seguimiento es conocimiento perdido. MeetingAgent transcribe, resume y genera action items automáticamente — sin APIs de pago ni servidores en la nube.",
  github: "https://github.com/izanvlrj",  // update to real URL
  linkedin: "https://linkedin.com/in/izanvillarejo",
  portfolio: "https://izanvlrj.dev",       // update to real URL
  formspreeId: "YOUR_FORMSPREE_ID",        // replace after setup
};

export const STATS = [
  { value: 30, suffix: "+", label: "tests pasando" },
  { value: 4, suffix: "", label: "nodos LangGraph" },
  { value: 0, suffix: "", label: "APIs de pago" },
  { value: 100, suffix: "%", label: "ejecutable local" },
];

export const PIPELINE_STEPS = [
  {
    id: "transcribe",
    icon: "🎙️",
    label: "Transcripción",
    description: "Whisper transcribe el audio local. Sin enviar datos a la nube.",
    status: "done" as const,
    output: "transcript.txt generado (847 palabras)",
  },
  {
    id: "summarize",
    icon: "📝",
    label: "Resumen",
    description: "LLM local extrae temas, decisiones y contexto clave.",
    status: "done" as const,
    output: "summary.md generado (3 secciones)",
  },
  {
    id: "actions",
    icon: "✅",
    label: "Action Items",
    description: "GPT-4o extrae tareas con responsable y deadline.",
    status: "done" as const,
    output: "5 action items extraídos",
  },
  {
    id: "search",
    icon: "🔍",
    label: "Búsqueda",
    description: "DuckDuckGo busca contexto adicional sobre temas mencionados.",
    status: "done" as const,
    output: "3 referencias encontradas",
  },
];

export const INTEGRATIONS = [
  {
    name: "Zoom",
    icon: "/icons/zoom.svg",
    description: "Conecta con Zoom para capturar reuniones automáticamente vía webhook.",
    status: "coming-soon" as const,
  },
  {
    name: "Recall.ai",
    icon: "/icons/recall.svg",
    description: "Bot de grabación que se une a cualquier videollamada.",
    status: "coming-soon" as const,
  },
  {
    name: "Folder Watcher",
    icon: "/icons/folder.svg",
    description: "Monitoriza una carpeta local. Nuevo audio → pipeline automático.",
    status: "available" as const,
  },
  {
    name: "Manual Upload",
    icon: "/icons/upload.svg",
    description: "Sube cualquier archivo de audio desde tu dispositivo.",
    status: "available" as const,
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Audio entra al sistema",
    description: "Via Zoom, Recall.ai, folder watcher, o subida manual.",
  },
  {
    step: "02",
    title: "Whisper transcribe",
    description: "100% local. Ningún dato sale de tu máquina.",
  },
  {
    step: "03",
    title: "LangGraph procesa",
    description: "4 nodos especializados en paralelo: resumen, action items, búsqueda, formato.",
  },
  {
    step: "04",
    title: "Report listo",
    description: "Markdown estructurado con resumen, tareas y referencias. En tu inbox en 2 minutos.",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "€0",
    period: "/mes",
    description: "Para uso personal y pruebas",
    features: [
      "5 reuniones por mes",
      "Transcripción local (Whisper)",
      "Action items básicos",
      "Export a Markdown",
    ],
    cta: "Empezar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€9",
    period: "/mes",
    description: "Para profesionales que no quieren perder nada",
    features: [
      "Reuniones ilimitadas",
      "Zoom + Recall.ai integration",
      "LLM a tu elección",
      "Búsqueda automática de contexto",
      "Export a Notion, Obsidian",
      "Prioridad de soporte",
    ],
    cta: "Empezar prueba",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "€49",
    period: "/mes",
    description: "Para equipos que necesitan control total",
    features: [
      "Todo lo de Pro",
      "Despliegue on-premise",
      "SSO + gestión de equipo",
      "API access",
      "SLA garantizado",
      "Soporte dedicado",
    ],
    cta: "Contactar",
    highlighted: false,
  },
];

export const DEMO_TRANSCRIPT_LINES = [
  "$ meeting-agent process --input standup-2026-03-27.mp3",
  "",
  "▶ Iniciando pipeline MeetingAgent v0.4.2",
  "▶ Modelo: whisper-base | LLM: gpt-4o-mini",
  "",
  "[node:transcribe] ████████████████████ 100% — 00:23",
  "  → 847 palabras transcritas",
  "  → Idioma detectado: Español (es)",
  "",
  "[node:summarize]  ████████████████████ 100% — 00:04",
  "  → 3 temas principales identificados",
  "  → 2 decisiones registradas",
  "",
  "[node:actions]    ████████████████████ 100% — 00:06",
  "  → 5 action items extraídos",
  "  → Responsables asignados: Izan (3), Equipo (2)",
  "",
  "[node:search]     ████████████████████ 100% — 00:08",
  "  → 3 referencias encontradas para 'LangGraph v0.4'",
  "",
  "✓ Report generado: meeting-2026-03-27.md",
  "✓ Tiempo total: 00:41",
  "✓ Pipeline completo",
];
```

---

## Task 4: Shared Components

**Files:**
- Create: `src/components/shared/terminal-window.tsx`
- Create: `src/components/shared/integration-card.tsx`
- Create: `src/components/shared/pricing-card.tsx`
- Create: `src/components/shared/waitlist-form.tsx`

- [ ] **Step 1: terminal-window.tsx**

```tsx
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
```

- [ ] **Step 2: integration-card.tsx**

```tsx
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
```

- [ ] **Step 3: pricing-card.tsx**

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
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
          Más popular
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
            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
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
              : "variant-outline border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          )}
          variant={highlighted ? "default" : "outline"}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: waitlist-form.tsx**

```tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SITE } from "@/lib/constants";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setDone(true);
        toast({ title: "¡Apuntado!", description: "Te avisaremos cuando lancemos." });
      } else {
        throw new Error("Error");
      }
    } catch {
      toast({ title: "Error", description: "Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="text-violet-400 font-medium text-center">
        ✓ Estás en la lista. Te avisamos pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 max-w-md ${className}`}>
      <Input
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
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 5: Layout — NavBar + Footer

**Files:**
- Create: `src/components/layout/navbar.tsx`
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: navbar.tsx**

```tsx
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
          <Link href="/" className="flex items-center gap-2">
            <span className="text-violet-400 font-mono text-lg">▶</span>
            <span className="font-semibold text-zinc-100">{SITE.name}</span>
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
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" disabled className="border-zinc-700 text-zinc-500 cursor-not-allowed">
                  Login
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 border-zinc-700 text-zinc-300">
                En desarrollo — únete a la waitlist
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
```

- [ ] **Step 2: footer.tsx**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, ExternalLinkIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-violet-400 font-mono">▶</span>
          <span className="text-sm text-zinc-400">{SITE.name} — built by Izan Villarejo</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href={SITE.github} target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <GithubIcon className="w-4 h-4" />
          </Link>
          <Link href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <LinkedinIcon className="w-4 h-4" />
          </Link>
          <Link href={SITE.portfolio} target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <ExternalLinkIcon className="w-4 h-4" />
          </Link>
          <span className="text-xs text-zinc-600">2026</span>
        </div>
      </div>
    </footer>
  );
}
```

---

## Task 6: Landing Sections — Hero + Social Proof + Problem/Solution

**Files:**
- Create: `src/components/landing/hero.tsx`
- Create: `src/components/landing/social-proof.tsx`
- Create: `src/components/landing/problem-solution.tsx`

- [ ] **Step 1: hero.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PlayIcon } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
      {/* Gradient background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-700/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          En desarrollo activo — únete a la waitlist
        </motion.div>

        {/* H1 */}
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 leading-tight tracking-tight mb-6">
          Tus reuniones{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
            → acción
          </span>
          <br />
          en 2 minutos
        </h1>

        {/* Subtitle — Loss Aversion */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cada reunión sin seguimiento es conocimiento perdido.{" "}
          <span className="text-zinc-300">MeetingAgent</span> transcribe, resume y genera
          action items automáticamente — sin APIs de pago ni nube.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/demo">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white gap-2 text-base px-8">
              <PlayIcon className="w-4 h-4" />
              Ver demo
            </Button>
          </Link>
          <Link href="/waitlist">
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2 text-base px-8">
              Unirme a la waitlist
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: social-proof.tsx (count-up animation)**

```tsx
"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="border-y border-zinc-800/60 bg-zinc-900/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-violet-400 font-mono mb-1">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: problem-solution.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { XCircleIcon, CheckCircleIcon, ArrowRightIcon } from "lucide-react";

const BEFORE = [
  "30 min de reunión",
  "Notas dispersas, sin estructura",
  "Action items olvidados al día siguiente",
  "\"¿Quién iba a hacer eso?\"",
];

const AFTER = [
  "30 min de reunión",
  "Report estructurado en Markdown",
  "5 action items con responsable y deadline",
  "Todo en tu carpeta en 2 minutos",
];

export function ProblemSolution() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            El problema que todos ignoran
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Las reuniones generan valor. El seguimiento lo materializa. Sin seguimiento, la reunión no existió.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-red-500/20 bg-red-950/10 p-6"
          >
            <p className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wider">Sin MeetingAgent</p>
            <ul className="space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                  <XCircleIcon className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRightIcon className="w-8 h-8 text-violet-400" />
          </div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-violet-500/20 bg-violet-950/10 p-6"
          >
            <p className="text-sm font-semibold text-violet-400 mb-4 uppercase tracking-wider">Con MeetingAgent</p>
            <ul className="space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircleIcon className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 7: Landing Sections — Demo Preview + How It Works + Integrations

**Files:**
- Create: `src/components/landing/demo-preview.tsx`
- Create: `src/components/landing/how-it-works-section.tsx`
- Create: `src/components/landing/integrations-section.tsx`

- [ ] **Step 1: demo-preview.tsx (animated terminal)**

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { DEMO_TRANSCRIPT_LINES } from "@/lib/constants";
import { ArrowRightIcon } from "lucide-react";

export function DemoPreview() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= DEMO_TRANSCRIPT_LINES.length) return;
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), 80);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <section className="py-24 px-4 bg-zinc-900/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Míralo en acción
          </h2>
          <p className="text-zinc-400">Pipeline completo de 41 segundos para una reunión de 30 minutos.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow title="meeting-agent — bash">
            {DEMO_TRANSCRIPT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={
                line.startsWith("✓") ? "text-green-400" :
                line.startsWith("▶") ? "text-violet-400" :
                line.startsWith("[") ? "text-cyan-400" :
                line.startsWith("$") ? "text-zinc-200" :
                line.startsWith("  →") ? "text-zinc-500 text-xs" :
                "text-zinc-400"
              }>
                {line || "\u00A0"}
              </div>
            ))}
            {visibleLines < DEMO_TRANSCRIPT_LINES.length && (
              <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-0.5" />
            )}
          </TerminalWindow>
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/demo">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2">
              Ver demo completa
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: how-it-works-section.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Cómo funciona</h2>
          <p className="text-zinc-400">4 nodos LangGraph. Un pipeline. Cero configuración.</p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-11 h-11 rounded-full border border-violet-500/40 bg-violet-950/30 flex items-center justify-center">
                  <span className="font-mono text-xs text-violet-400 font-bold">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-zinc-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: integrations-section.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IntegrationCard } from "@/components/shared/integration-card";
import { INTEGRATIONS } from "@/lib/constants";
import { ArrowRightIcon } from "lucide-react";

export function IntegrationsSection() {
  return (
    <section className="py-24 px-4 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Integraciones</h2>
          <p className="text-zinc-400">Conecta con tu workflow actual o usa la carga manual.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {INTEGRATIONS.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <IntegrationCard {...integration} />
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/integrations">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2">
              Ver todas las integraciones
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 8: Landing Sections — Pricing + WaitlistCTA + page.tsx Assembly

**Files:**
- Create: `src/components/landing/pricing-section.tsx`
- Create: `src/components/landing/waitlist-cta.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: pricing-section.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/shared/pricing-card";
import { PRICING_PLANS } from "@/lib/constants";
import { ArrowRightIcon } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Pricing</h2>
          <p className="text-zinc-400">
            En desarrollo — los botones llevan a la waitlist.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/pricing">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-300 gap-1 text-sm">
              Ver comparativa completa
              <ArrowRightIcon className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: waitlist-cta.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/shared/waitlist-form";

export function WaitlistCTA() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-zinc-950 via-violet-950/10 to-zinc-950">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
            Sé el primero en acceder
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Lanzamiento próximamente. Sin spam, sin compromisos.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Ya tienes tu lugar reservado en cuanto lancemos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: src/app/page.tsx — assemble all sections**

```tsx
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { DemoPreview } from "@/components/landing/demo-preview";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { WaitlistCTA } from "@/components/landing/waitlist-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <DemoPreview />
      <ProblemSolution />
      <HowItWorksSection />
      <IntegrationsSection />
      <PricingSection />
      <WaitlistCTA />
    </>
  );
}
```

- [ ] **Step 4: Run dev server and verify full landing page renders**

```bash
npm run dev
```
Open http://localhost:3000 and verify:
- Dark background ✓
- NavBar renders ✓
- Hero with gradient glow ✓
- Stats count up on scroll ✓
- Terminal animation plays ✓
- All 8 sections present ✓
- Footer links present ✓

---

## Task 9: Inner Pages

**Files:**
- Create: `src/app/demo/page.tsx`
- Create: `src/components/demo/pipeline-demo.tsx`
- Create: `src/app/how-it-works/page.tsx`
- Create: `src/app/integrations/page.tsx`
- Create: `src/app/pricing/page.tsx`
- Create: `src/app/waitlist/page.tsx`

- [ ] **Step 1: /demo page — full interactive pipeline**

`src/components/demo/pipeline-demo.tsx`:
```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/shared/terminal-window";
import { PIPELINE_STEPS, DEMO_TRANSCRIPT_LINES } from "@/lib/constants";
import { PlayIcon, RotateCcwIcon, CheckCircleIcon, LoaderIcon } from "lucide-react";

export function PipelineDemo() {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  async function runPipeline() {
    setRunning(true);
    setDone(false);
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 1800));
    }
    setCurrentStep(PIPELINE_STEPS.length);
    setRunning(false);
    setDone(true);
  }

  function reset() {
    setCurrentStep(-1);
    setDone(false);
    setRunning(false);
  }

  return (
    <div className="space-y-8">
      {/* Pipeline nodes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PIPELINE_STEPS.map((step, i) => {
          const state =
            currentStep > i ? "done" :
            currentStep === i ? "running" : "idle";
          return (
            <motion.div
              key={step.id}
              className={`rounded-xl border p-4 transition-all ${
                state === "done" ? "border-violet-500/40 bg-violet-950/20" :
                state === "running" ? "border-violet-500/70 bg-violet-950/30 shadow-lg shadow-violet-500/10" :
                "border-zinc-800 bg-zinc-900/50"
              }`}
              animate={state === "running" ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{step.icon}</span>
                {state === "running" && <LoaderIcon className="w-4 h-4 text-violet-400 animate-spin" />}
                {state === "done" && <CheckCircleIcon className="w-4 h-4 text-violet-400" />}
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${state === "idle" ? "text-zinc-500" : "text-zinc-100"}`}>
                {step.label}
              </h3>
              <p className={`text-xs leading-relaxed ${state === "idle" ? "text-zinc-600" : "text-zinc-400"}`}>
                {state === "done" ? step.output : step.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={runPipeline}
          disabled={running}
          className="bg-violet-500 hover:bg-violet-600 text-white gap-2"
        >
          <PlayIcon className="w-4 h-4" />
          {running ? "Procesando..." : "Ejecutar pipeline"}
        </Button>
        {(done || currentStep >= 0) && (
          <Button onClick={reset} variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
            <RotateCcwIcon className="w-4 h-4" />
            Resetear
          </Button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TerminalWindow title="meeting-2026-03-27.md — output">
              <div className="text-green-400">✓ Pipeline completado en 00:41</div>
              <div className="text-zinc-500 mt-2">## Resumen</div>
              <div className="text-zinc-300 text-xs mt-1">Standup del 27 de marzo. Se discutió el roadmap Q2, bloqueantes del sprint actual y próximos pasos del proyecto MeetingAgent.</div>
              <div className="text-zinc-500 mt-3">## Action Items</div>
              {["Izan: Implementar /demo page (deadline: hoy)", "Equipo: Review de PR #42 (deadline: mañana)", "Izan: Actualizar README con setup instructions"].map((item, i) => (
                <div key={i} className="text-zinc-300 text-xs mt-1">- [ ] {item}</div>
              ))}
              <div className="text-zinc-500 mt-3">## Referencias</div>
              <div className="text-zinc-400 text-xs mt-1">- LangGraph v0.4 docs: https://langchain-ai.github.io/langgraph/</div>
            </TerminalWindow>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

`src/app/demo/page.tsx`:
```tsx
import { PipelineDemo } from "@/components/demo/pipeline-demo";

export default function DemoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Demo interactiva</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Simula el pipeline completo. Los datos son de ejemplo — en producción procesaría tu audio real.
        </p>
      </div>
      <PipelineDemo />
    </div>
  );
}
```

- [ ] **Step 2: /how-it-works page**

`src/app/how-it-works/page.tsx`:
```tsx
import { HOW_IT_WORKS, PIPELINE_STEPS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const TECH_STACK = [
  { layer: "Orchestration", tech: "LangGraph v0.4", note: "Grafo de nodos con estado compartido" },
  { layer: "Transcription", tech: "OpenAI Whisper", note: "Modelo base, 100% local" },
  { layer: "LLM", tech: "GPT-4o-mini", note: "Resumen y extracción de action items" },
  { layer: "Search", tech: "DuckDuckGo API", note: "Sin API key requerida" },
  { layer: "Framework", tech: "Python 3.11+", note: "Async, type hints, Pydantic" },
  { layer: "Testing", tech: "pytest + unittest.mock", note: "30 tests, 100% de cobertura del pipeline" },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Arquitectura técnica</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Diseñado para desarrolladores. Sin magia negra — todo es auditable y modificable.
        </p>
      </div>

      {/* Pipeline graph */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">Grafo LangGraph</h2>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 text-center min-w-[120px]">
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-sm font-semibold text-zinc-200">{step.label}</div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="text-zinc-600 hidden md:block">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack table */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">Stack técnico</h2>
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          {TECH_STACK.map((row, i) => (
            <div key={row.layer} className={`flex items-start gap-4 p-4 ${i % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-950"}`}>
              <span className="text-xs text-zinc-500 w-28 shrink-0 pt-0.5 font-mono uppercase">{row.layer}</span>
              <Badge variant="outline" className="border-violet-500/30 text-violet-400 shrink-0 font-mono">
                {row.tech}
              </Badge>
              <span className="text-sm text-zinc-400">{row.note}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: /integrations page**

`src/app/integrations/page.tsx`:
```tsx
import { IntegrationCard } from "@/components/shared/integration-card";
import { INTEGRATIONS } from "@/lib/constants";

export default function IntegrationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Integraciones</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Conecta MeetingAgent con tu stack actual. Las marcadas como "Disponible" funcionan hoy.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {INTEGRATIONS.map((integration) => (
          <div key={integration.name} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <IntegrationCard {...integration} />
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 font-mono">
                {integration.status === "available"
                  ? "▶ Disponible en el repositorio Python"
                  : "⏳ En desarrollo — únete a la waitlist para acceso anticipado"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: /pricing page**

`src/app/pricing/page.tsx`:
```tsx
import { PricingCard } from "@/components/shared/pricing-card";
import { PRICING_PLANS } from "@/lib/constants";

const COMPARISON = [
  { feature: "Reuniones por mes", free: "5", pro: "Ilimitadas", enterprise: "Ilimitadas" },
  { feature: "Transcripción local (Whisper)", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Action items con IA", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Integración Zoom / Recall.ai", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "Export a Notion / Obsidian", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "LLM a tu elección", free: "✗", pro: "✓", enterprise: "✓" },
  { feature: "On-premise deploy", free: "✗", pro: "✗", enterprise: "✓" },
  { feature: "API access", free: "✗", pro: "✗", enterprise: "✓" },
  { feature: "SLA garantizado", free: "✗", pro: "✗", enterprise: "✓" },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Pricing</h1>
        <p className="text-zinc-400">En desarrollo. Todos los planes llevan a la waitlist por ahora.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {PRICING_PLANS.map((plan) => <PricingCard key={plan.name} {...plan} />)}
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="grid grid-cols-4 gap-0 bg-zinc-900 p-4 border-b border-zinc-800">
          <span className="text-sm font-semibold text-zinc-400">Feature</span>
          {["Free", "Pro", "Enterprise"].map((p) => (
            <span key={p} className="text-sm font-semibold text-zinc-300 text-center">{p}</span>
          ))}
        </div>
        {COMPARISON.map((row, i) => (
          <div key={row.feature} className={`grid grid-cols-4 gap-0 p-4 ${i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/30"}`}>
            <span className="text-sm text-zinc-400">{row.feature}</span>
            {[row.free, row.pro, row.enterprise].map((val, j) => (
              <span key={j} className={`text-sm text-center ${val === "✓" ? "text-violet-400" : val === "✗" ? "text-zinc-700" : "text-zinc-300"}`}>
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: /waitlist page**

`src/app/waitlist/page.tsx`:
```tsx
import { WaitlistForm } from "@/components/shared/waitlist-form";

export default function WaitlistPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">▶</div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">Únete a la waitlist</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          MeetingAgent está en desarrollo activo. Déjanos tu email y serás el primero en saber cuándo lanzamos.
        </p>
        <div className="flex justify-center mb-6">
          <WaitlistForm />
        </div>
        <p className="text-xs text-zinc-600">
          Sin spam. Sin compromisos. Solo un aviso cuando esté listo.
        </p>
      </div>
    </div>
  );
}
```

---

## Task 10: Final Polish + Build Verification

- [ ] **Step 1: Add Formspree account and update constants.ts**

Create free account at https://formspree.io, create a form, copy the form ID, and update `SITE.formspreeId` in `src/lib/constants.ts`.

- [ ] **Step 2: Update real URLs in constants.ts**

Update `SITE.github`, `SITE.linkedin`, `SITE.portfolio` with real URLs.

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: Build completes with no errors. Note any TypeScript or ESLint warnings and fix them.

- [ ] **Step 4: Verify static output**

```bash
npm start
```
Check all 6 routes: `/`, `/demo`, `/how-it-works`, `/integrations`, `/pricing`, `/waitlist`

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "feat: initial MeetingAgentWeb marketing site

6 pages: landing, demo, how-it-works, integrations, pricing, waitlist
Stack: Next.js 16.1, shadcn/ui, Tailwind v4, Framer Motion, Geist
Psychology: Jobs-to-be-done hero, loss aversion copy, reciprocity (demo before ask)"

git push origin main
```

- [ ] **Step 6: Deploy to Vercel**

```bash
npx vercel --prod
```
Or push to GitHub and connect project in vercel.com dashboard.

---

## React Best Practices Notes

Apply these during implementation (not in plan code for brevity):

- **Lucide barrel imports** — Replace all `import { X } from "lucide-react"` with direct imports:
  ```ts
  import CheckIcon from "lucide-react/dist/esm/icons/check"
  import ArrowRightIcon from "lucide-react/dist/esm/icons/arrow-right"
  // etc.
  ```
- **PipelineDemo is heavy** — Use `next/dynamic` in `/demo/page.tsx`:
  ```tsx
  const PipelineDemo = dynamic(() => import("@/components/demo/pipeline-demo").then(m => m.PipelineDemo), { ssr: false })
  ```
- **CountUp animation** — The `animate()` call in `social-proof.tsx` creates new state on every render. Wrap `useEffect` deps correctly (already done via `useMotionValue`).
- **Framer Motion** — Import from `framer-motion` is fine (Next.js tree-shakes it). Do NOT import from `framer-motion/dist/*` manually.

---

## Psychology Checklist

Before launch, verify these are implemented:

- [ ] **Jobs to be Done** — Hero says what the user *gets*, not what the product *does*
- [ ] **Loss Aversion** — "Cada reunión sin seguimiento es conocimiento perdido" in hero subtitle
- [ ] **Reciprocity** — Demo is accessible WITHOUT requiring email; waitlist ask comes AFTER demo
- [ ] **Social Proof** — 4 specific, verifiable numbers (not "thousands of users")
- [ ] **Anchoring** — Enterprise plan shown in pricing grid (makes Pro look cheap)
- [ ] **Decoy Effect** — Pro plan visually highlighted with "Más popular" badge
- [ ] **Authority** — "LangGraph", "Whisper", "GPT-4o-mini" signal technical credibility
- [ ] **Mimetic Desire** — Waitlist badge in hero ("en desarrollo activo") signals others are waiting
- [ ] **Zeigarnik Effect** — Demo animation stops mid-way in landing, pulls to /demo for full run
