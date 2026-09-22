"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Faixa de tecnologias em rolagem contínua.
 *
 * O loop de `requestAnimationFrame` só roda enquanto a faixa está visível:
 * sem essa trava, ela continuaria consumindo um frame a cada 16ms durante todo
 * o resto da página (e em segundo plano, depois que o visitante troca de aba).
 */
export function Marquee({ items, speed = 42 }: { items: string[]; speed?: number }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef);

  const [trackWidth, setTrackWidth] = useState(0);
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (value) => (trackWidth ? `${wrap(-trackWidth, 0, value)}px` : 0));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // A faixa é duplicada para o loop ser contínuo: a largura útil é a metade.
    const measure = () => setTrackWidth(track.scrollWidth / 2);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !isVisible || !trackWidth) return;
    baseX.set(baseX.get() - (speed * delta) / 1000);
  });

  const pill =
    "shrink-0 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted";

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span key={item} className={pill}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
    >
      <motion.div ref={trackRef} className="flex w-max gap-3" style={{ x }}>
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} aria-hidden={i >= items.length} className={pill}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
