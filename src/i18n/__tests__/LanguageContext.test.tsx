import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { LanguageProvider, useLanguage } from "@/i18n";

const STORAGE_KEY = "vl-portfolio-locale";

function Probe() {
  const { locale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="greeting">{t.home.greeting}</span>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
      <Probe />
    </LanguageProvider>,
  );
}

/** O provider detecta o idioma pelo navegador quando não há nada salvo. */
function stubNavigatorLanguage(language: string) {
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(language);
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("usa o idioma salvo no localStorage acima do idioma do navegador", async () => {
    window.localStorage.setItem(STORAGE_KEY, "en");
    stubNavigatorLanguage("pt-BR");

    renderWithProvider();

    await waitFor(() => expect(screen.getByTestId("locale")).toHaveTextContent("en"));
  });

  it("cai para o idioma do navegador quando não há preferência salva", async () => {
    stubNavigatorLanguage("pt-BR");

    renderWithProvider();

    await waitFor(() => expect(screen.getByTestId("locale")).toHaveTextContent("pt"));
  });

  it("assume inglês para navegadores que não são em português", async () => {
    stubNavigatorLanguage("fr-FR");

    renderWithProvider();

    await waitFor(() => expect(screen.getByTestId("locale")).toHaveTextContent("en"));
  });

  it("troca o conteúdo e persiste a escolha ao clicar no seletor", async () => {
    stubNavigatorLanguage("pt-BR");
    const user = userEvent.setup();

    renderWithProvider();
    await waitFor(() => expect(screen.getByTestId("locale")).toHaveTextContent("pt"));

    await user.click(screen.getByRole("button", { name: /en/i }));

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("greeting")).toHaveTextContent("Hi, I'm");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
  });

  it("mantém o atributo lang do documento em sincronia com o idioma", async () => {
    stubNavigatorLanguage("en-US");
    const user = userEvent.setup();

    renderWithProvider();
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));

    await user.click(screen.getByRole("button", { name: /pt/i }));

    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("marca no seletor qual idioma está ativo", async () => {
    stubNavigatorLanguage("pt-BR");

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /pt/i })).toHaveAttribute("aria-pressed", "true"),
    );
    expect(screen.getByRole("button", { name: /en/i })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("useLanguage", () => {
  it("falha de forma explícita quando usado fora do provider", () => {
    // O React loga o erro do boundary; silenciamos só para não poluir a saída.
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Probe />)).toThrow(/must be used within a LanguageProvider/i);

    consoleError.mockRestore();
  });
});
