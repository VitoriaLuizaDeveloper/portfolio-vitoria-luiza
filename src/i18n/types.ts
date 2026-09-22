import type { SectionId } from "@/config/sections";

export type Locale = "pt" | "en";

export type SkillCategory = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  sector: string;
  bullets: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  /** Captura do projeto em `public/projects`. Obrigatória: o cartão é visual. */
  image: string;
  demoUrl?: string;
  repoUrl: string;
  apiRepoUrl?: string;
  featured?: boolean;
};

export type Content = {
  nav: {
    primary: string;
    /** Um rótulo por seção: `SectionId` obriga os dois dicionários a cobrirem o menu inteiro. */
    labels: Record<SectionId, string>;
  };
  home: {
    greeting: string;
    roles: string[];
    summary: string;
    ctaProjects: string;
    ctaContact: string;
    stats: { label: string; value: string }[];
    stackHeading: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    skillsHeading: string;
    competenciesHeading: string;
    educationHeading: string;
    sectorsHeading: string;
    certificationsHeading: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewGithub: string;
    featuredBadge: string;
    demo: string;
    repo: string;
    api: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    labels: { email: string; linkedin: string; github: string; location: string };
    locationNote: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  recommendations: {
    eyebrow: string;
    title: string;
    description: string;
    readMore: string;
    viewOnLinkedin: string;
    close: string;
  };
  footer: {
    role: string;
    rights: string;
  };
  profile: { name: string };
  skills: SkillCategory[];
  competencies: string[];
  experienceList: ExperienceItem[];
  education: { degree: string; institution: string; period: string };
  sectors: string[];
  certifications: string[];
  projectsList: Project[];
};
