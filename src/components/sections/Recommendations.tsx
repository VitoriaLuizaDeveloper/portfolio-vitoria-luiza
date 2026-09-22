"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Modal } from "@/components/ui/Modal";
import {
  recommendations,
  linkedinRecommendationsUrl,
  type Recommendation,
} from "@/data/recommendations";
import { useLanguage } from "@/i18n";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Assinatura da recomendação: iniciais, nome e cargo — no cartão e no modal. */
function Author({ rec, detailed = false }: { rec: Recommendation; detailed?: boolean }) {
  return (
    <div className="flex items-center gap-3 border-t border-border/60 pt-5">
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary-dark/40 text-sm font-semibold text-foreground ring-1 ring-primary/30 ${
          detailed ? "h-11 w-11" : "h-10 w-10"
        }`}
      >
        {initials(rec.name)}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{rec.name}</p>
        <p className={`text-xs text-muted-2 ${detailed ? "" : "line-clamp-1"}`}>{rec.role}</p>
        {detailed && (
          <p className="mt-0.5 text-xs text-muted-2">
            {rec.relationship} · {rec.date}
          </p>
        )}
      </div>
    </div>
  );
}

export function Recommendations() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? recommendations[activeIndex] : null;
  const shown = recommendations.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow={t.recommendations.eyebrow}
        title={t.recommendations.title}
        description={t.recommendations.description}
        action={
          <PillLink href={linkedinRecommendationsUrl} icon={LinkedinIcon}>
            {t.recommendations.viewOnLinkedin}
          </PillLink>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((rec, i) => (
          <Reveal key={rec.name} delay={(i % 3) * 0.06}>
            <TiltCard className="h-full rounded-2xl">
              <div className="glass flex h-full flex-col rounded-2xl p-6">
                <Quote className="text-primary-light/40" size={28} />

                <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed whitespace-pre-line text-muted">
                  {rec.text}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="mt-4 self-start text-xs font-medium text-primary-light transition-colors hover:text-accent"
                >
                  {t.recommendations.readMore} →
                </button>

                <div className="mt-5">
                  <Author rec={rec} />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActiveIndex(null)}
        closeLabel={t.recommendations.close}
        label={active ? `${t.recommendations.eyebrow} — ${active.name}` : t.recommendations.eyebrow}
      >
        {active && (
          <div>
            <Quote className="text-primary-light/40" size={32} />
            <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-muted">
              {active.text}
            </p>
            <div className="mt-6">
              <Author rec={active} detailed />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
