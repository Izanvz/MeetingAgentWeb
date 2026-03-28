# MeetingAgent - Landing page

Web de presentación del proyecto MeetingAgent. Construida con Next.js 14, Tailwind CSS y dark theme.

**Demo en vivo:** próximamente en Vercel

**Repo del backend:** https://github.com/Izanvz/MeetingAgent

---

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Lucide icons

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | ID del formulario de Formspree para la lista de espera |

## Deploy

Conecta el repo a Vercel y añade `NEXT_PUBLIC_FORMSPREE_ID` en las variables de entorno del proyecto.
