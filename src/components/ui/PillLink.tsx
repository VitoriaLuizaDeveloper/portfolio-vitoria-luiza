import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

/**
 * Link externo em forma de pílula, usado nas ações dos cabeçalhos de seção
 * ("ver no GitHub", "ver no LinkedIn"). A seta diagonal sinaliza que a
 * navegação sai do site — e o `target="_blank"` cumpre a promessa.
 */
export function PillLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: ComponentType<{ size?: number }>;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-light hover:text-primary-light"
    >
      <Icon size={16} />
      {children}
      <ArrowUpRight
        size={15}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
