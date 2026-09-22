"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/Container";
import { contact } from "@/data/resume";
import { useLanguage } from "@/i18n";

export function Footer() {
  const { t } = useLanguage();

  const socials = [
    { href: contact.githubHref, label: "GitHub", icon: GithubIcon, external: true },
    { href: contact.linkedinHref, label: "LinkedIn", icon: LinkedinIcon, external: true },
    { href: contact.emailHref, label: t.contact.labels.email, icon: Mail, external: false },
  ];

  return (
    <footer className="border-t border-border/60 pb-24 md:pb-0 md:pl-20">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gradient text-lg font-semibold">Vitória Luiza</p>
          <p className="mt-1 text-sm text-muted">{t.footer.role}</p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary-light hover:text-primary-light"
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </Container>

      <div className="border-t border-border/60">
        <Container className="py-5 text-center text-xs text-muted-2 sm:text-left">
          © {new Date().getFullYear()} Vitória Luiza · {t.footer.rights}
        </Container>
      </div>
    </footer>
  );
}
