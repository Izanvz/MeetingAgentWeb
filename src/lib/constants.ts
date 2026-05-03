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

// ─── Demo audio types & data ────────────────────────────────────────────────

export type PipelineStepId = "transcribe" | "summarize" | "actions" | "search";

export type SummaryBlock = {
  heading: string;
  body?: string;
  items?: string[];
};

export type DemoAudio = {
  id: string;
  title: string;
  filename: string;
  duration: string;
  size: string;
  language: string;
  estimatedWords: string;
  tags: string[];
  pipelineTimings: Record<PipelineStepId, number>;
  nodeOutputs: Record<PipelineStepId, string>;
  terminalLines: string[];
  summaryBlocks: SummaryBlock[];
  actionItems: { owner: string; task: string; deadline: string }[];
  reportMarkdown: string;
};

export const DEMO_AUDIOS: DemoAudio[] = [
  {
    id: "standup",
    title: "Daily standup — backend",
    filename: "standup-2026-03-27.mp3",
    duration: "30:41",
    size: "2.4 MB",
    language: "Español",
    estimatedWords: "847",
    tags: ["Engineering", "Daily"],
    pipelineTimings: { transcribe: 1800, summarize: 2800, actions: 2200, search: 900 },
    nodeOutputs: {
      transcribe: "847 palabras transcritas",
      summarize: "3 secciones · 2 decisiones",
      actions: "5 action items extraídos",
      search: "3 reuniones relacionadas",
    },
    terminalLines: [
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
      "✓ Report generado: standup-2026-03-27.md",
      "✓ Tiempo total: 00:41",
      "✓ Pipeline completo - 0 errores",
    ],
    summaryBlocks: [
      {
        heading: "Resumen ejecutivo",
        body: "Standup del 27 de marzo. Se discutió el roadmap Q2, los bloqueantes del sprint actual y los próximos pasos del proyecto MeetingAgent.",
      },
      {
        heading: "Temas principales",
        items: [
          "Roadmap Q2: priorización — demo interactiva, integración Zoom, mejoras de UX",
          "Sprint actual: PR #42 pendiente de review, bloqueante para el deploy",
          "README desactualizado: necesario antes de publicar la demo pública",
        ],
      },
      {
        heading: "Decisiones tomadas",
        items: [
          "Mergear PR #42 antes del viernes como requisito para el deploy",
          "README update obligatorio antes de la demo pública",
          "Retro Q1 pospuesta al lunes próximo",
        ],
      },
    ],
    actionItems: [
      { owner: "Izan", task: "Implementar /demo page interactiva", deadline: "Hoy" },
      { owner: "Carlos", task: "Review y merge de PR #42", deadline: "Mañana" },
      { owner: "Ana", task: "Actualizar README con setup instructions", deadline: "Viernes" },
      { owner: "Miguel", task: "Configurar entorno de staging", deadline: "Semana que viene" },
      { owner: "Equipo", task: "Retrospectiva Q1", deadline: "Próximo lunes" },
    ],
    reportMarkdown: `# Meeting Report - 2026-03-27
**Duración**: 30:41 min · **Participantes**: Izan, Carlos, Ana, Miguel

---

## Resumen ejecutivo

Standup del 27 de marzo. Roadmap Q2, sprint bloqueantes y próximos pasos.

## Action Items

- [ ] Izan: Implementar /demo page interactiva - **Hoy**
- [ ] Carlos: Review PR #42 - **Mañana**
- [ ] Ana: Actualizar README - **Viernes**
- [ ] Miguel: Setup staging - **Semana que viene**
- [ ] Equipo: Retro Q1 - **Próximo lunes**

---
*Generado por MeetingAgent v0.4.2 · 00:41s · whisper-base + mistral:7b*`,
  },
  {
    id: "sales",
    title: "Sales call — demo Q2",
    filename: "sales-demo-q2.mp3",
    duration: "45:12",
    size: "3.1 MB",
    language: "Español",
    estimatedWords: "1.243",
    tags: ["Comercial", "Cliente"],
    pipelineTimings: { transcribe: 2400, summarize: 3200, actions: 1800, search: 1100 },
    nodeOutputs: {
      transcribe: "1.243 palabras transcritas",
      summarize: "4 secciones · 3 decisiones",
      actions: "6 follow-ups extraídos",
      search: "5 reuniones relacionadas",
    },
    terminalLines: [
      "$ meeting-agent process --input sales-demo-q2.mp3",
      "",
      "▶ Iniciando pipeline MeetingAgent v0.4.2",
      "▶ Modelo: whisper-base | LLM: mistral:7b",
      "",
      "[node:transcribe] ████████████████████ 100% -00:32",
      "  → 1.243 palabras transcritas",
      "  → Idioma detectado: Español (es)",
      "  → Hablantes detectados: 2",
      "",
      "[node:summarize]  ████████████████████ 100% -00:06",
      "  → 4 temas principales identificados",
      "  → 3 decisiones registradas",
      "  → Sentimiento: positivo (cliente interesado)",
      "",
      "[node:actions]    ████████████████████ 100% -00:04",
      "  → 6 follow-ups extraídos",
      "  → Responsables: Izan (3), Cliente (2), Equipo (1)",
      "",
      "[node:persist]    ████████████████████ 100% -00:02",
      "  → SQLite + ChromaDB indexados",
      "",
      "✓ Report generado: sales-demo-q2.md",
      "✓ Tiempo total: 00:51",
      "✓ Pipeline completo - 0 errores",
    ],
    summaryBlocks: [
      {
        heading: "Resumen ejecutivo",
        body: "Reunión de demo Q2 con cliente potencial. Se presentó MeetingAgent, se resolvieron dudas sobre privacidad de datos y se acordó un piloto de 30 días.",
      },
      {
        heading: "Temas principales",
        items: [
          "Demo del pipeline: transcripción + extracción de action items en vivo",
          "Privacidad: ejecución 100% local — punto diferenciador clave para el cliente",
          "Integraciones: interés en conectar con Jira y Notion para exportar tareas",
          "Piloto: 30 días con 5 usuarios del equipo de producto",
        ],
      },
      {
        heading: "Decisiones tomadas",
        items: [
          "Cliente confirma piloto de 30 días con equipo de producto",
          "Priorizar integración Jira para el arranque del piloto",
          "Reunión de seguimiento en 2 semanas",
        ],
      },
    ],
    actionItems: [
      { owner: "Izan", task: "Enviar acceso al entorno de prueba", deadline: "Mañana" },
      { owner: "Izan", task: "Preparar documentación de onboarding", deadline: "Esta semana" },
      { owner: "Izan", task: "Habilitar integración Jira (feature/jira)", deadline: "Semana que viene" },
      { owner: "Cliente", task: "Designar 5 usuarios para el piloto", deadline: "Esta semana" },
      { owner: "Cliente", task: "Compartir ejemplos de reuniones reales para calibrar", deadline: "Jueves" },
      { owner: "Equipo", task: "Reunión de seguimiento post-piloto", deadline: "En 2 semanas" },
    ],
    reportMarkdown: `# Meeting Report - Sales Demo Q2
**Duración**: 45:12 min · **Participantes**: Izan, Cliente (2)

---

## Resumen ejecutivo

Demo Q2 con cliente potencial. Fuerte interés en privacidad local e integración Jira.
Piloto de 30 días acordado.

## Decisiones

- Piloto de 30 días confirmado con 5 usuarios
- Prioridad: integración Jira
- Reunión de seguimiento en 2 semanas

## Follow-ups

- [ ] Izan: Acceso al entorno de prueba - **Mañana**
- [ ] Izan: Documentación de onboarding - **Esta semana**
- [ ] Izan: Feature/jira branch - **Semana que viene**
- [ ] Cliente: 5 usuarios para piloto - **Esta semana**
- [ ] Cliente: Ejemplos de reuniones - **Jueves**
- [ ] Equipo: Reunión de seguimiento - **En 2 semanas**

---
*Generado por MeetingAgent v0.4.2 · 00:51s · whisper-base + mistral:7b*`,
  },
  {
    id: "oneonone",
    title: "1-on-1 — revisión Q1",
    filename: "oneonone-q1-review.mp3",
    duration: "28:05",
    size: "1.9 MB",
    language: "Español",
    estimatedWords: "723",
    tags: ["RRHH", "Desarrollo"],
    pipelineTimings: { transcribe: 1400, summarize: 2600, actions: 1600, search: 800 },
    nodeOutputs: {
      transcribe: "723 palabras transcritas",
      summarize: "3 secciones · 4 objetivos Q2",
      actions: "4 compromisos identificados",
      search: "2 reuniones relacionadas",
    },
    terminalLines: [
      "$ meeting-agent process --input oneonone-q1-review.mp3",
      "",
      "▶ Iniciando pipeline MeetingAgent v0.4.2",
      "▶ Modelo: whisper-base | LLM: mistral:7b",
      "",
      "[node:transcribe] ████████████████████ 100% -00:19",
      "  → 723 palabras transcritas",
      "  → Idioma detectado: Español (es)",
      "",
      "[node:summarize]  ████████████████████ 100% -00:05",
      "  → Secciones: feedback, logros Q1, objetivos Q2",
      "  → 4 objetivos Q2 registrados",
      "",
      "[node:actions]    ████████████████████ 100% -00:04",
      "  → 4 compromisos personales extraídos",
      "  → Responsables: Izan (3), Manager (1)",
      "",
      "[node:persist]    ████████████████████ 100% -00:02",
      "  → SQLite + ChromaDB indexados",
      "",
      "✓ Report generado: oneonone-q1-review.md",
      "✓ Tiempo total: 00:37",
      "✓ Pipeline completo - 0 errores",
    ],
    summaryBlocks: [
      {
        heading: "Resumen ejecutivo",
        body: "Revisión de Q1 entre Izan y su manager. Se evaluó el rendimiento del trimestre, se identificaron áreas de mejora y se fijaron 4 objetivos concretos para Q2.",
      },
      {
        heading: "Logros Q1",
        items: [
          "Entrega del pipeline LangGraph completo con 37 tests pasando",
          "Reducción del tiempo de procesamiento de 3 min a 41 s",
          "Documentación técnica publicada en el repositorio",
        ],
      },
      {
        heading: "Objetivos Q2",
        items: [
          "Lanzar demo pública en meetingagent.dev antes del 15 de mayo",
          "Integración Zoom funcional en rama stable",
          "Conseguir 10 usuarios piloto externos",
          "Aumentar cobertura de tests al 85%",
        ],
      },
    ],
    actionItems: [
      { owner: "Izan", task: "Publicar demo pública en meetingagent.dev", deadline: "15 mayo" },
      { owner: "Izan", task: "Implementar integración Zoom (feature/zoom)", deadline: "Fin Q2" },
      { owner: "Izan", task: "Aumentar cobertura de tests al 85%", deadline: "Fin Q2" },
      { owner: "Manager", task: "Revisar y aprobar roadmap Q2 actualizado", deadline: "Esta semana" },
    ],
    reportMarkdown: `# 1-on-1 Report — Q1 Review
**Duración**: 28:05 min · **Participantes**: Izan, Manager

---

## Resumen

Revisión Q1: logros sólidos en pipeline y performance. Objetivos Q2 acordados y firmados.

## Logros Q1

- Pipeline LangGraph completo (37 tests)
- Tiempo procesamiento: 3 min → 41 s
- Documentación técnica publicada

## Objetivos Q2

- [ ] Izan: Demo pública live - **15 mayo**
- [ ] Izan: Integración Zoom - **Fin Q2**
- [ ] Izan: Tests 85% coverage - **Fin Q2**
- [ ] Manager: Aprobar roadmap Q2 - **Esta semana**

---
*Generado por MeetingAgent v0.4.2 · 00:37s · whisper-base + mistral:7b*`,
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
