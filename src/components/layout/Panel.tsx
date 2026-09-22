import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import type { SectionId } from "@/config/sections";

/**
 * Uma seção vertical: o container padrão mais um ritmo vertical compartilhado,
 * para toda seção ficar à mesma distância do menu e das vizinhas.
 * `bare` entrega o layout ao filho (o hero controla a própria caixa full-height).
 */
export function Panel({
  id,
  children,
  bare = false,
}: {
  id: SectionId;
  children: ReactNode;
  bare?: boolean;
}) {
  return (
    <section id={id} className="relative w-full scroll-mt-6">
      {bare ? (
        children
      ) : (
        <Container className="flex flex-col gap-8 py-12 sm:gap-10 sm:py-16 md:gap-14 md:py-24">
          {children}
        </Container>
      )}
    </section>
  );
}
