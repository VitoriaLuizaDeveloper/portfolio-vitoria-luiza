import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Server } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/i18n";

export function ProjectCard({
  project,
  labels,
}: {
  project: Project;
  labels: { featuredBadge: string; demo: string; repo: string; api: string };
}) {
  return (
    <div className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-xl hover:shadow-primary/15">
      <div className="relative aspect-video w-full overflow-hidden border-b border-border/60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg shadow-primary/30">
            {labels.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-0.5 text-xs text-primary-light"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4 text-sm">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-medium text-primary-light transition-colors hover:text-accent"
            >
              <ExternalLink size={15} /> {labels.demo}
            </Link>
          )}
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={15} /> {labels.repo}
          </Link>
          {project.apiRepoUrl && (
            <Link
              href={project.apiRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
            >
              <Server size={15} /> {labels.api}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
