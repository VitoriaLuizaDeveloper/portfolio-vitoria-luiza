"use client";

import { motion, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

/** Diâmetro do halo. O raio serve para centralizá-lo no cursor. */
const SIZE = 840;

/**
 * Halo que segue o cursor.
 *
 * O halo é uma camada pintada uma única vez e movida por `transform`: o
 * navegador só a recompõe, trabalho que fica na GPU. Animar a posição dentro do
 * `radial-gradient` (a versão anterior) repintava um gradiente do tamanho da
 * tela a cada evento de mouse — caro em qualquer máquina, visível numa GPU
 * integrada ou durante uma gravação de tela.
 *
 * A posição vive em MotionValues, então nada disso passa por re-render do React.
 */
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
