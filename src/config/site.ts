/**
 * Dados do site usados por metadata, sitemap e robots.
 * `NEXT_PUBLIC_SITE_URL` é definida na Vercel; o fallback cobre o build local.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitorialuiza.dev";

export const siteConfig = {
  name: "Vitória Luiza",
  title: "Vitória Luiza · Desenvolvedora Full Stack",
  description:
    "Portfólio de Vitória Luiza, Desenvolvedora Full Stack com mais de 6 anos de experiência em React, Next.js, Node.js, TypeScript, PHP/Laravel e AWS.",
  url: siteUrl,
  locale: "pt_BR",
} as const;
