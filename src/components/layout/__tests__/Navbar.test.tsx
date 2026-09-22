import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Navbar } from "@/components/layout/Navbar";
import { SECTION_IDS } from "@/config/sections";
import { LanguageProvider } from "@/i18n";
import { pt } from "@/i18n/pt";

function renderNavbar() {
  SECTION_IDS.forEach((id) => {
    const section = document.createElement("section");
    section.id = id;
    document.body.appendChild(section);
  });

  return render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );
}

describe("<Navbar />", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    // Fixa o idioma para os rótulos do menu serem previsíveis no teste.
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("pt-BR");
  });

  it("oferece uma âncora para cada seção da página", () => {
    renderNavbar();

    SECTION_IDS.forEach((id) => {
      expect(document.querySelector(`a[href="#${id}"]`)).toBeInTheDocument();
    });
  });

  it("navega por âncoras nativas, então funciona sem JavaScript", () => {
    renderNavbar();

    // Dois menus (desktop + mobile) cobrindo as mesmas seções.
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    expect(anchors).toHaveLength(SECTION_IDS.length * 2);
    anchors.forEach((anchor) => {
      expect(anchor.getAttribute("aria-label")?.trim()).toBeTruthy();
    });
  });

  it("marca a seção inicial como ativa e nenhuma outra", async () => {
    renderNavbar();

    await waitFor(() =>
      expect(document.querySelector('a[href="#home"]')).toHaveAttribute("aria-current", "true"),
    );

    // `aria-current="false"` seria anunciado por leitores de tela; o correto
    // é o atributo simplesmente não existir nos itens inativos.
    document.querySelectorAll('a[href="#projetos"]').forEach((anchor) => {
      expect(anchor).not.toHaveAttribute("aria-current");
    });
  });

  it("nomeia os dois landmarks de navegação", () => {
    renderNavbar();

    expect(screen.getAllByRole("navigation", { name: pt.nav.primary })).toHaveLength(2);
  });

  it("traduz os rótulos do menu junto com o idioma", async () => {
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("en-US");
    renderNavbar();

    await waitFor(() =>
      expect(document.querySelector('a[href="#projetos"]')).toHaveAttribute(
        "aria-label",
        "Projects",
      ),
    );
  });
});
