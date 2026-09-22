"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blobs = [
  {
    className: "-top-32 right-[-10%] h-[28rem] w-[28rem] bg-primary/25",
    animate: { x: [0, 30, 0], y: [0, 40, 0] },
    duration: 14,
  },
  {
    className: "top-40 left-[-10%] h-[22rem] w-[22rem] bg-primary-dark/40",
    animate: { x: [0, -20, 0], y: [0, -30, 0] },
    duration: 16,
  },
  {
    className: "bottom-[-10%] left-1/3 h-[20rem] w-[20rem] bg-accent/15",
    animate: { x: [0, 25, 0], y: [0, -20, 0] },
    duration: 18,
  },
];

/**
 * Manchas de cor que flutuam atrás do hero.
 *
 * Só existem enquanto o hero está na tela: são três animações infinitas, e
 * mantê-las montadas custaria um frame a cada 16ms pelo resto da visita sem
 * nada aparecer — o mesmo motivo que pausa o marquee fora da viewport.
 */
export function HeroBlobs() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {isVisible &&
        blobs.map((blob) => (
          <motion.div
            key={blob.className}
            className={`absolute rounded-full blur-3xl ${blob.className}`}
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
