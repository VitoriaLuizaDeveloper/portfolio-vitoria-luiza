"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

/**
 * Halo que segue o cursor. A posição vive em MotionValues, então o movimento
 * do mouse atualiza o gradiente sem disparar re-render do React.
 */
export function Spotlight({ children }: { children: ReactNode }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(124,58,237,0.16), transparent 70%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
