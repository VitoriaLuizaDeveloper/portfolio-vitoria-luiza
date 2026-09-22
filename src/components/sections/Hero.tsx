"use client";

import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { contact } from "@/data/resume";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { HeroBlobs } from "@/components/ui/HeroBlobs";
import { Spotlight } from "@/components/ui/Spotlight";
import { TypingText } from "@/components/ui/TypingText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const { t } = useLanguage();
  const stackTags = t.skills.slice(0, 4).flatMap((category) => category.items);
  const socials = [
    { href: contact.githubHref, label: "GitHub", Icon: GithubIcon },
    { href: contact.linkedinHref, label: "LinkedIn", Icon: LinkedinIcon },
  ];

  return (
    <div className="relative w-full overflow-x-clip">
      <HeroBlobs />

      <Spotlight>
        <Container className="flex min-h-[100svh] flex-col justify-center gap-10 py-24 md:py-12">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
            <div className="flex max-w-xl flex-col items-start">
              <Reveal>
                <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {t.home.greeting} <span className="text-gradient">{t.profile.name}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.05}>
                <p className="mt-3 min-h-[1.6em] text-lg font-medium text-primary-light">
                  <TypingText words={t.home.roles} />
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                  {t.home.summary}
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="#projetos"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
                >
                  {t.home.ctaProjects}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </MagneticButton>
                <MagneticButton
                  href="#contato"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary-light hover:text-primary-light"
                >
                  {t.home.ctaContact}
                </MagneticButton>
                <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
                {socials.map(({ href, label, Icon }) => (
                  <MagneticButton
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    ariaLabel={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary-light hover:text-primary-light"
                  >
                    <Icon size={18} />
                  </MagneticButton>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ProfilePhoto className="h-48 w-48 sm:h-60 sm:w-60 lg:h-64 lg:w-64" />
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.25} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {t.home.stats.map((stat) => (
                <TiltCard key={stat.label} className="rounded-2xl">
                  <div className="glass rounded-2xl px-6 py-6">
                    <p className="text-gradient text-3xl font-bold">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{stat.label}</p>
                  </div>
                </TiltCard>
              ))}
            </Reveal>

            <Reveal delay={0.3}>
              <Marquee items={stackTags} />
            </Reveal>
          </div>
        </Container>
      </Spotlight>
    </div>
  );
}
