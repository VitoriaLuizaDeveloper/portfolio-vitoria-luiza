"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

/** Diâmetro do brilho que acompanha o cursor dentro do cartão. */
const GLOW = 440;

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlowX = useMotionValue(-GLOW);
  const rawGlowY = useMotionValue(-GLOW);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });
  const glowX = useSpring(rawGlowX, { stiffness: 200, damping: 25 });
  const glowY = useSpring(rawGlowY, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // O brilho é movido por transform; a posição é o canto do círculo, não o centro.
    rawGlowX.set(relX * rect.width - GLOW / 2);
    rawGlowY.set(relY * rect.height - GLOW / 2);
    rawRotateY.set((relX - 0.5) * 14);
    rawRotateX.set((0.5 - relY) * 14);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    // O brilho não precisa voltar ao centro: a opacidade já o apaga na saída.
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group/tilt relative will-change-transform ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      >
        <motion.div
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            x: glowX,
            y: glowY,
            width: GLOW,
            height: GLOW,
            background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)",
          }}
        />
      </div>
      {children}
    </motion.div>
  );
}
