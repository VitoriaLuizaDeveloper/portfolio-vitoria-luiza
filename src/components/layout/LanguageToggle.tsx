"use client";

import { motion } from "framer-motion";
import { useId } from "react";

import { useLanguage } from "@/i18n";

const OPTIONS = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
] as const;

export function LanguageToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, setLocale } = useLanguage();
  // O seletor aparece duas vezes na página (trilho do desktop e canto do mobile),
  // as duas montadas ao mesmo tempo: um `layoutId` fixo faria as duas pílulas
  // disputarem a mesma animação de layout.
  const pillId = useId();

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1" role="group" aria-label="Language selector">
        {OPTIONS.map(({ code, flag, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            aria-label={label}
            className={`relative flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
              locale === code ? "opacity-100" : "opacity-50 hover:opacity-100"
            }`}
          >
            {locale === code && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-lg bg-primary/25 ring-1 ring-primary/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {flag}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center rounded-full border border-border bg-surface/70 p-1 text-xs font-semibold ${className ?? ""}`}
      role="group"
      aria-label="Language selector"
    >
      {OPTIONS.map(({ code, flag, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
            locale === code ? "text-white" : "text-muted hover:text-foreground"
          }`}
        >
          {locale === code && (
            <motion.span
              layoutId={pillId}
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="text-sm leading-none">{flag}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
