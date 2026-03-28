"use client";
import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const SIZE = 180;
const ZOOM = 1.8;
const GRID = 28; // must match body::before background-size in globals.css

export function MouseFollower() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      // Align the zoomed grid with the real grid at cursor center
      const bgX = e.clientX * (1 - ZOOM);
      const bgY = e.clientY * (1 - ZOOM);
      document.documentElement.style.setProperty("--lens-x", `${bgX}px`);
      document.documentElement.style.setProperty("--lens-y", `${bgY}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const zoomedGrid = GRID * ZOOM;

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: SIZE,
        height: SIZE,
        // Same background as body
        backgroundColor: "oklch(0.09 0.005 240)",
        // Same dot pattern as body::before but zoomed
        backgroundImage: `radial-gradient(circle, oklch(0.30 0.005 240 / 0.4) ${ZOOM}px, transparent ${ZOOM}px)`,
        backgroundSize: `${zoomedGrid}px ${zoomedGrid}px`,
        backgroundPosition: "var(--lens-x, 0px) var(--lens-y, 0px)",
        // Fade edges so the lens blends into the surrounding grid
        maskImage: "radial-gradient(circle at center, black 40%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 78%)",
      }}
      aria-hidden="true"
    />
  );
}
