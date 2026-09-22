import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechIcon, getTechIcon } from "@/components/ui/TechIcon";

describe("getTechIcon", () => {
  it.each([
    ["React", "React"],
    ["Next.js", "Next.js"],
    ["TypeScript", "TypeScript"],
    ["Node.js", "Node.js"],
    ["Laravel", "Laravel"],
    ["PostgreSQL", "PostgreSQL"],
  ])("reconhece %s", (name) => {
    expect(getTechIcon(name)).not.toBeNull();
  });

  it("ignora maiúsculas e minúsculas", () => {
    expect(getTechIcon("react")).not.toBeNull();
    expect(getTechIcon("TYPESCRIPT")).not.toBeNull();
  });

  it("não confunde 'React' com 'React Native'", () => {
    // As regras são ancoradas justamente para um nome composto não herdar o
    // ícone do nome curto.
    expect(getTechIcon("React Native")).toBeNull();
  });

  it("devolve null para tecnologias sem ícone mapeado", () => {
    expect(getTechIcon("Scrum")).toBeNull();
    expect(getTechIcon("")).toBeNull();
  });
});

describe("<TechIcon />", () => {
  it("não renderiza nada quando a tecnologia não tem ícone", () => {
    const { container } = render(<TechIcon name="Scrum" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza um svg para tecnologias conhecidas", () => {
    const { container } = render(<TechIcon name="React" />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
