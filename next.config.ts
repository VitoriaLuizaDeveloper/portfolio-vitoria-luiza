import type { NextConfig } from "next";

/** Cabeçalhos de segurança aplicados a todas as rotas. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // O header `X-Powered-By: Next.js` só entrega a stack para quem escaneia.
  poweredByHeader: false,

  images: {
    // AVIF primeiro: ~20-30% menor que WebP nas capturas dos projetos.
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // Converte os imports de barril em imports diretos: sem isso o bundler
    // precisa analisar o pacote inteiro de ícones a cada build.
    optimizePackageImports: ["@icons-pack/react-simple-icons", "lucide-react", "framer-motion"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
