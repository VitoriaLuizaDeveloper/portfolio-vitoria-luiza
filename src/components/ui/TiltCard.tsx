"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });
  const glowX = useSpring(px, { stiffness: 200, damping: 25 });
  const glowY = useSpring(py, { stiffness: 200, damping: 25 });
  const background = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgba(167,139,250,0.18), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    px.set(relX * 100);
    py.set(relY * 100);
    rawRotateY.set((relX - 0.5) * 14);
    rawRotateX.set((0.5 - relY) * 14);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    px.set(50);
    py.set(50);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group/tilt relative will-change-transform ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </motion.div>
  );
}
