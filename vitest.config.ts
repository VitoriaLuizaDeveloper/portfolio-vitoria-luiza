import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // `tsconfigPaths` reaproveita o alias `@/*` do tsconfig, para os testes
  // importarem exatamente os mesmos caminhos que a aplicação.
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    restoreMocks: true,
    // Carregar jsdom + framer-motion custa alguns segundos por arquivo e entra
    // no tempo do primeiro teste. Em runner compartilhado (CI) ou máquina sob
    // carga, o padrão de 5s vira falha intermitente.
    testTimeout: 20_000,
    hookTimeout: 20_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.{test,spec}.{ts,tsx}", "src/i18n/{pt,en}.ts", "src/data/**"],
    },
  },
});
