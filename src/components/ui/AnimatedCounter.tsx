"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Anima só a parte numérica de um valor já formatado ("6+", "+30", "15 anos"),
 * mantendo prefixo e sufixo fixos.
 *
 * O número é escrito direto no DOM pelo framer-motion (MotionValue passado como
 * filho), e não via `useState`. Isso evita um re-render do React por frame de
 * animação — com quatro contadores na tela, eram ~240 renders por segundo.
 */
export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const match = value.match(/\d+(\.\d+)?/);
  const target = match ? Number.parseFloat(match[0]) : null;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 20 });
  const rounded = useTransform(spring, (current) => Math.round(current).toString());

  useEffect(() => {
    if (inView && target !== null) motionValue.set(target);
  }, [inView, target, motionValue]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
