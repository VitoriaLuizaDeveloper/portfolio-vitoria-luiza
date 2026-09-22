"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contact } from "@/data/resume";
import { useLanguage } from "@/i18n";

export function Contact() {
  const { t } = useLanguage();

  const channels = [
    { label: t.contact.labels.email, value: contact.email, href: contact.emailHref, icon: Mail },
    {
      label: t.contact.labels.linkedin,
      value: contact.linkedin,
      href: contact.linkedinHref,
      icon: LinkedinIcon,
    },
    {
      label: t.contact.labels.github,
      value: contact.github,
      href: contact.githubHref,
      icon: GithubIcon,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={t.contact.description}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-8">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl"
            />

            <div className="relative">
              <p className="text-2xl leading-snug font-semibold text-foreground">
                {t.contact.ctaTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.contact.ctaSubtitle}</p>
              <MagneticButton
                href={contact.emailHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
              >
                <Mail size={16} /> {t.contact.ctaButton}
              </MagneticButton>
            </div>

            <div className="relative flex items-center gap-3 border-t border-primary/20 pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs tracking-wide text-muted-2 uppercase">
                  {t.contact.labels.location}
                </p>
                <p className="text-sm font-medium text-foreground">{t.contact.locationNote}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          {channels.map(({ label, value, href, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-wide text-muted-2 uppercase">{label}</p>
                  <p className="truncate font-medium text-foreground">{value}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-light"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
