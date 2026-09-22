"use client";

import { GithubIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { contact } from "@/data/resume";
import { useLanguage } from "@/i18n";

export function Projects() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        description={t.projects.description}
        action={
          <PillLink href={contact.githubHref} icon={GithubIcon}>
            {t.projects.viewGithub}
          </PillLink>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.projectsList.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06}>
            <TiltCard className="h-full rounded-2xl">
              <ProjectCard project={project} labels={t.projects} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}
