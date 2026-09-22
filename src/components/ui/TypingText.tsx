"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Alterna entre os cargos com transição de entrada/saída.
 * O timer só corre enquanto o texto está na tela — fora dela, trocar a palavra
 * seria um re-render invisível a cada 2,6s pelo resto da visita.
 */
export function TypingText({ words, className }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isVisible = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || !isVisible || words.length <= 1) return;

    const id = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words, reduceMotion, isVisible]);

  const current = words[index] ?? words[0] ?? "";

  if (reduceMotion) {
    return (
      <span ref={ref} className={className}>
        {current}
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-block align-bottom ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {current}
        </motion.span>
      </AnimatePresence>
      <motion.span
        aria-hidden
        className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-primary-light align-middle"
        animate={isVisible ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  );
}
