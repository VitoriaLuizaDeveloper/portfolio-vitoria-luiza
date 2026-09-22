"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, FolderGit2, Home, Mail, Quote, User } from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { SECTION_IDS, type SectionId } from "@/config/sections";
import { useLanguage } from "@/i18n";
import { handleAnchorClick } from "@/lib/anchor";

const icons: Record<SectionId, typeof Home> = {
  home: Home,
  sobre: User,
  habilidades: Code2,
  experiencia: Briefcase,
  projetos: FolderGit2,
  recomendacoes: Quote,
  contato: Mail,
};

/** Marca no menu a seção que está ocupando o centro da tela. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Um item do menu. Os dois menus (trilho lateral e barra inferior) ficam
 * montados ao mesmo tempo e só alternam por media query, então cada um traz o
 * próprio `pillId` — dois `layoutId` iguais na árvore fariam o framer-motion
 * animar a pílula de um menu até a posição do outro.
 */
function NavLink({
  id,
  label,
  active,
  pillId,
  variant,
}: {
  id: SectionId;
  label: string;
  active: boolean;
  pillId: string;
  variant: "rail" | "bar";
}) {
  const Icon = icons[id];
  const isRail = variant === "rail";

  return (
    <a
      href={`#${id}`}
      onClick={handleAnchorClick}
      aria-label={label}
      aria-current={active ? "true" : undefined}
      className={`group/nav relative flex items-center justify-center transition-colors ${
        isRail ? "h-11 w-11 rounded-xl" : "flex-1 rounded-xl py-2.5"
      } ${active ? "text-white" : isRail ? "text-muted hover:text-foreground" : "text-muted"}`}
    >
      {active && (
        <motion.span
          layoutId={pillId}
          className={`absolute -z-10 rounded-xl bg-primary ${isRail ? "inset-0" : "inset-1"}`}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <Icon size={isRail ? 18 : 20} aria-hidden />
      {isRail && (
        <span className="glass pointer-events-none absolute left-[calc(100%+0.75rem)] z-50 origin-left scale-90 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground opacity-0 transition-all duration-200 group-hover/nav:scale-100 group-hover/nav:opacity-100">
          {label}
        </span>
      )}
    </a>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const active = useActiveSection();

  // A ordem e a completude do menu vêm de `SECTION_IDS`; o dicionário só traduz.
  const links = SECTION_IDS.map((id) => ({ id, label: t.nav.labels[id] }));

  return (
    <>
      <LanguageToggle className="glass fixed top-4 right-4 z-50 sm:top-6 sm:right-6 md:hidden" />

      {/* Desktop: trilho fixo à esquerda; cada ícone revela o rótulo no hover. */}
      <nav
        aria-label={t.nav.primary}
        className="glass fixed top-1/2 left-5 z-50 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-2xl p-2 md:flex"
      >
        {links.map((link) => (
          <NavLink
            key={link.id}
            {...link}
            active={active === link.id}
            pillId="side-nav-pill"
            variant="rail"
          />
        ))}

        <div className="my-1 h-px w-8 bg-border/70" />

        <LanguageToggle compact />
      </nav>

      {/* Mobile: barra de ícones ancorada embaixo, sem sobrepor o conteúdo. */}
      <nav
        aria-label={t.nav.primary}
        className="glass fixed inset-x-4 bottom-4 z-50 flex items-center justify-between rounded-2xl p-2 md:hidden"
      >
        {links.map((link) => (
          <NavLink
            key={link.id}
            {...link}
            active={active === link.id}
            pillId="mobile-nav-pill"
            variant="bar"
          />
        ))}
      </nav>
    </>
  );
}
