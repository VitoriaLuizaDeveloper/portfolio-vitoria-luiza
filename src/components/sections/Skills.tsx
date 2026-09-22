"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  Award,
  Monitor,
  Server,
  Database,
  Cloud,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { useLanguage } from "@/i18n";

// Same order as the skill categories in both locales.
const categoryIcons: LucideIcon[] = [
  Monitor,
  Server,
  Database,
  Cloud,
  Sparkles,
  ShieldCheck,
  Layers,
];

function Row({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-border/60 px-6 py-6 first:border-t-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:px-8">
      <div className="flex items-center gap-3 md:items-start">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
          <Icon size={18} />
        </span>
        <h3 className="font-semibold text-foreground md:pt-1.5">{title}</h3>
      </div>
      <div className="md:pt-1">{children}</div>
    </div>
  );
}

export function Skills() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.home.stackHeading} title={t.about.skillsHeading} />

      <Reveal>
        <div className="glass w-full overflow-hidden rounded-2xl">
          <Row icon={GraduationCap} title={t.about.educationHeading}>
            <p className="font-medium text-foreground">{t.education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {t.education.institution} · {t.education.period}
            </p>
          </Row>

          <Row icon={Award} title={t.about.certificationsHeading}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {t.certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                  {cert}
                </li>
              ))}
            </ul>
          </Row>

          {t.skills.map((category, i) => (
            <Row key={category.title} icon={categoryIcons[i] ?? Layers} title={category.title}>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-sm text-primary-light"
                  >
                    <TechIcon name={item} size={14} />
                    {item}
                  </span>
                ))}
              </div>
            </Row>
          ))}
        </div>
      </Reveal>
    </>
  );
}
