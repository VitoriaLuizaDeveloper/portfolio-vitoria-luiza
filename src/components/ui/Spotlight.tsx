"use client";

import { motion, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const SIZE = 840;

export function Spotlight({ children }: { children: ReactNode }) {
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - SIZE / 2);
    y.set(event.clientY - rect.top - SIZE / 2);
  }

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            x,
            y,
            width: SIZE,
            height: SIZE,
            background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
