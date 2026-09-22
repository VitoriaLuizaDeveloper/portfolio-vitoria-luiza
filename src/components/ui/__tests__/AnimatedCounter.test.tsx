import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/**
 * O contador recebe valores já formatados ("6+", "30+") e precisa separar o
 * número — que é animado — do prefixo/sufixo, que ficam fixos na tela.
 */
describe("<AnimatedCounter />", () => {
  it("preserva o sufixo do valor formatado", () => {
    const { container } = render(<AnimatedCounter value="6+" />);

    expect(container.textContent).toMatch(/\d\+$/);
  });

  it("preserva o prefixo do valor formatado", () => {
    const { container } = render(<AnimatedCounter value="+30" />);

    expect(container.textContent).toMatch(/^\+\d/);
  });

  it("renderiza o texto como veio quando não há número para animar", () => {
    render(<AnimatedCounter value="Full Stack" />);

    expect(screen.getByText("Full Stack")).toBeInTheDocument();
  });

  it("repassa a classe recebida", () => {
    const { container } = render(<AnimatedCounter value="15+" className="text-gradient" />);

    expect(container.firstElementChild).toHaveClass("text-gradient");
  });
});
