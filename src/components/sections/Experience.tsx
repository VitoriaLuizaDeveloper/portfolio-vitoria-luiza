"use client";

import { Building2, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/i18n";

export function Experience() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        description={t.experience.description}
      />

      <Reveal>
        <div className="glass flex flex-col gap-4 rounded-2xl px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
              <Building2 size={18} />
            </span>
            <h3 className="font-semibold text-foreground">{t.about.sectorsHeading}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-border bg-surface/40 px-3 py-1 text-sm text-muted"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <ol className="relative flex flex-col gap-8">
        {/* The rail runs between the date column and the cards. */}
        <span
          aria-hidden
          className="absolute top-3 bottom-3 left-[200px] hidden w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:block"
        />

        {t.experienceList.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className="relative grid gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:gap-x-20"
          >
            <span
              aria-hidden
              className="absolute top-7 left-[200px] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:block"
            />

            <Reveal delay={i * 0.04} className="md:pt-5 md:text-right">
              <p className="text-sm font-semibold text-primary-light">{job.period}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-2 md:justify-end">
                <MapPin size={12} /> {job.location}
              </p>
            </Reveal>

            <Reveal delay={i * 0.04 + 0.05}>
              <div className="glass rounded-2xl p-6 transition-colors hover:border-primary/40">
                <h3 className="text-lg font-semibold text-foreground">{job.company}</h3>
                <p className="mt-0.5 text-sm text-primary-light">{job.role}</p>
                <p className="mt-1 text-sm text-muted-2 italic">{job.sector}</p>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}
