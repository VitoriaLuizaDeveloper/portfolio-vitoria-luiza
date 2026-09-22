"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/i18n";

export function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description}
      />

      <Reveal delay={0.1}>
        <p className="text-xs font-semibold tracking-[0.18em] text-muted-2 uppercase">
          {t.about.competenciesHeading}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.competencies.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface/40 px-3 py-1 text-sm text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
