import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MeetingAgent | Tus reuniones → acción en 2 minutos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #1B1B20 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Violet glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.12)",
            filter: "blur(80px)",
          }}
        />
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <span style={{ color: "#8B5CF6", fontSize: 48, fontWeight: "bold" }}>▶</span>
          <span style={{ color: "#e4e1e9", fontSize: 40, fontWeight: "bold", letterSpacing: "-0.02em" }}>
            MeetingAgent
          </span>
        </div>
        {/* Headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            marginBottom: 24,
            background: "linear-gradient(135deg, #a78bfa, #c084fc, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Tus reuniones → acción en 2 minutos
        </div>
        {/* Subline */}
        <div style={{ color: "#71717a", fontSize: 22, textAlign: "center", maxWidth: 700 }}>
          100% local · 0 APIs de pago · open source
        </div>
        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 48,
            padding: "20px 40px",
            background: "rgba(27, 27, 32, 0.8)",
            borderRadius: 12,
            border: "1px solid rgba(75, 75, 85, 0.4)",
          }}
        >
          {[
            { value: "30+", label: "tests", color: "#34d399" },
            { value: "4",   label: "nodos LangGraph", color: "#a78bfa" },
            { value: "0",   label: "APIs de pago", color: "#22d3ee" },
            { value: "100%", label: "local", color: "#fbbf24" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ color: s.color, fontSize: 28, fontWeight: "bold", fontVariantNumeric: "tabular-nums" }}>
                {s.value}
              </span>
              <span style={{ color: "#71717a", fontSize: 14 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
