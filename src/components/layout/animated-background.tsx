export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1:violet, large, center */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)",
          animation: "orb-drift-1 28s ease-in-out infinite, orb-pulse 14s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Orb 2:cyan, top-right */}
      <div
        className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          animation: "orb-drift-2 22s ease-in-out infinite 3s, orb-pulse 11s ease-in-out infinite 5s",
          willChange: "transform, opacity",
        }}
      />

      {/* Orb 3:fuchsia, bottom-left */}
      <div
        className="absolute bottom-[15%] left-[8%] w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(192,38,211,0.07) 0%, transparent 70%)",
          animation: "orb-drift-3 34s ease-in-out infinite 1s, orb-pulse 17s ease-in-out infinite 8s",
          willChange: "transform, opacity",
        }}
      />

      {/* Orb 4:indigo, bottom-right */}
      <div
        className="absolute bottom-[5%] right-[15%] w-[320px] h-[320px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
          animation: "orb-drift-4 18s ease-in-out infinite 2s, orb-pulse 9s ease-in-out infinite 3s",
          willChange: "transform, opacity",
        }}
      />

      {/* Orb 5:emerald, mid-left (aparece solo en páginas interiores) */}
      <div
        className="absolute top-[40%] left-[2%] w-[280px] h-[280px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)",
          animation: "orb-drift-2 40s ease-in-out infinite 6s",
          willChange: "transform",
        }}
      />
    </div>
  );
}
