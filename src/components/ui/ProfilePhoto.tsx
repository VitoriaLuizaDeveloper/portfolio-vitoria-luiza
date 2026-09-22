"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Foto com halo giratório. O giro e a flutuação só rodam com a foto na tela:
 * o halo é um elemento borrado (`blur-2xl`) em rotação contínua, o item mais
 * caro de compor do hero, e não faz sentido pagar por ele depois que a pessoa
 * já desceu a página.
 */
export function ProfilePhoto({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref);

  return (
    <motion.div
      ref={ref}
      className={`relative shrink-0 ${className ?? ""}`}
      animate={isVisible ? { y: [0, -12, 0] } : { y: 0 }}
      transition={
        isVisible ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
      }
    >
      <div className="absolute inset-[-18%] -z-10 rounded-full bg-primary/30 blur-3xl" />
      {isVisible && (
        <motion.div
          className="absolute inset-[-8%] -z-10 rounded-full bg-[conic-gradient(from_0deg,var(--primary-light),var(--accent),var(--primary),var(--primary-light))] opacity-40 blur-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="glass h-full w-full overflow-hidden rounded-full p-2.5">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src="/vitoria.jpg"
            alt="Foto de Vitória Luiza"
            fill
            priority
            sizes="(min-width: 1024px) 256px, (min-width: 640px) 240px, 192px"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
