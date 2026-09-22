import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { handleAnchorClick } from "@/lib/anchor";

function renderAnchor(href = "#contato") {
  const section = document.createElement("section");
  section.id = "contato";
  document.body.appendChild(section);

  const { getByText } = render(
    <a href={href} onClick={handleAnchorClick}>
      ir
    </a>,
  );

  return { link: getByText("ir"), section };
}

describe("handleAnchorClick", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
  });

  it("rola até a seção sem escrever o hash na URL", () => {
    const { link, section } = renderAnchor();

    fireEvent.click(link);

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(window.location.hash).toBe("");
  });

  it("limpa um hash que já veio na URL, preservando a query", () => {
    window.history.replaceState(null, "", "/?lang=en#projetos");
    const { link } = renderAnchor();

    fireEvent.click(link);

    expect(window.location.hash).toBe("");
    expect(window.location.search).toBe("?lang=en");
  });

  it("move o foco para a seção, então o teclado continua de onde parou", () => {
    const { link, section } = renderAnchor();

    fireEvent.click(link);

    expect(section).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(section);
  });

  it("respeita prefers-reduced-motion", () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({ matches: true } as MediaQueryList);
    const { link, section } = renderAnchor();

    fireEvent.click(link);

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto" });
  });

  it("não sequestra clique com modificador (abrir em nova aba)", () => {
    const { link, section } = renderAnchor();

    fireEvent.click(link, { metaKey: true });

    expect(section.scrollIntoView).not.toHaveBeenCalled();
  });

  it("ignora links externos", () => {
    const { link } = renderAnchor("https://github.com");

    // `preventDefault` só existe para o jsdom não tentar navegar de verdade.
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
