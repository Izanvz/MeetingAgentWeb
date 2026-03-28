export const SITE = {
  name: "MeetingAgent",
  tagline: "Tus reuniones → acción en 2 minutos",
  description:
    "Cada reunión sin seguimiento es conocimiento perdido. MeetingAgent transcribe, resume y genera action items automáticamente, sin APIs de pago ni servidores en la nube.",
  github: "https://github.com/Izanvz/MeetingAgent",
  linkedin: "https://www.linkedin.com/in/izan-villarejo-ai/",
  portfolio: "https://portfolio-izanv.vercel.app",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
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
    description: "LLM extrae tareas con responsable y deadline.",
    status: "done" as const,
    output: "5 action items extraídos",
  },
  {
    id: "search",
    icon: "🔍",
    label: "Búsqueda semántica",
    description: "ChromaDB indexa todo para búsqueda por significado.",
    status: "done" as const,
    output: "3 referencias encontradas",
  },
];

export const INTEGRATIONS = [
  {
    name: "Zoom",
    description: "Conecta con Zoom para capturar reuniones automáticamente vía webhook.",
    status: "coming-soon" as const,
  },
  {
    name: "Recall.ai",
    description: "Bot de grabación que se une a cualquier videollamada.",
    status: "coming-soon" as const,
  },
  {
    name: "Folder Watcher",
    description: "Monitoriza una carpeta local. Nuevo audio → pipeline automático.",
    status: "available" as const,
  },
  {
    name: "Manual Upload",
    description: "Sube cualquier archivo de audio desde tu dispositivo.",
    status: "available" as const,
  },
  {
    name: "Jira",
    description: "Exporta action items directamente a tu proyecto de Jira como issues asignados.",
    status: "coming-soon" as const,
  },
  {
    name: "Linear",
    description: "Crea issues en Linear automáticamente a partir de las tareas de la reunión.",
    status: "coming-soon" as const,
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
    description: "4 nodos especializados: resumen, action items, reporte, índice semántico.",
  },
  {
    step: "04",
    title: "Report listo",
    description: "Markdown estructurado con resumen, tareas y referencias. En 2 minutos.",
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
      "Búsqueda semántica avanzada",
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

export const DEMO_TERMINAL_LINES = [
  "$ meeting-agent process --input standup-2026-03-27.mp3",
  "",
  "▶ Iniciando pipeline MeetingAgent v0.4.2",
  "▶ Modelo: whisper-base | LLM: mistral:7b",
  "",
  "[node:transcribe] ████████████████████ 100% -00:23",
  "  → 847 palabras transcritas",
  "  → Idioma detectado: Español (es)",
  "",
  "[node:summarize]  ████████████████████ 100% -00:04",
  "  → 3 temas principales identificados",
  "  → 2 decisiones registradas",
  "",
  "[node:actions]    ████████████████████ 100% -00:06",
  "  → 5 action items extraídos",
  "  → Responsables: Carlos (2), Ana (2), Miguel (1)",
  "",
  "[node:persist]    ████████████████████ 100% -00:02",
  "  → SQLite + ChromaDB indexados",
  "",
  "✓ Report generado: meeting-2026-03-27.md",
  "✓ Tiempo total: 00:41",
  "✓ Pipeline completo - 0 errores",
];
